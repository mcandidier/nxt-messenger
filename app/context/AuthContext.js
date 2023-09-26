"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies';
import { useEffect, useState, createContext } from "react";
import API from "../API";

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;


  const getUser = async () => {
    const resp = await API.get('accounts/user/');
    const data = await resp.data;
    return data;
  }

  useEffect(()=> {
    const fetchData = async() => {
      try {
        const data = await getUser();
        setCurrentUser(data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    if (!token || token === 'undefined') {
      router.push('/login');
      setLoading(false)
    } else {
      fetchData();
      setIsAuthenticated(true);
      setLoading(false)
    }

    return () => {
      setIsAuthenticated(false);
    }

  },[router, token]);


  if(loading) {
    return (null);
  }

  return(
      <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, currentUser}}>
        {children}
      </AuthContext.Provider>
  )
}