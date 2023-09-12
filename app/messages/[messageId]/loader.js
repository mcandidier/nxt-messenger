'use client'

import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import Avatar from '@/app/components/Avatar';
import { random } from 'lodash';

import Header from '../Header';

function Loading() {

  const numberArray = Array.from({ length: 3 }, (_, index) => index + 1);

  return (
    <>
    <Header header='loading...'></Header>
    <div className='flex-1 px-6 py-4'>
      <div className='flex-1 overflow-y-auto'>
        {numberArray.map((id) => {
          const isSender = random([true, false])
          const message = {'isSame': isSender}
          const isOdd = id % 2 === 1;

          return (
            <div key={id} className={`flex flex-col mb-2  ${isOdd ? 'items-end' : 'items-start'}`}>
              <div className='flex gap-2 items-center rounded-sm'>
                { isOdd && (
                  <Skeleton className="h-3 w-[200px] bg-gray-100"/>
                )
                }
                <Skeleton className="h-11 w-11 rounded-full bg-gray-200" />
                { !isOdd && (
                  <Skeleton className="h-3 w-[200px] bg-gray-100"/>
                )
                }
              </div>
              <div className='flex gap-2'>
                <div className={`py-2 text-neutral-100 text-sm`}>
                  <Skeleton className="h-5 w-[250px] rounded-full py-2 bg-gray-100 mb-2"/>
                  <Skeleton className="h-4 w-[250px] rounded-full  bg-gray-100 mb-2"/>
                  {isOdd && (
                    <Skeleton className="h-3 w-[250px] rounded-full  bg-gray-100"/>
                  )}
                </div>
              </div>
          </div>
          
          )
        })} 
      </div>
    </div>
    </>
  )
  
  
}

export default Loading; 