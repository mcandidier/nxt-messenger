import '../../app/globals.css';

import Sidebar from "../components/Sidebar";

import Conversations from './Conversations';

import API from '../libs/api';
import { cookies } from 'next/headers'


export default async function layout({children}) {
  const token = cookies().get('token')?.value

  if(!token) {
    return (null);
  }

  const getChat = async () => {
    const resp = await API.get('conversations/');
    return {
      data: await resp.data
    }
  }
  
  const { data } = await getChat();

  return (
    <Sidebar>
      <div className="h-full">
        <Conversations conversations={data}/>
        <main className="h-full">
        {children}
        </main>
      </div>
    </Sidebar>
  )
}