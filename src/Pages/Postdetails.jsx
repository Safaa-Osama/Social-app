import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../Components/Posts/Post'
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen'

export default function Postdetails() {
  const {id} = useParams( )
  return <>
  {posts? <Post post={post} comments={Post.comments.length} /> 
  : <LoadingScreen/> }
  </>
}
