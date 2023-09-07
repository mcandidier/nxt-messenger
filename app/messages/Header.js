'use client';

import React from 'react'
import Avatar from '../components/Avatar';

function Header() {
  return (
    <div className='
    bg-white 
    w-full 
    flex 
    border-b-[1px] 
    sm:px-4 
    py-3 
    px-4 
    lg:px-6 
    justify-between 
    items-center 
    shadow-sm'>
      <div className='flex items-center justify-between'>
         <Avatar/>
         <div className='flex px-2'>
          test name
        </div>
      </div>
      <div className='flex items-end'>
          ...
        </div>
    </div>
  )
}

export default Header