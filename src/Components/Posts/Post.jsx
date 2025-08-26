import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostAction from './PostAction'
import PComment from './PComment'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { deletePostApi} from '../../Services/PostServices'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import CreatePost from './CreatePost'


export default function Post({ post, numOfComments, details, callBack }) {
  const navigate = useNavigate();
  const { userToken, userData } = useContext(AuthContext);
  const [commentCount, setCommentCount] = useState(post?.comments?.length);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  async function deletePost(postId) {
    if (!confirm('Are sour sure you want to delete this post ?')) return;
    setLoading(true);
    const response = await deletePostApi(postId, userToken);
    if (response?.message) {
      if (details) {
        navigate('/');
      } else {
        callBack();
      }
    }
    setLoading(false);
  }

return <>
    {
    isUpdating?  <CreatePost post={post} callBack={callBack} 
    isUpdating={true} setIsUpdating={setIsUpdating}/>
      : <div className="max-w-2xl mx-auto flex flex-col px-3 mb-5 bg-white rounded-md shadow-xl lg:px-10">
        <div className='flex justify-between items-center'>
          <PostHeader photo={post.user.photo} userName={post.user.name} date={post.createdAt.split('.', 1)[0].split('T').join(' ')} />
          {
            userData && userData._id === post.user._id &&
            <Dropdown>
              <DropdownTrigger>
                <i className="fa-solid fa-ellipsis cursor-pointer"></i>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit" onClick={() => setIsUpdating(true)}>Update</DropdownItem>
                <DropdownItem
                  onClick={() => deletePost(post._id)}
                  key="delete" className="text-danger" color="danger" >Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
        </div>

        <div
          onClick={() => !details && navigate('post-details/' + post?._id)}
          className={details ? '' : 'cursor-pointer'}>
          <PostBody body={post.body} photo={post.image} />
        </div>

        <div className="w-full flex justify-end">
          <p className="me-3 text-gray-500">{commentCount}</p>
        </div>
        <PostAction postId={post.id} />
        <PComment key={post.comments?._id} postComment={post.comments} numOfComments={numOfComments}
          postId={post._id} postUserId={post.user._id} setCommentCount={setCommentCount} />


        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

      </div>
  }



</>
}
