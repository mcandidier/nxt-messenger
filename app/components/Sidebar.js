'use client'

import React from 'react'

import { useSelector } from 'react-redux'

import DesktopSidebar from './DesktopSidebar'
import Pusher from '../messages/Pusher'

function Sidebar({children}) {
  const user = useSelector((state) => state.user);
  
  return (
    <div className="h-full">
      <Pusher/>
      <DesktopSidebar currentUser={user}/>
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
    )
}

export default Sidebar