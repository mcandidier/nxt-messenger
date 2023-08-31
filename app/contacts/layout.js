
import '../../app/globals.css';

import Sidebar from "../components/Sidebar";
import UserList from '../components/UserList';


export default async function layout({children}) {
  return (
    <Sidebar>
      <div className="h-full">
        <main className="h-full">
          <UserList/>
          {children}
        </main>
      </div>
    </Sidebar>
  )
}