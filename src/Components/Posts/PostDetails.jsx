import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostsApi } from '../../Services/PostServices'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Post from './Post'

export default function PostDetails({}) {
const {id} = useParams()


  const [singlePOst, setSinglePOst] = useState(null)
  const [loading, setLoading] = useState(true)

  async function getSinglePost() {
    setLoading(true);
    const data = await getSinglePostsApi(id,localStorage.getItem('token'));
    setSinglePOst(data.post);

    if (data.message) {
      setSinglePOst(data.post);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSinglePost();}, [id]);

  return<>
  <main className='min-h-screen'>
        {
          singlePOst ? <Post post={singlePOst} numOfComments={singlePOst.comments.length} />
           : <LoadingScreen/>
        }
      </main>
  </>
}
