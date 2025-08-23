import React from 'react'

export default function PostHeader({userName, photo, date}) {
  return <>
   <div className="w-full h-16 flex items-center justify-between ">
          <div className="flex">
            <img className=" rounded-full w-10 h-10 mr-3" src={photo} alt='' />
            <div>
              <h3 className="text-md font-semibold ">{userName}</h3>
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </div>
          
        </div>
  </>
}
