'use client';


import React, { useContext } from 'react'
import Avatar from '../components/Avatar'
import Pusher from 'pusher-js'
import { useConversationMessages } from '@/app/hooks/useConversations'
import clsx from 'clsx';
import { AuthContext } from '../context/AuthContext';


function Body({params}) {
  // const searchParams = useSearchParams()
  // const mesasgeID = searchParams.get('messageId')

  const { messageId } = params;
  // console.log(searchParams, 'searchParams')
  const {data: messages, isLoading} = useConversationMessages(messageId);
  const {currentUser } = useContext(AuthContext)
  console.log(messages)

  // console.log('data', messages);

  // const newPusher = new Pusher(
  //   process.env.NEXT_PUBLIC_PUSHER_KEY, {
  //     cluster: 'ap1'
  //   }
  // )


  // let nextElement = null;
  let nxtElem = null;
  let classX = ''
  return (
    <div className='flex-1 overflow-y-auto px-6 py-4'>

      {messages?.map((message, index, array) => {
        const isSender = message.sender === currentUser.id;
        if (index < array.length - 1) {
          nxtElem = array[index + 1];
          if(message.sender === nxtElem.sender) {
            nxtElem['isSame'] = true;
          } else {
            nxtElem['isSame'] = false
          }
        }

        return (
          <div key={message.id} className={`flex flex-col mb-6  ${isSender ? 'items-end' : 'items-start'}`}>
            { !message?.isSame && (
              <div className='flex gap-2 items-center rounded-sm'>
              <p className=''>Name</p>
              <Avatar user={message.sender}></Avatar>
            </div>
            )}
            <div className='bg-sky-500 py-1 px-3 rounded-full text-neutral-100 text-sm'>
              {message.content}
            </div>
        </div>
        )

      })

      }

    </div>
  )
}

export default Body