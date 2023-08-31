import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import API from '../API';
import Avatar from './Avatar';


function UserBox({user}) {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // setLoading(true);
    console.log('test click');
  }

  return (
    <div onClick={handleClick}
      className='
      w-full
      relative
      flex
      items-center
      p-3
      space-x-3
      rounded-lg
      cursor-pointer
      hover:bg-neutral-100
      transition
      '>
        <Avatar user={user}/>
        <div onclick={handleClick} className='flex text-sm justify-between text-gray-900'>
          {user.name}
        </div>
      </div>
    )
}

export default UserBox