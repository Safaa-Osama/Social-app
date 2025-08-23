import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePostsApi } from '../../Services/PostServices'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Post from './Post'
import { AuthContext } from '../Context/AuthContext'

export default function PostDetails({}) {
const {id} = useParams()


  const [singlePOst, setSinglePOst] = useState(null)
  const [loading, setLoading] = useState(true)
  const {userToken} = useContext(AuthContext);

  async function getSinglePost() {
    setLoading(true);
    const data = await getSinglePostsApi(id,userToken);
    if (data.message) {
      setSinglePOst(data.post);
      setLoading(false);
    }
  }

  useEffect(() => {
    getSinglePost();}, []);

  return<>
  <main className='min-h-screen'>
        {
          singlePOst ? <Post post={singlePOst} numOfComments={singlePOst.comments.length} details={true}/>
           : <LoadingScreen/>
        }
      </main>
  </>
}
