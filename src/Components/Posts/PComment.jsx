import { useState, useEffect, useContext } from 'react';
import profile from '../../assets/img/profile.png';
import PostHeader from './PostHeader';
import { Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Input } from '@heroui/react';
import { createCommentApi, deleteCommentsApi, updateCommentsApi } from '../../Services/CommentServices';
import { AuthContext } from '../Context/AuthContext';

export default function PComment({ postComment, numOfComments, postId, setCommentCount, postUserId }) {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [baseComments, setBaseComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userToken, userData } = useContext(AuthContext);

  useEffect(() => {
    if (!postComment) return;
    setBaseComments(postComment);
    if (numOfComments === 1 && postComment.length > 0) {
      setComments([postComment[postComment.length - 1]]);
    } else {
      setComments(postComment);
    }
  }, [numOfComments, postComment]);

  async function createComment() {
    setLoading(true);
    if (!content) {
      setLoading(false);
      return;
    }
    const newComment = await createCommentApi(content, postId, userToken);
    if (newComment) {
      const updatedBase = [...baseComments, newComment];
      setBaseComments(updatedBase);

      if (numOfComments === 1) {
        setComments([newComment]);
      } else {
        setComments(updatedBase);
      }

      setCommentCount(prev => prev + 1);
    }
    setContent('');
    setLoading(false);
  }

  async function deleteComment(id) {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    setLoading(true);
    const response = await deleteCommentsApi(id, userToken);
    if (response.message === 'success') {
      const updatedBase = baseComments.filter((comment) => comment._id !== id);
      setBaseComments(updatedBase);

      if (numOfComments === 1 && updatedBase.length > 0) {
      
        setComments([updatedBase[updatedBase.length - 1]]);
      } else {
       
        setComments(updatedBase);
      }

      setCommentCount(prev => prev - 1);
    }
    setLoading(false);
  }

  async function updateComment(commentId) {
  if (!content) return;
  setLoading(true);

  const response = await updateCommentsApi(content, commentId, userToken);
  if (response?.message === 'success') {
    const updatedBase = [...baseComments];
    for (let comment of updatedBase) {
      if (comment._id === commentId) {
        comment.content = content;
        break;
      }
    }
    setBaseComments(updatedBase);
    setComments(updatedBase);
    setEditCommentId(null);
    setContent('');
  }

  setLoading(false);
}

  return (
  <div className="bg-gray-200 p-2 -mx-4 rounded-b-md border border-gray-300">
    <div className="flex items-center gap-2 mb-4 mx-2">
      <Input value={content} onChange={(e) => setContent(e.target.value)}
        variant="faded"placeholder="Type your comment" type="text" />
      <Button onPress={editCommentId ? () => updateComment(editCommentId) : createComment}
        className="border-1 text-white items-center bg-black rounded-lg" >
        {editCommentId ? 'Update' : 'Add'} <i className="fa-regular fa-comment"></i></Button>
    </div>

    {loading ? (
      <div className="flex justify-center p-2">
        <span className="loader border-4 border-gray-300 border-t-blue-500 w-6 h-6 rounded-full animate-spin"></span>
      </div>)
       : comments.length ? (
      comments.map((comment) => (
        <div key={comment?._id} className="bg-white p-3 mb-1 rounded shadow">
          <div className="flex justify-between items-center">
            <PostHeader photo={profile} userName={comment?.commentCreator?.name || 'Unknown'}
              date={comment?.createdAt.split('.', 1)[0].split('T').join(' ')} />
            {userData && (userData._id === postUserId || userData._id === comment?.commentCreator._id) && 
            (
              <Dropdown>
                <DropdownTrigger>
                  <i className="fa-solid fa-ellipsis"></i>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit"
                    onClick={() => { setContent(comment.content); setEditCommentId(comment._id); }}>
                    Update 
                    </DropdownItem>
                  <DropdownItem onClick={() => deleteComment(comment._id)} key="delete"
                    className="text-danger" color="danger">
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          <p className="mt-2">{comment?.content || ''}</p>
        </div> ))
    ) 
    : (  <p className="text-gray-500">No comments yet</p> )}
  </div>
);
}
