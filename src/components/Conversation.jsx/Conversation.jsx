import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../store/selectedChatSlice";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect.jsx";
import groupmesages from "../../api/messages/groupmesages.js";
import conversationsmessages from "../../api/messages/conversationsmessages.js";
import { setMessageloaging, setMessages } from "../../store/messagesSlice.js";
import Loadingconversations from "./Loadingconversations.jsx";
const Conversation = ({ conversation, mapkey, length, index }) => {
  const dispatchRedux = useDispatch();
  console.log(length, index);
  const fetchMessages = async () => {
    let data = [];
    try {
      console.log(conversation[0]);
      if (conversation[0]?.conversation_id) {
        data = await conversationsmessages(conversation[0].conversation_id, 1);
      } else {
        data = await groupmesages(conversation[0].group_id, 1);
      }
      if (data?.data) {
        dispatchRedux(setMessages({ messages: data.data, type: mapkey }));
        if (length === index + 1)
          dispatchRedux(setMessageloaging({ loading: false }));
        return data;
      } else {
        throw new Error("Error!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { error } = useOnmountEffect(fetchMessages, mapkey);
  // Handle click event to select conversation
  const handleClick = () => {
    dispatchRedux(setChat(conversation[0]));
  };
  const state = useSelector((state) => state.messages.Loading);

  return (
    <div
      className="h-20 min-h-20 rounded-2xl hover:bg-neutral-700 cursor-pointer"
      onClick={handleClick}
    >
      <div className="md:grid md:grid-cols-2 md:grid-rows-2 flex pl-3 h-full">
        <div className="hidden md:block text-slate-200 mt-2 text-nowrap text-sm font-medium md:col-start-1 md:row-start-1">
          {conversation[0].name}
        </div>
        <div className="hidden md:block text-slate-400 md:col-start-1 md:row-start-2">
          {15 < conversation[0]?.body?.length
            ? conversation[0].body.slice(0, 15) + "..."
            : conversation[0].body}
        </div>
        <div className="md:row-start-1 md:row-end-3 md:col-start-2 col-start-1 flex items-center justify-center  md:justify-end w-full md:pr-3">
          <img
            src="./photo_2024-05-18_12-08-09.jpg"
            className="w-12 h-12 rounded-full"
            alt=""
          />
          {/* <span className="rounded-full w-12 h-12 bg-neutral-700"></span> */}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
