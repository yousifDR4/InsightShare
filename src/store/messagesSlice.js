import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messages: {},
  Loading: {
    Loading: false,
  },
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
    setMessageloaging: (state, action) => {
      state.Loading.Loading = action.payload.loading;
    },
    startloading: (state, action) => {
      state.Loading.Loading = true;
      return state;
    },
  },
});
export const { setMessages, addMessages, setMessageloaging, startloading } =
  messagesSlice.actions;
export default messagesSlice.reducer;
