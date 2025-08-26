import React, { useContext, useEffect, useState } from 'react'
import { getAllPostsApi } from '../Services/PostServices'
import Post from '../Components/Posts/Post';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import CreatePost from '../Components/Posts/CreatePost';
import { AuthContext } from '../Components/Context/AuthContext';
import PasswordModal from '../Components/PasswordModal/PasswordModal';



export default function Home() {

  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);


  async function getAllPosts() {
    setLoading(true);
    const data = await getAllPostsApi(userToken);
    setAllPosts(data.posts);

    if (data.message) {
      setAllPosts(data.posts);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);


  return <>

      <CreatePost callBack={getAllPosts} />
      {
        !loading ? allPosts.map((post) => <Post key={post._id} post={post} numOfComments={1} callBack={getAllPosts}/>)
          : <LoadingScreen />
      }

  </>
}
