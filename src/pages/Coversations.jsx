import React from "react";
import ConversationsList from "../components/Conversation.jsx/ConversationsList";
import ChatBox from "../components/Conversation.jsx/ChatBox";

function Coversations() {
  return (
    <div className="grid grid-cols-12 w-full h-screen bg-neutral-800">
      <div className="col-start-1 col-end-4 overflow-y-auto border-r border-r-neutral-700 h-screen grid grid-cols-1 grid-rows-12 m-0">
        <div className="text-xl text-cyan-50 pl-4 font-sans mt-5">
          <span className="font-sans">Chats</span>
        </div>
        <div className="w-full h-full flex items-center justify-center px-4">
          <textarea
            name=""
            className="outline-none resize-none shadow-md w-3/4 rounded-xl bg-neutral-700 text-white text-sm font-normal font-sans flex-1 p-2"
            style={{ lineHeight: "1.5em", minWidth: "196px" }}
            placeholder="search"
            id=""
            rows={1}
          ></textarea>
        </div>
        <ConversationsList />
      </div>
      <div className="col-start-4 col-end-13 h-screen">
        <ChatBox />
      </div>
    </div>
  );
}

export default Coversations;
