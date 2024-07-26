import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: {},
};
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages[action.payload.type] = action.payload.messages;
    },
    addMessages: (state, action) => {
      const temp = action.payload.messages;
      state.messages[action.payload.type] = {
        ...state.messages[action.payload.type],
        temp,
      };
    },
    setpagination: (state, action) => {
      state.posts = [...state.posts, action.payload.posts];
      state.pagination = action.payload.pagination;
    },
  },
});
export const { setMessages, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
