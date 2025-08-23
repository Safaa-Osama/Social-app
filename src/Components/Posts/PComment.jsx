import { useState, useEffect, useContext } from 'react';
import profile from '../../assets/img/profile.png'
import PostHeader from './PostHeader';
import { Button, Input } from '@heroui/react';
import { createCommentApi, getPostCommentsApi } from '../../Services/CommentServices';
import { AuthContext } from '../Context/AuthContext';
import DropDown from '../DropDown/DropDown';

export default function PComment({ postComment, numOfComments, postId, postUserId }) {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userToken, userData } = useContext(AuthContext);

  // useEffect(() => {
  //   if (numOfComments === 1 && postComment.length > 0) {
  //  setComments([postComment[postComment.length - 1]]);
  //   } 
  //   else {
  //     setComments(postComment);
  //   }
  // }, [numOfComments, postComment]);

  useEffect(() => 
    { numOfComments === 1 && postComment.length > 0 ? setComments([postComment[postComment.length - 1]])
       : setComments(postComment); }, []);

  async function createComment() {
    setLoading(true);
    if (!content) return;
    const newComment = await createCommentApi(content, postId, userToken);
    if (newComment) {
      setComments(newComment);
    }
    setContent('');
    setLoading(false);
  }

  async function getPostComment() {
    const response = await getPostCommentsApi(postId);
    if (response?.comments) {
      setComments(response.comments);
    }
  }

  return (
    <div className="bg-gray-200 p-2 -mx-10 rounded-b-md border- border-gray-300">
      <div className="flex items-center gap-2 mb-4 mx-4">
        <Input value={content} onChange={(e) => setContent(e.target.value)}
          variant="faded" placeholder="Type your comment" type="text" />
        <Button onPress={createComment} className="border-1 rounded-lg">Add comment</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-2">
          <span className="loader border-4 border-gray-300 border-t-blue-500 w-6 h-6 rounded-full animate-spin"></span>
        </div>
      ) : comments.length ? (
        comments.map((comment) => (
          <div key={comment?._id} className="bg-white p-3 mb-1 rounded shadow">
            <div className="flex justify-between items-center">
              <PostHeader
                photo={profile}
                userName={comment?.commentCreator?.name || 'Unknown User'}
                date={comment?.createdAt.split('.', 1)[0].split('T').join(' ')}/>
              {userData && userData._id === comment.commentCreator._id && (
                  <DropDown commentId={comment._id} callback={getPostComment} /> )}
            </div>
            <p className="mt-2">{comment?.content || ''}</p>
          </div> ))
      ) : ( <p className="text-gray-500">No comments yet</p> )}
    </div>
  );
}
