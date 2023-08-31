import React from 'react'
import DesktopSidebar from '../contacts/components/DesktopSidebar'
import UserList from './UserList'

function Sidebar({children}) {
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