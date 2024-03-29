import '../../app/globals.css';

import Sidebar from "../components/Sidebar";

import Conversations from './Conversations';

import API from '../libs/api';
import { cookies } from 'next/headers'
import getAllUsers from '../actions/getAllUsers';

import ActiveStatus from '../components/ActiveStatus';


export default async function layout({children}) {
  const token = cookies().get('token')?.value

  if(!token) {
    return (null);
  }

  const {data:accounts} = await getAllUsers();

  return (
    <Sidebar>
      <ActiveStatus/>
      <div className="h-full">
        <Conversations accounts={accounts}/>
        <main className="h-full">
        {children}
        </main>
      </div>
    </Sidebar>
  )
}