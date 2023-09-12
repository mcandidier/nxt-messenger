import '../../app/globals.css';

import Sidebar from "../components/Sidebar";

import MessageList from './Conversations';

export default async function layout({children}) {
  return (
    <Sidebar>
      <div className="h-full">
        <MessageList/>
        <main className="h-full">
        {children}
        </main>
      </div>
    </Sidebar>
  )
}