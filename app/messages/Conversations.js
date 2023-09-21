'use client'

import React, { useEffect, useState, useContext } from 'react'
import { MESSAGES } from '../data/data'
import Message from './Message'
import { AuthContext } from '../context/AuthContext'
import { useConversationsHook } from '../hooks/useConversations'


import Loading from './loader'
import { useUserHook } from '../hooks/useUser'
import { useSelector } from 'react-redux'
import { useConversation, useConversationMessages } from '../hooks/useConversations';

function Conversations({conversations}) {

  const[ loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user)
  const newMessages = useSelector((state) => state.notifications);
 
  useEffect(() => {

  }, [newMessages]);

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

          {currentUser && (
             conversations?.map((message) => {
              Object.preventExtensions(message);
              let msgObj = { ...message, hasNew: false };

              const foundObjects = _.find(newMessages, { conversation: Number(message.id) });
              if(foundObjects) {
                Object.preventExtensions(message);
                msgObj= { ...message, hasNew: true };
              }
              return <Message key={message.id} message={msgObj} currentUser={currentUser}/>
            })
          )
          } 
        </div>
  </div>
  )
}

export default Conversations