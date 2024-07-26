import React, { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../store/selectedChatSlice";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect.jsx";
import groupmesages from "../../api/messages/groupmesages.js";
import conversationsmessages from "../../api/messages/conversationsmessages.js";
import { setMessages } from "../../store/messagesSlice.js";

const Conversation = ({ conversation, mapkey }) => {
  const dispatchRedux = useDispatch();

  // Function to fetch messages when component mounts
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
        return data;
      } else {
        throw new Error("Error!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const { loading, error } = useOnmountEffect(fetchMessages, mapkey);
  // Handle click event to select conversation
  const handleClick = () => {
    dispatchRedux(setChat(conversation[0]));
  };

  return (
    <div
      className="h-16 min-h-16 rounded-2xl hover:bg-neutral-700"
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
        <div className="md:row-start-1 md:row-end-3 md:col-start-2 col-start-1 flex items-center md:justify-end w-full md:pr-3">
          <img
            src="./photo_2024-05-18_12-08-09.jpg"
            className="w-12 h-12 rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Conversation;
