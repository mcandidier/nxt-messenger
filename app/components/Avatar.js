'use client'

import React from 'react'
import Image from 'next/image'

function Avatar({user}) {
  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-8
        w-8 
        md:h-8
        md:w-8
      ">

        <div className='flex'>
          <Image
            fill
            src={user?.image || '/images/placeholder.jpg'}
            alt="Avatar"
          />
          {user}
        </div>
      </div>
    </div>
  )
}

export default Avatar