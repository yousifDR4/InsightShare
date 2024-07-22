import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import { useReducer } from "react";
import userSlice from "./userSlice";

 const store=configureStore({
    reducer:{
        post:postSlice,
        user:userSlice,
    }
});
export default store;