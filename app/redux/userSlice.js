import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  }
})


export const {
  setUser,
} = UserSlice.actions;
