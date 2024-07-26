import React from "react";
import { useDispatch } from "react-redux";
import { setChat } from "../../store/selectedChatSlice";

function Conversation({ conversation }) {
  const dispatchRedux = useDispatch();
  console.log(conversation);
  const handelcliclk = (e) => {
    console.log(conversation, "selected");
    dispatchRedux(setChat(conversation[0]));
  };
  return (
    <div
      className="h-16 min-h-16 rounded-2xl hover:bg-neutral-700"
      onClick={handelcliclk}
    >
      <div className="md:grid md:grid-cols-2 md:grid-rows-2 flex pl-3 h-full">
        <div className="hidden md:block text-slate-200  mt-2 text-nowrap text-sm font-medium md:col-start-1 md:row-start-1">
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
}

export default Conversation;
