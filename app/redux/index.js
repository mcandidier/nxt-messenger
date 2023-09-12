import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { NotificationSlice } from "./notificationSlice";
import { UserSlice } from "./userSlice";



const store = configureStore({
  reducer: {
    notifications: NotificationSlice.reducer,
    user: UserSlice.reducer,
  },
  middleware: [thunk]
});

export default store;
