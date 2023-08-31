'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

export const withAuthAndPermission = (PageComponent, permissions) => {
  const WrappedComponent = props => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const cookies = parseCookies();
    const token = cookies.token;

    useEffect(() => {

      // Redirect to login page if user is not authenticated
      if (!token || token === 'undefined') {
        setLoading(false);
        console.log('test')
        router.push('/login');
        return;
      } else {
        console.log('llgin')
        setLoading(false)
      }

    }, []);

    if(loading) {
        return <p>loading...</p>
    }

    return  (
        <>
        { token && (
            <PageComponent {...props} />
        )}
        </>
    )
  };

  return WrappedComponent;
};