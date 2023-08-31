'use client'

import React from 'react'
import { MESSAGES } from '../data/data'
import Message from './Message'


function MessageList() {
  return (
    <div className='
    fixed
    inset-y-0
    pb-20
    lg:block
    lg:w-80
    overflow-y-auto
    border-r
    border-gray-200
    w-full
  '>
    <div className='px-5'>
          <div className='flex-col'>
            <div className='text-1xl font-semibold text-neutral-800'>
              Messages
            </div>
          </div>
          {MESSAGES.map((message,key) => {
            return <Message key={key} message={message} onClick={()=> console.log('aa')}/>
          })}
        </div>
  </div>
  )
}

export default MessageList