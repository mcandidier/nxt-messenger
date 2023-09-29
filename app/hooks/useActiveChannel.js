'use client'
import { useEffect, useState } from "react";
import {  pusherSever } from "../libs/pusher";
import { Channel, Members } from "pusher-js";
import useActiveMembers from "./useActiveMembers";

import API from "../API";


const useActiveChannel = () => {
  const { set, add, remove } = useActiveMembers();
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    const channel = activeChannel;
    if (!channel) {
      const channel = pusherSever.subscribe('presence-messenger');
      setActiveChannel(channel);

      channel.bind("pusher:subscription_succeeded", (members) => {
        const initialMembers = [];
  
        members.each((member) => initialMembers.push(Number(member.id)));
        set(initialMembers);
      });
  
      channel.bind("pusher:member_added", (member) => {
        add(Number(member.id))
      });
  
      channel.bind("pusher:member_removed", (member) => {
        remove(Number(member.id));
      });
    }

    return () => {
      if (activeChannel) {
        pusherSever.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    }
  }, [activeChannel, set, add, remove]);
}

export default useActiveChannel;