'use client';


import React, { useContext } from 'react'
import Avatar from '../../components/Avatar'
import Pusher from 'pusher-js'
import { useConversationMessages } from '@/app/hooks/useConversations'
import clsx from 'clsx';
import { AuthContext } from '../../context/AuthContext';
import { useUserHook } from '../../hooks/useUser';
import Header from '../Header';
import Loading from './loader';

import EmpytState from '@/app/components/EmpytState';


function Body({messages, setHeader, loading}) {
  const { data: currentUser} = useUserHook();

  let nxtElem = null;

  return (
    <>
      <Header header={messages?.title}></Header>
      <div className='flex-1 overflow-y-auto px-6 py-4'>
      {!loading && messages && (
       <>
        {messages?.map((message, index, array) => {
          const isSender = message.sender === currentUser.id;
          if (index < array.length - 1) {
            nxtElem = array[index + 1];
            if(message.sender === nxtElem.sender) {
              nxtElem['isSame'] = true;
            } else {
              nxtElem['isSame'] = false
            }
          }
  
          return (
            <div key={message.id} className={`flex flex-col mb-2  ${isSender ? 'items-end' : 'items-start'}`}>
              { !message?.isSame && (
                <div className='flex gap-2 items-center rounded-sm'>
                <Avatar pk={message.sender} fromMessage={true}></Avatar>
              </div>
              )}
              <div className={`${isSender ? 'bg-sky-500': 'bg-rose-300'} py-2 px-5 rounded-full text-neutral-100 text-sm`}>
                {message.content}
              </div>
          </div>
          )

          {messages.length === 0 && (
            <EmpytState />
          )}
        })
        } 
      </>
      )}
      </div>
  </>
  )
}

export default Body

