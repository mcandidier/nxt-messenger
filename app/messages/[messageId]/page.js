import React from 'react'

import Convo from './Convo'

import { getCurrentUser } from '@/app/actions/getCurrentUser';
import getMessages from '@/app/actions/getMessages';
import { cookies } from 'next/headers'


async function Message({params}) {
  const { messageId} = params;
  const token = cookies().get('token')?.value

  const { data  } = await getMessages(messageId);
  const {data: currentUser} = await getCurrentUser();

  if(!token) {
    return (null);
  }

  return (
    <div className='lg:pl-80 h-full'>
        <Convo params={params} data={data} currentUser={currentUser}/>
    </div>
  )
}

export default Message