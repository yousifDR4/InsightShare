import React from "react";
import { setChat } from "../store/selectedChatSlice";
import { useDispatch, useSelector } from "react-redux";

function MobileChat({ data }) {
  // const selectedChat = useSelector((state) => state.selectedChat.selectedChat);
  const DispatchRedux = useDispatch();
  const handelClick = (e) => {
    console.log("workssssssssssss");
    DispatchRedux(setChat(data));
  };
  return (
    <>
      <li
        onClick={handelClick}
        className="p-1 px-2 cursor-pointer hover:bg-gray-200 flex space-x-1"
      >
        <img
          src="/photo_2024-05-18_12-08-09.jpg"
          className="rounded-xl h-6 w-6"
          alt=""
        />
        <span>{data.name}</span>
      </li>
    </>
  );
}

export default MobileChat;
