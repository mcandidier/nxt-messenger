import React from 'react'

import Convo from './Convo'

import API from '@/app/libs/api'
import { getCurrentUser } from '@/app/actions/getCurrentUser';


async function Message({params}) {

  const { messageId} = params;
  const fetchData = async () => {
    const url =  `conversations/${messageId}/messages/`;
    const resp =  await API.get(url);
    const data = await resp.data;
    return { data}
  }
  const {data } = await fetchData();
  const {data: currentUser} = await getCurrentUser();


  return (
    <div className='lg:pl-80 h-full'>
        <Convo params={params} data={data} currentUser={currentUser}/>
    </div>
  )
}

export default Message