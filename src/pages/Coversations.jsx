import React, { memo, useMemo } from "react";
import ConversationsList from "../components/Conversation.jsx/ConversationsList";
import ChatBox from "../components/Conversation.jsx/ChatBox";

const MemorizeconversationsList = memo(ConversationsList);
const Memorizechatbox = memo(ChatBox);
function Conversations() {
  const memorizeconversationsList = useMemo(
    () => <MemorizeconversationsList />,
    []
  );
  const memorizechatbox = useMemo(() => <Memorizechatbox />, []);
  return (
    <div className="grid grid-cols-12 w-full h-screen bg-neutral-800">
      <div className="col-span-3 overflow-y-auto border-r border-r-neutral-700 h-full grid grid-rows-[auto,auto,1fr] m-0">
        <div className="text-xl text-cyan-50 pl-4 font-sans mt-5">
          <span className="font-sans">Chats</span>
        </div>
        <div className="w-full flex items-center justify-center px-4 py-2">
          <input
            type="text"
            className="outline-none shadow-md w-full rounded-xl bg-neutral-700 text-white text-sm font-normal font-sans p-2"
            placeholder="Search"
          />
        </div>
        {memorizeconversationsList}
      </div>
      <div className="col-span-9 h-full">{memorizechatbox}</div>
    </div>
  );
}

export default Conversations;
