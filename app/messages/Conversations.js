'use client'

import React, { useEffect, useState, useContext } from 'react'
import { MESSAGES } from '../data/data'
import Message from './Message'
import { AuthContext } from '../context/AuthContext'
import { useConversationsHook } from '../hooks/useConversations'
import { MdOutlineGroupAdd } from 'react-icons/md';

import Loading from './loader'
import { useUserHook } from '../hooks/useUser'
import { useSelector } from 'react-redux'
import { useConversation, useConversationMessages } from '../hooks/useConversations';
import Modal from '../components/modals/Modal'
import AddConvo from '../components/AddConvo'

import { setUsers  } from "../redux/accounts";
import { useDispatch } from "react-redux";

function Conversations({conversations, accounts}) {

  const[ loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user)
  const newMessages = useSelector((state) => state.notifications);
 
  const dispatch = useDispatch();
  dispatch(setUsers(accounts));

  const handleOpenConvo = () => {
    setIsOpen(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  }

  // useEffect(() => {

  // }, [newMessages]);

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddConvo></AddConvo>
    </Modal>
    <div className='px-5'>
          <div className='flex flex-row gap-2 mb-4 mt-4 items-center	'>
            <div className='text-1xl font-semibold text-neutral-800 w-80'>
              Messages
            </div>

            <div 
             className="
             w-20
             rounded-full 
             p-2 
             bg-gray-100 
             text-gray-600 
             cursor-pointer 
             hover:opacity-75 
             transition"
             onClick={handleOpenConvo}>
              <MdOutlineGroupAdd size={20} 
                />
              </div>

          </div>


          {currentUser && (
             conversations?.map((message) => {
              Object.preventExtensions(message);
              let msgObj = { ...message, hasNew: false };

              const foundObjects = _.find(newMessages, { conversation: Number(message.id) });
              if(foundObjects) {
                Object.preventExtensions(message);
                msgObj= { ...message, hasNew: true };

              }
              return <Message key={message.id} message={msgObj} currentUser={currentUser}/>
            })
          )
          } 
        </div>
  </div>
  )
}

export default Conversations