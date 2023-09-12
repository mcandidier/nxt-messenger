'use client'

import React, {useMemo, useState, useEffect} from 'react';

import { useRouter } from 'next/navigation';
import Avatar from '../components/Avatar';
import clsx from 'clsx';
import { useParams } from 'next/navigation';

import _ from 'lodash';

import Pusher from 'pusher-js';
import { AuthContext } from '../context/AuthContext';
import { useGetUser } from '../hooks/useUser';


function Message({message, currentUser}) {

  const router = useRouter();
  const params = useParams()
  const { messageId } = params;

  const selected = useMemo(() => {
    const isSelected = parseInt(messageId) === parseInt(message.id);
    return isSelected;
  }, [messageId]);

  const handleClick = (e) => {
    router.push(`/messages/${message.id}`);
  }
  const [pusher, setPusher] = useState(null)

  useEffect(() => {
    if(!pusher && currentUser) {
      const newPusher = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_KEY, {
          cluster: 'ap1'
        }
      )
      // Listen for the connected event
      newPusher.connection.bind('connected', () => {
        // console.log('Pusher connected successfully');
      });

      newPusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      // Listen for disconnection event
      newPusher.connection.bind('disconnected', () => {
          console.warn('Pusher disconnected');
      });
    
      const channelName = `${currentUser.id}-conversations`;
      const channel = newPusher.subscribe(channelName);
      
      channel.bind('new-message', function(data) {
        // Update the chat interface with the new message
        const message = data.message;
        const sender = data.sender;
        console.log(message, sender);
        // Add the message to the chat window
      });

      channel.bind('new-channel', function(data) {
        const conversation_id = data.conversation_id;
        console.log(conversation_id, 'channel created');
      });
    }

  },[]);
  

  const receiverId = _.find(message.participants, participant => participant !== message.owner);
  console.log(receiverId, 'test')
  console.log('currentUser', currentUser);

  const userId = currentUser.id === receiverId ? message.owner : receiverId;

  console.log(userId, 'userId')
  const {data: user} = useGetUser(userId);
  
  return (

    <div className={`cursor-ponter flex items-center gap-2 p-3 mb-2 rounded-lg hover:bg-neutral-50 ${clsx({'bg-neutral-100': selected})} ease-in-out transition`}
     onClick={handleClick}>
      <Avatar pk={userId}></Avatar>
      <div
        className='cursor-pointer'
      >{user?.username}
      </div>
    </div>
  )
}

export default Message
