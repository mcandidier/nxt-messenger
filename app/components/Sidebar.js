'use client'

import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import UserList from './UserList'
import DesktopSidebar from './DesktopSidebar'

import { createNotification } from '../redux/notificationSlice'
import { pusherClient } from '../libs/pusher'

function Sidebar({children}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if(!channel && user) {
      // Listen for the connected event
      pusherClient.connection.bind('connected', () => {
        console.log('Pusher aa successfully');
      });

      pusherClient.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      // Listen for disconnection event
      pusherClient.connection.bind('disconnected', () => {
          console.warn('Pusher disconnected');
      });
    
      const channelName = `${user.id}-conversations`;
      const channel = pusherClient.subscribe(channelName);

      channel.bind('new-message', function(data) {
        // Update the chat interface with the new message
        console.log(data, 'message')
        const message = data.message;
        const sender = data.sender;
        // Add the message to the chat window
        dispatch(createNotification(data));
      });

      channel.bind('new-channel', function(data) {
        const conversation_id = data.conversation_id;
      });

      setChannel(channel)

    }

    return () => {
      if(channel) {
        pusher.unsubscribe(`${user.id}-conversations`);
        setChannel(null);
      }
    }
  }, [user]);


  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user}/>
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
    )
}

export default Sidebar