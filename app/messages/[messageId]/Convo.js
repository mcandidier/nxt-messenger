'use client';

import React, { useEffect, useState } from 'react'
import { useConversationMessages } from '@/app/hooks/useConversations'
import Form from '../Form'
import API from '@/app/API';

import Body from './Body';
import { random } from 'lodash';

function Convo({params}) {
  const { messageId } = params;
  const [messages, setMessages] = useState([]);

  const [loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const url =  `conversations/${messageId}/messages/`;
      const resp =  await API.get(url);
      const data = await resp.data;
      setMessages(data);
      setTimeout(() => {setLoading(false)}, random(2000))
    }

    fetchData();
    return () => {
      setMessages([]);
      setLoading(false)
    }
  }, []);

  return (
    <div className='h-full flex flex-col'>
      <Body messages={messages} loading={loading}/>
      <Form params={params} setMessages={setMessages} messages={messages}></Form>
    </div>
  )
}

export default Convo;