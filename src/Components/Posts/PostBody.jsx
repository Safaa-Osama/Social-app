import React from 'react'

export default function PostBody({body, photo}) {
  return <>
  
       <div className='flex flex-col'>
          {body && <p>{body}</p>}
          {photo && <img src={photo} className='w-full h-75 ' alt="" />}
        </div>
  </>
}
