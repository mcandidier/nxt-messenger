import '../../app/globals.css';

import Sidebar from "../components/Sidebar";

import Conversations from './Conversations';


export default async function layout({children}) {

  return (
    <Sidebar>
      <div className="h-full">
        <Conversations/>
        <main className="h-full">
        {children}
        </main>
      </div>
    </Sidebar>
  )
}