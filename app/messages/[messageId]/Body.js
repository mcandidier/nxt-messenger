'use client';


import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx';
import Pusher from 'pusher-js'
import _ from 'lodash'

import { useConversationMessages } from '@/app/hooks/useConversations'
import { AuthContext } from '../../context/AuthContext';
import { useUserHook } from '../../hooks/useUser';

import Header from '../Header';
import Loading from './loader';
import Avatar from '../../components/Avatar'
import EmpytState from '@/app/components/EmpytState';


function Body({params, messages, setMessages, loading }) {
  const { data: currentUser} = useUserHook();
  const {messageId} = params;

  const newMessages = useSelector((state) => state.notifications);
  
  useEffect(() => {
    const foundObjects = _.filter(newMessages, { conversation: Number(messageId) });

    console.log(foundObjects, 'foundObjects')
    foundObjects.map((message) => {
      Object.preventExtensions(message);

      // Clone the object and add a new property
      const clonedObject = { ...message, isSame: true };
      setMessages([...messages, clonedObject]);
    });
  
  }, [newMessages]);
  
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
            
            if(message.sender === nxtElem.sender && nxtElem) {
              nxtElem.isSame = true;
            } else {
              nxtElem.isSame = false
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

