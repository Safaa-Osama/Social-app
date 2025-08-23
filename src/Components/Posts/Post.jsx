
import React, { useEffect, useState } from 'react'
import profile from '../../assets/img/profile.png'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostAction from './PostAction'
import PComment from './PComment'

export default function Post({ post, numOfComments }) {




  return <>

    <div className="max-w-2xl mx-auto flex flex-col px-3 lg:px-10">
      <div className="bg-white w-full rounded-md shadow-2xl h-auto p-3 my-3">
        <PostHeader photo={post.user.photo} userName={post.user.name} date={post.createdAt.split('.', 1)[0].split('T').join(' ')} />
        <PostBody body={post.body} photo={post.image} />
        <div className="w-full flex justify-end">
          <p className="me-3 text-gray-500">{post.comments?.length}</p>
        </div>
        <PostAction postId={post.id} />

        {post.comments.length && post.comments.slice(1, numOfComments + 1).map((comment) => (
          <PComment key={comment._id} postComment={comment} />
        ))
        }

      </div>
    </div>

  </>
}
