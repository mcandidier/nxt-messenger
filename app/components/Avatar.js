'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'

import { useGetUser, useUserHook } from '../hooks/useUser'
import { Loader } from 'lucide-react'

function Avatar({pk, fromMessage}) {
  const {data: user, error, isLoading} = useGetUser(pk)
  const {data: currentUser, isLoading: currentUserLoading} = useUserHook();
  
  if(isLoading && currentUserLoading) {
    return <Loader></Loader>
  }

  const avatarCls = fromMessage ?  currentUser.id === user?.id ?  'bg-sky-600' : 'bg-rose-600' : 'bg-sky-600';


  return (
   <>
    {user && !isLoading && (
      <div className="relative flex justify-center gap-2 items-center mb-1">
      {fromMessage && user?.id === currentUser?.id && (
        <div className='flex'>
          {user.name}
        </div>
      )}
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
          { user.image && (
            <Image
              fill
              src={user?.image || '/images/placeholder.jpg'}
              alt={user?.email}
            />
          )}

          { !user.image && !isLoading && (
            <div className={ `flex text-white text-lg h-8 w-8 justify-center items-center ${avatarCls}`}>{user.email[0].toUpperCase()}</div>
          )}
        </div>
      </div>
      {fromMessage && user?.id !== currentUser?.id && (
        <div className='flex'>
          {user.name}
        </div>
      )}
    </div>
    )
    }
    </>
  )
}

export default Avatar