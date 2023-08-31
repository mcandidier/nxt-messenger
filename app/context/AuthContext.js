"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from 'nookies';
import { useEffect, useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {


  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies.token;

  useEffect(() => {
    if (!token || token === 'undefined') {
      router.push('/login');
      return;
    } else {
      console.log('llgin');
      setIsAuthenticated(true)
    }
  }, [token, router]);

  return(
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}