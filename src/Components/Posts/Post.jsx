
import React, { useEffect, useState } from 'react'
import profile from '../../assets/img/profile.png'
import { Button, Input } from '@heroui/react'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostAction from './PostAction'
import { createCommentApi, getPostCommentsApi } from '../../Services/CommentServices'

export default function Post({ post }) {

  const [content, setContent] = useState('')
  const [postComment, setPostComment] = useState([])

  useEffect(() => {
    getPostComents();
  }, [postComment])
  
async function getPostComents(){
  const comments = await getPostCommentsApi(post._id);
setPostComment(comments);
}

  async function createComment(postId){
   if ( !content ) return;
const comment = await createCommentApi(content, postId)
setContent('');
}
  return <>

    <div className="max-w-2xl mx-auto flex flex-col px-3 lg:px-10">
      <div className="bg-white w-full rounded-md shadow-2xl h-auto p-3 my-3">
        <PostHeader photo={post.user.photo} userName={post.user.name} date={post.createdAt.split('.', 1)[0].split('T').join(' ')} />
        <PostBody body={post.body} photo={post.image} />
        <div className="w-full flex justify-end">
          <p className="me-3 text-gray-500">{postComment?.length}</p>
        </div>
        <PostAction postId={post.id} />
        <div className='bg-gray-200 -mx-3 -mb-3 p-2 rounded-b-md'>

        <div className='flex items-center'>
          <Input value={content} onChange={(e)=>setContent(e.target.value)} className=' p-2' variant='faded' placeholder="type your comment" type="text" />
          <Button onPress={()=>createComment(post._id)} className=' border-1 rounded-lg'>Add comment</Button>
        </div>

            <PostHeader photo={profile} 
            userName={postComment[0]?.commentCreator.name}
              date={postComment[0]?.createdAt.split('.', 1)[0].split('T').join(' ')} />
            <span className='p-4'>{postComment[0]?.content}</span>
            </div>
      </div>
    </div>

  </>
}
