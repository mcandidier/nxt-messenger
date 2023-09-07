import '../../app/globals.css';

import Sidebar from "../components/Sidebar";

import MessageList from './Conversations';
import AuthContextProvider from '../context/AuthContext';


export default async function layout({children}) {
  return (
      <AuthContextProvider>
        <Sidebar>
          <div className="h-full">
            <MessageList/>
            <main className="h-full">
            {children}
            </main>
          </div>
        </Sidebar>
      </AuthContextProvider>

  )
}