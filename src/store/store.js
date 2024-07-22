import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import { useReducer } from "react";
import userSlice from "./userSlice";
import selectedChatSlice from "./selectedChatSlice";

 const store=configureStore({
    reducer:{
        post:postSlice,
        user:userSlice,
        selectedChat:selectedChatSlice,
        
    }
});
export default store;