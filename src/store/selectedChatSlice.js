import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedChat: {
    open: false,
    data: {},
  },
};
const selectedChat = createSlice({
  name: "selectedChat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.selectedChat.open = true;
      state.selectedChat.data = action.payload;
      console.log("works");
    },

    closeChat: (state, action) => {
      return initialState;
    },
  },
});
export const { setChat, closeChat } = selectedChat.actions;
export default selectedChat.reducer;
