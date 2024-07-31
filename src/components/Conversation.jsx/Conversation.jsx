import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../store/selectedChatSlice";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect.jsx";
import groupmesages from "../../api/messages/groupmesages.js";
import conversationsmessages from "../../api/messages/conversationsmessages.js";
import { setMessageloaging, setMessages } from "../../store/messagesSlice.js";
import Loadingconversations from "./Loadingconversations.jsx";
const Conversation = ({ conversation, mapkey, length, index, openchat }) => {
  const dispatchRedux = useDispatch();
  const fetchMessages = async () => {
    let data = [];
    // try {
    //   if (conversation[0]?.conversation_id) {
    //     data = await conversationsmessages(conversation[0].conversation_id, 1);
    //   } else {
    //     data = await groupmesages(conversation[0].group_id, 1);
    //   }
    //   if (data?.data) {
    //     dispatchRedux(setMessages({ messages: data.data, type: mapkey }));
    //     if (length === index + 1)
    //       dispatchRedux(setMessageloaging({ loading: false }));
    //     return data;
    //   } else {
    //     dispatchRedux(setMessageloaging({ loading: false }));
    //     throw new Error("Error!");
    //   }
    // } catch (e) {
    //   dispatchRedux(setMessageloaging({ loading: false }));
    //   console.log(e);
    // }
  };
  const { error } = useOnmountEffect(fetchMessages, mapkey);
  // Handle click event to select conversation
  const handleClick = () => {
    openchat();
    dispatchRedux(setChat(conversation[0]));
  };
  const state = useSelector((state) => state.messages.Loading);

  return (
    <div
      className="h-20 min-h-20 rounded-2xl hover:bg-neutral-700 cursor-pointer"
      onClick={handleClick}
    >
      <div className="grid grid-cols-2 grid-rows-2  pl-3 h-full">
        <div className=" block text-slate-200 mt-2 text-nowrap text-sm font-medium col-start-1 row-start-1">
          {conversation[0].name}
        </div>
        <div className=" block text-slate-400 col-start-1 row-start-2">
          {15 < conversation[0]?.body?.length
            ? conversation[0].body.slice(0, 15) + "..."
            : conversation[0].body}
        </div>
        <div className="row-start-1 row-end-3 col-start-2  flex items-center justify-end w-full pr-3">
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
