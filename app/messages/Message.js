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
 

  const receiverId = _.find(message.participants, participant => participant !== message.owner);
  const userId = currentUser.id === receiverId ? message.owner : receiverId;
  const {data: user} = useGetUser(userId);
  
  return (
    <div className={`cursor-ponter flex items-center gap-2 p-3 mb-2 rounded-lg hover:bg-neutral-50 ${clsx({'bg-neutral-100': selected})} ease-in-out transition`}
     onClick={handleClick}>
      <Avatar pk={userId}></Avatar>
      <div
        className='cursor-pointer'
      >{user?.name}
      </div>
    </div>
  )
}

export default Message
