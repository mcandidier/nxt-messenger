'use client'

import React, {useMemo, useState, useEffect} from 'react';

import { useRouter } from 'next/navigation';
import Avatar from '../components/Avatar';
import clsx from 'clsx';
import { useParams } from 'next/navigation';

import _ from 'lodash';
import format from 'date-fns/format';


import Pusher from 'pusher-js';
import { AuthContext } from '../context/AuthContext';


import { useConversation, useConversationMessages } from '../hooks/useConversations';
import useLatestMessage from '../hooks/useLatestMessage';
import getUserById from '../actions/getUserById';

function Message ({message, currentUser}) {

  const router = useRouter();
  const { conversationId, isSelected } = useConversation(message.id);
  // const { data: latest, mutate: mutatedLastMessage } = useLatestMessage(message.id);
  const [user, setUser] = useState(null);
  const handleClick = (e) => {
    router.push(`/messages/${message.id}`);
  }
  const receiverId = _.find(message.participants, participant => participant !== message.owner);
  const userId = currentUser.id === receiverId ? message.owner : receiverId;


  useEffect(() => {
    getUserById(userId).then((resp) => {
      setUser(resp.data);
    });

    return () => {
      setUser(null);
    }
  }, [userId])


  return (
    <div className={clsx(`
      cursor-ponter
      flex
      justify-center
      items-center
      gap-2 p-3 mb-2
      rounded-lg
      hover:bg-neutral-50
      ease-in-out
      transition
    `,
    isSelected ? 'bg-neutral-100': '',
    )}
    onClick={handleClick}>
      <Avatar pk={userId}></Avatar>
      <div className='min-w-0 flex-1'>
      <div  
        className='flex justify-between items-center cursor-pointer'>
          <p className={`text-md font-sm text-black ${message.hasNew && 'font-bold'}`}>{user?.name}</p>
        {/* { latest && (
          <p className='text-xs font-light text-gray-400'>{format(new Date(latest?.timestamp), 'p')}</p>
        )} */}
      </div>
    </div>
    </div>
  )
}

export default Message
