



import React, { useState, useEffect, useContext } from 'react';
import PostHeader from './PostHeader';
import { Button, Input } from '@heroui/react';
import profile from '../../assets/img/profile.png';
import { createCommentApi, getPostCommentsApi } from '../../Services/CommentServices';
import { AuthContext } from '../Context/AuthContext';

export default function PComment({postComment ,postId}) {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    setComments([...comments, postComment]);
  }, []);
  

  async function createComment() {
    if (!content) return;
    const newComment = await createCommentApi(content, postId,userToken);
    if (newComment) { setComments(newComment) }
    setContent('');
  }

  async function getPostComments() {
    setLoading(true);
    const allComments = await getPostCommentsApi(postId,userToken);
    setComments(allComments.comments || []);
    setLoading(false);
  }

  // useEffect(() => {
  //   getPostComments();
  // }, [postId]);

  return <>
    <div className="bg-gray-200 -mx-3 -mb-3 p-2 rounded-b-md">
      <div className="flex items-center gap-2 mb-4">
        <Input value={content} onChange={(e) => setContent(e.target.value)}
          className="p-2" variant="faded" placeholder="Type your comment" type="text" />
        <Button onPress={createComment} className="border-1 rounded-lg">Add comment </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <span className="loader border-4 border-gray-300 border-t-blue-500 w-6 h-6 rounded-full animate-spin"></span>
        </div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="bg-white p-3 mb-2 rounded shadow">
            <PostHeader
              photo={profile}
              userName={comment?.commentCreator?.name || 'Unknown User'}
              date={ comment.createdAt.split('.', 1)[0].split('T').join(' ')}
            />
            <p className="mt-2">{comment?.content || ''}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No comments yet</p>
      )}

    </div>
  </>


}
