import React, { useEffect, useState } from 'react'
import { getAllPostsApi } from '../Services/PostServices'
import Post from '../Components/Posts/Post';
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen';
import CeratePost from '../Components/Posts/CeratePost';



export default function Home() {

  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)

  async function getAllPosts() {
    setLoading(true);
    const data = await getAllPostsApi();
    setAllPosts(data.posts);

    if (data.message) {
      setAllPosts(data.posts);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();}, []);


  return <>
<CeratePost/>
    <main className='min-h-screen'>
      {
        allPosts.length ? allPosts.map((post) => <Post key={post._id} post={post} />)
         : <LoadingScreen/>
      }
    </main>


  </>
}
