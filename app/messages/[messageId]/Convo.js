'use client';

import React, { useEffect, useState, Suspense } from 'react'


import { useConversationMessages } from '@/app/hooks/useConversations'
import Form from '../Form'
import API from '@/app/API';


import Body from './Body';
import { random } from 'lodash';
import Loading from './loader';

function Convo({params, data, currentUser }) {

  const { messageId } = params;
  const [messages, setMessages] = useState(data);
  const [loading, setLoading ] = useState(false);

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