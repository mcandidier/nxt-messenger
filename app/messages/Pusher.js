'use client'

import React, {useEffect, useState } from 'react'
import { createNotification } from '../redux/notificationSlice'
import { pusherClient, pusherSever } from '../libs/pusher'

import { useSelector, useDispatch } from 'react-redux'
import { updateConversations } from '../redux/conversations'

function Pusher() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [channel, setChannel] = useState(null);

  useEffect(() => {

    if(!channel && user) {
      // Listen for the connected event
      pusherSever.connection.bind('connected', () => {
        console.log('Pusher aa successfully');
      });
  
      pusherSever.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });
  
      // Listen for disconnection event
      pusherSever.connection.bind('disconnected', () => {
          console.warn('Pusher disconnected');
      });
    
      const channelName = `private-${user.id}-conversations`;
      const privateChannel = pusherSever.subscribe(channelName);
  
      privateChannel.bind("pusher:subscription_succeeded", () => {
        console.log('connected to private', channelName);
      })
      
      privateChannel.bind('new-message', function(data) {
        // Update the chat interface with the new message
        const message = data.message;
        const sender = data.sender;
        // Add the message to the chat window
        dispatch(createNotification(data));
      });
  
      privateChannel.bind('new-channel', function(data) {
        const conversation_id = data.conversation_id;
        dispatch(updateConversations(data));
      });
  
      setChannel(privateChannel);
    }
  
    return () => {
      if(channel) {
        pusherSever.unsubscribe(`private-${user.id}-conversations`);
        setChannel(null);
      }
    }
  },[channel, user, dispatch]);
  

}

export default Pusher