import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { createPostApi } from '../../Services/PostServices'
import { AuthContext } from '../Context/AuthContext'


export default function CreatePost({ callBack }) {

  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const {userToken} = useContext(AuthContext)

  async function createNewPost(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    body && formData.append('body', body)
    image && formData.append('image', image)

    const res = await createPostApi(formData, userToken);
    callBack();

    setLoading(false);
  }

  return <>
    <div className='bg-white shadow-xl m-6 max-w-xl mx-auto rounded-md p-3'>
      <form onSubmit={createNewPost} >
        <textarea onChange={(e) => setBody(e.target.value)}
          className='mx-auto p-3 m-3 border w-full rounded md resize-none' cols={20} rows={5}
          placeholder="What's in your mind ?"></textarea>
        <div className="flex items-center justify-between">
          <label>
            <input onChange={(e) => setImage(e.target.files[0])}  type="file" className='hidden' />
            <div className="flex items-center gap-1 p-2">
              <i className="fa-solid fa-image"></i>
              <span>img</span>
            </div>
          </label>
          <div >
            <button type='reset' className='cursor-pointer mx-1' >Cancel</button>
            <Button isLoading={loading} type='submit' className='cursor-pointer mx-1' color='primary'>Post</Button>
          </div>
        </div>
      </form> 
    </div>
  </>
}
