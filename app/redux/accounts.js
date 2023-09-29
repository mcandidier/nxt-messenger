import { createSlice } from "@reduxjs/toolkit";


export const AccountSlice = createSlice({
  name: 'accounts',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  }
})

export const {
  setUsers,
} = AccountSlice.actions;
