import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { NotificationSlice } from "./notificationSlice";
import { UserSlice } from "./userSlice";
import { AccountSlice } from "./accounts";


const store = configureStore({
  reducer: {
    notifications: NotificationSlice.reducer,
    user: UserSlice.reducer,
    accounts: AccountSlice.reducer,
  },
  middleware: [thunk]
});

export default store;
