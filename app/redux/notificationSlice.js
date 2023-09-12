import { createSlice } from "@reduxjs/toolkit"

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    createNotification: (state, action) => [...state, action.payload],
  }
});

export const {
  createNotification,
} = NotificationSlice.actions;
