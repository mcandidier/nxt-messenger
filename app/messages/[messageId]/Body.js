'use client';


import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx';
import _, { last } from 'lodash'

import { useConversationMessages } from '@/app/hooks/useConversations'
import { AuthContext } from '../../context/AuthContext';
import { useUserHook } from '../../hooks/useUser';

import Header from '../Header';
import Loading from './loader';
import Avatar from '../../components/Avatar'
import EmpytState from '@/app/components/EmpytState';
import format from 'date-fns/format';
import API from '@/app/API';

import { pusherSever } from '@/app/libs/pusher';


function Body({params, messages, setMessages, loading, currentUser }) {

  const {messageId} = params;
  const bottomRef = useRef(null);
  const [newMessage, setNewMessage] = useState(null)

  const newMessages = useSelector((state) => state.notifications);
  const [seenMessage, setSeenMessage]  = useState(null);

  const [channel, setChannel] = useState(null);
  const channelName = `channel-${messageId}`;

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();

    pusherSever.connection.bind('connected', () => {
    });

    if(!channel) {
      const privateChannel = pusherSever.subscribe(channelName);
      privateChannel.bind("pusher:subscription_succeeded", () => {
        console.log('connected to private', channelName);
      })
      
      privateChannel.bind("pusher:subscription_error", (error) => {
        console.log('error from privateChannel',error)
      });
  
      privateChannel.bind('message:seen', (data)=>{
        setSeenMessage(data);
      });
      setChannel(privateChannel);
    }

    const foundObjects = _.filter(newMessages, { conversation: Number(messageId) });
    const newMsg = foundObjects[foundObjects.length -1]
    setNewMessage(newMsg);

    foundObjects.map((message) => {
      Object.preventExtensions(message);
      // Clone the object and add a new property
      const clonedObject = { ...message, isSame: true };
      setMessages([...messages, clonedObject]);
      if(newMsg.id === message.id) {
        if(message.sender !== currentUser?.id ) {
          const url = `conversations/${message.conversation}/messages/${message.id}/seen/`;
          API.put(url);
        }
      }
      // update seen status
    });


    return () => {
      if(channel) {
        pusherSever.unsubscribe(channelName);
      }
    }
    
  }, [
    channel,
    channelName,
    messageId,
    currentUser?.id,
    newMessages,
  ]);


  useEffect(() => {
    const newMsg = messages[messages.length - 1]
    setNewMessage(newMsg);
    if(newMsg && !newMessages.length) {
      const url = `conversations/${newMsg.conversation}/messages/${newMsg.id}/seen/`;
      if(newMsg.sender !== currentUser.id ) {
        API.put(url);
      }
    }

    return () => {
      setNewMessage(null);
    }
  }, [messages, currentUser.id, newMessages.length]);



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
                <div className='flex gap-2 items-center rounded-sm duration-300 opacity-100 scale-100 transform'>
                {isSender && (
                  <div className='flex'>
                    <p className='text-xs text-gray-400'>{format(new Date(message.timestamp), 'p')}</p>
                  </div>
                )}
                <Avatar pk={message.sender} fromMessage={true} currentUser={currentUser}></Avatar>
                {!isSender && (
                  <div className='flex'>
                    <p className='text-xs text-gray-400'>{format(new Date(message.timestamp), 'p')}</p>
                  </div>
                )}
              
                  
              </div>
              )}
              <div className={`${isSender ? 'bg-sky-500': 'bg-gray-100'} py-2 px-5 rounded-full text-sm w-fit`}>
                <p className={clsx(
                  isSender? 'text-white': 'text-neutral-800' )}
                >{message.content}</p>
              </div>

              {newMessage?.id  === message.id && (
                <div className='flex'>

                  { seenMessage?.message === message.id && isSender && (
                    <p className='text-xs text-neutral-400'>seen by {seenMessage?.seen_by}</p>
                  )}
              </div>
              )}
          </div>
          )

          {messages.length === 0 && (
            <EmpytState />
          )}
        })
        } 
        <div ref={bottomRef} className='pt-24'></div>
      </>
      )}
      </div>
  </>
  )
}

export default Body

