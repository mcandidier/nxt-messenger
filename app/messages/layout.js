
import '../../app/globals.css';

import Sidebar from "../components/Sidebar";
import MessageList from './MessageList';

export default async function layout({children}) {
  return (
    <Sidebar>
      <div className="h-full">
        <main className="h-full">
          <MessageList/>
          {children}
        </main>
      </div>
    </Sidebar>
  )
}