import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import { useReducer } from "react";
import userSlice from "./userSlice";
import selectedChatSlice from "./selectedChatSlice";
import messagesSlice from "./messagesSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
    selectedChat: selectedChatSlice,
    messages: messagesSlice,
  },
});
export default store;
