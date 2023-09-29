'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// import { useGetUser, useUserHook } from '../hooks/useUser'
import { Loader } from 'lucide-react'

import clsx from 'clsx'
import useActiveMembers from '../hooks/useActiveMembers'
import API from '../API'


function Avatar({pk, fromMessage, currentUser}) {
  const { members } = useActiveMembers();
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false)

  const avatarCls = fromMessage ? currentUser.id === user?.id ?  'bg-sky-600' : 'bg-rose-600' : 'bg-sky-600';
  const isOwner = fromMessage && user?.id === currentUser?.id;
  
  if(!pk) {
    return (null);
  }

  useEffect(() => {
    setIsLoading(true)
    try {
      API.get(`accounts/user/${pk}`).then((resp) => {
        setUser(resp.data);
        setIsLoading(false)
      });
      const active = members.indexOf(user?.id) !== -1;
      setIsActive(active);
    } catch (err) {
      alert(err)
    }
    return () => {
      setUser(null);
      setIsLoading(false);
      setIsActive(false);
    }

  }, [pk])



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

      {isActive && (
        
         <span 
         className={clsx(
          `absolute 
          block 
          rounded-full 
          bg-green-500 
          ring-2 
          ring-white 
          top-0 
          right-0
          h-2 
          w-2 
          md:h-3 
          md:w-3`
          ,
          isOwner ? 'right-0': 'left-6'
         )}
       />
      )}
    </div>
    )
    }
    </>
  )
}

export default Avatar