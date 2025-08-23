import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostAction from './PostAction'
import PComment from './PComment'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { deletePostApi, getAllPostsApi } from '../../Services/PostServices'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";


export default function Post({ post, numOfComments, details }) {

  const navigate = useNavigate();
  const { userData } = useContext(AuthContext)


async function deletePost(postId) {
  
  const response = await deletePostApi(postId);
          if (response?.message) {
              await getAllPostsApi();
          }
}
  return <>

    <div className="max-w-2xl mx-auto flex flex-col px-3 mb-5 bg-white rounded-md shadow-xl lg:px-10">
        <div className='flex justify-between items-center'>
          <PostHeader photo={post.user.photo} userName={post.user.name} date={post.createdAt.split('.', 1)[0].split('T').join(' ')} />
          {
            userData && userData._id === post.user._id &&
            <Dropdown>
            <DropdownTrigger>
                <i className="fa-solid fa-ellipsis"></i>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit">Update</DropdownItem>
                <DropdownItem 
                    onClick={() => deletePost(postId)}
                    key="delete" className="text-danger"  color="danger" >Delete</DropdownItem>
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
          <p className="me-3 text-gray-500">{post.comments?.length}</p>
        </div>
        <PostAction postId={post.id} />
        <PComment key={post.comments?._id} postComment={post.comments} numOfComments={numOfComments} postId={post._id} />

      </div>

  </>
}
