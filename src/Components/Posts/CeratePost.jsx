import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'

export default function CeratePost() {
const [feed, setFeed] = useState('')

  return<>
  <div className='bg-white shadow-2xl max-w-xl mx-auto rounded-md'>
     <div className='flex flex-col items-center'>
          <Input value={feed} onChange={(e)=>setFeed(e.target.value)} className=' p-2' variant='faded' placeholder="post here ..." type="text" />
<div className="flex">
<img src="" alt="" />
            <div>
                  <Button>Add post</Button>
          <Button >Cancel</Button>

            </div>
</div>
        </div>
  </div>
  </>
}
