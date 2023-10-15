import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { NotificationSlice } from "./notificationSlice";
import { UserSlice } from "./userSlice";
import { AccountSlice } from "./accounts";
import { ConversationSlice } from './conversations';


const store = configureStore({
  reducer: {
    notifications: NotificationSlice.reducer,
    user: UserSlice.reducer,
    accounts: AccountSlice.reducer,
    conversations: ConversationSlice.reducer,
  },
  middleware: [thunk]
});

export default store;
