import React from 'react'

import Convo from './Convo'

import API from '@/app/libs/api'
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import getMessages from '@/app/actions/getMessages';

async function Message({params}) {
  const { messageId} = params;

  const { data } = await getMessages(messageId);
  const {data: currentUser} = await getCurrentUser();

  return (
    <div className='lg:pl-80 h-full'>
        <Convo params={params} data={data} currentUser={currentUser}/>
    </div>
  )
}

export default Message