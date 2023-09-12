'use client'

import React, { useEffect, useState, useContext } from 'react'
import { MESSAGES } from '../data/data'
import Message from './Message'
import { AuthContext } from '../context/AuthContext'
import { useConversationsHook } from '../hooks/useConversations'


import Loading from './loading'
import { useUserHook } from '../hooks/useUser'

function MessageList() {

  const[ loading, setLoading] = useState(true);
  const {data: conversations, isLoading} = useConversationsHook();

  const {data: currentUser} = useUserHook();

  return (
    <div className='
    fixed
    inset-y-0
    pb-20
    lg:block
    lg:w-80
    overflow-y-auto
    border-r
    border-gray-200
    w-full
  '>
    <div className='px-5'>
          <div className='flex-col'>
            <div className='text-1xl font-semibold text-neutral-800 mb-4'>
              Messages
            </div>
          </div>
          { isLoading  && (
            <Loading></Loading>
          )
          }

          {!isLoading && currentUser && (
             conversations.map((message, key) => {
              return <Message key={key} message={message} currentUser={currentUser} onClick={()=> console.log('aa')}/>
            })
          )
          } 

        </div>
  </div>
  )
}

export default MessageList