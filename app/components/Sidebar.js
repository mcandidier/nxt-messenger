'use client'

import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import Pusher from 'pusher-js'

import UserList from './UserList'
import DesktopSidebar from '../contacts/components/DesktopSidebar'

import { createNotification } from '../redux/notificationSlice'


function Sidebar({children}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [pusher, setPusher] = useState(null);

  useEffect(() => {
    if(!pusher && user) {
      const newPusher = new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_KEY, {
          cluster: 'ap1'
        }
      )
      // Listen for the connected event
      newPusher.connection.bind('connected', () => {
        console.log('Pusher connected successfully');
      });

      newPusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      // Listen for disconnection event
      newPusher.connection.bind('disconnected', () => {
          console.warn('Pusher disconnected');
      });
    
      const channelName = `${user.id}-conversations`;
      const channel = newPusher.subscribe(channelName);
      
      channel.bind('new-message', function(data) {
        // Update the chat interface with the new message
        console.log(data, 'message')
        const message = data.message;
        const sender = data.sender;
        console.log(message, sender);
        // Add the message to the chat window
        dispatch(createNotification(data));
      });

      channel.bind('new-channel', function(data) {
        const conversation_id = data.conversation_id;
        console.log(conversation_id, 'channel created');
      });
      setPusher(newPusher);
    }
  }, [user]);

  // console.log('sidebar', user);

  // if(!user) {
  //   <p>loading</p>
  // }

  return (
    <div className="h-full">
      <DesktopSidebar/>
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
    )
}

export default Sidebar