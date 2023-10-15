import { createSlice } from "@reduxjs/toolkit";

export const ConversationSlice = createSlice({
  name: 'conversations',
  initialState: [],
  reducers: {
    setConversations: (state, action) => action.payload,
    updateConversations: (state, action) => [...state, action.payload]
  }
})

export const {
  setConversations,
  updateConversations,
} = ConversationSlice.actions;
