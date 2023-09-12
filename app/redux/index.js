import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import { NotificationSlice } from "./notificationSlice";



const store = configureStore({
  reducer: {
    notifications: NotificationSlice.reducer,
  },
  middleware: [thunk]
});

export default store;
