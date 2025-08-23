import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'

export default function CreatePost() {
  const [feed, setFeed] = useState('')

  return <>
    <div className='bg-white shadow-2xl  max-w-xl mx-auto rounded-md p-3'>
      <form >
        <textarea className='mx-auto p-3 m-3 border w-full rounded md resize-none' cols={20} rows={5}
          placeholder="What's in your mind ?"></textarea>
        <div className="flex items-center justify-between">
          <label>
            <input type="file" className='hidden' />
            <div className="flex gap-1 p-2">
              <span>icon</span>
              <span>img</span>
            </div>
          </label>
          <div >
            <button type='reset' className='cursor-pointer mx-1' >Cancel</button>
            <Button type='submit' className='cursor-pointer mx-1' color='primary'>Post</Button>
          </div>
        </div>
      </form>
    </div>
  </>
}
