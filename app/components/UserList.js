'use client';

import React from 'react'
import { USERS } from '../data/data';
import UserBox from './UserBox';


function UserList() {
  // todo endpoint integration

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
            Contacts
          </div>
        </div>


        {USERS.map((user,key) => {
          return <UserBox key={key} user={user} />
        })}
      </div>

    </div>
  )
}

export default UserList