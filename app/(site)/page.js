'use client'

import { useRouter } from 'next/navigation';

function Home() {
  const router = useRouter();
  router.push('/messages');
  return (null)
}


export default Home