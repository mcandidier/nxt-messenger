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
        router.push('/login');
        return;
      } else {
        setLoading(false)
      }

    }, [router, token]);

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