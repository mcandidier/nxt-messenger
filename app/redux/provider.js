"use client";

import { Provider } from "react-redux";
import store from "./index";
import { parseCookies } from 'nookies';
import { setUser } from "./userSlice";
import { useEffect } from "react";
import API from "../API";

export default function Providers({ children }) {
  const cookies = parseCookies();
  const token = cookies.token;

  const getUser = async () => {
    const resp = await API.get('accounts/user/');
    const data = await resp.data;
    if(resp.status === 200) {
      store.dispatch(setUser(data));
    }
  }

  useEffect(() => {
    if(token) {
      // todo: check token if valid then request user.
      getUser();
    }
  }, []);



  return <Provider store={store}>{children}</Provider>;
}