import { Button } from '@heroui/react'
import  { useContext, useState } from 'react'
import { createPostApi, updatePostApi } from '../../Services/PostServices'
import { AuthContext } from '../Context/AuthContext'
 

export default function CreatePost({ callBack, post, isUpdating, setIsUpdating  }) {
  const [body, setBody] = useState(post?.body ?? '');
  const [image, setImage] = useState(post?.image ?? null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(AuthContext);

  async function handleCreatPost(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    body && formData.append('body', body)
if (image && typeof image !== "string") {
  formData.append('image', image);
}
    let result;
    if(isUpdating && post?._id){
      result = await updatePostApi(post._id, formData, userToken)
    }
    else{
     result = await createPostApi(formData, userToken);
    }
    if (result.message === 'success') {
      setImage(null);
      setBody('');
      callBack();
      setIsUpdating(false);
    }
    setLoading(false);
  }

  function reset() {
    setImage(null);
    setBody('');

  }

  return <>
    <div className='bg-white shadow-xl mb-6 max-w-2xl mx-auto rounded-md p-3'>
      <form onSubmit={handleCreatPost} >
        <textarea onChange={(e) => setBody(e.target.value)}
          className='mx-auto p-3 m-3 border w-full rounded md resize-none' cols={20} rows={5}
          placeholder="What's in your mind ?" value={body}></textarea>
          {
          image &&  (<img className="mx-auto mb-3 max-h-100" 
               src={typeof image === "string" ? image : URL.createObjectURL(image)}
 alt="Profile picture" />)
            }
        <div className="flex items-center justify-between">
          <label className='cursor-pointer rounded hover:bg-gray-200'>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" className='hidden' />
            <div className="flex items-center gap-1 p-2">
              <i className="fa-solid fa-image"></i>
              <span>image</span>
            </div>
          </label>

          <div >
           { isUpdating && <button onClick={()=> setIsUpdating(false)} 
            className='cursor-pointer mx-1 rounded-xl hover:bg-gray-200 py-2 px-3'>Cancel</button>}
            <Button isLoading={loading} type='submit'className='cursor-pointer text-white bg-black mx-1'>
              {isUpdating? 'update' : 'Post'}</Button>
          </div>
        </div>
      </form>
    </div>
  </>
}
