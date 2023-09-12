'use client'

import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

function Loading() {

  const numberArray = Array.from({ length: 6 }, (_, index) => index + 1);

  return (
    <>
    {numberArray.map((id) => {
      return <div key={id} className='flex items-center gap-2 p-3 mb-2 rounded-lg w-full'>
        <Skeleton className="h-11 w-11 rounded-full bg-gray-200" />
        <div
          className='cursor-pointer'>
            <Skeleton className="h-4 w-[200px] mb-2 bg-gray-100"/>
            <Skeleton className="h-2 w-[100px] bg-gray-100"/>
        </div>
      </div>
      })} 
    </>
   
  )
}

export default Loading; 