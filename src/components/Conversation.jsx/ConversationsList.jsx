import React from "react";
import Conversation from "./Conversation";

function ConversationsList() {
  return (
    <div
      id="users"
      className="row-start-3 h-full row-end-13 grid grid-cols-1 gap-y-2 px-1 overflow-y-auto max-h-[600px]"
    >
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
}

export default ConversationsList;
