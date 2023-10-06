'use client';

import React, { useEffect, useState, Suspense } from 'react'


import { useConversationMessages } from '@/app/hooks/useConversations'
import Form from '../Form'
import API from '@/app/API';
import { useSelector } from 'react-redux'


import Body from './Body';
import { random } from 'lodash';
import Loading from './loader';



function Convo({params, data, currentUser }) {

  const { messageId } = params;
  const [messages, setMessages] = useState(data);
  const [loading, setLoading ] = useState(false);

  const newMessages = useSelector((state) => state.notifications);

  /* eslint-disable no-console, no-control-regex*/
  useEffect(() => {
    let lastMessage = messages[messages.length - 1];
    newMessages.filter(msg => {
      if(msg.conversation === Number(messageId)) {
        const clonedObject = { ...msg, isSame: true };
        setMessages([...messages, clonedObject]);
        lastMessage = clonedObject;
      }
    })
    
    if(lastMessage) {
      const url = `conversations/${lastMessage.conversation}/messages/${lastMessage.id}/seen/`;
      if(lastMessage.sender !== currentUser.id ) {
        API.put(url);
      }
    }

  }, [
    newMessages,
    setMessages,
    currentUser.id,
    messages,
    messageId,
    data,
  ])

  return (
    <div className='h-full flex flex-col'>
      <Body params={params} 
        messages={messages} 
        setMessages={setMessages} 
        loading={loading} 
        currentUser={currentUser}/>
      <Form params={params} setMessages={setMessages} messages={messages}></Form>
    </div>
  )
}

export default Convo;