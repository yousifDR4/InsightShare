import React, { memo, useMemo, useState } from "react";
import ConversationsList from "../components/Conversation.jsx/ConversationsList";
import ChatBox from "../components/Conversation.jsx/ChatBox";
import { setChat } from "../store/selectedChatSlice";

const MemorizeconversationsList = memo(ConversationsList);
const Memorizechatbox = memo(ChatBox);
function Conversations() {
  const [listclass, setlistclsass] = useState(
    " md:col-span-3 col-span-12 md:block"
  );
  const [chatclass, setChatclass] = useState("md:col-span-9 md:block hidden");
  function openchat() {
    setChatclass("md:col-span-9 md:block col-span-12");
    setlistclsass(" md:col-span-3 col-span-12 md:block hidden");
  }
  function closechat() {
    setChatclass("md:col-span-9 md:block hidden col-span-12");
    setlistclsass(" md:col-span-3 col-span-12 md:block ");
  }
  const memorizechatbox = useMemo(
    () => <Memorizechatbox closechat={closechat} />,
    []
  );
  const memorizeconversationsList = useMemo(
    () => <MemorizeconversationsList openchat={openchat} />,
    []
  );
  return (
    <div className="grid grid-cols-12 w-full h-screen overflow-y-hidden bg-neutral-800">
      <div
        className={`${listclass} overflow-y-auto  border-r border-r-neutral-700 h-full grid grid-rows-[auto,auto,1fr] m-0`}
      >
        <div className="text-xl text-cyan-50 pl-4 font-sans mt-5">
          <span className="font-sans">Chats</span>
        </div>
        <div className="w-full flex items-center justify-center px-4 py-2">
          <input
            type="text"
            className="outline-none shadow-md w-full  rounded-xl bg-neutral-700 text-white text-sm font-normal font-sans p-2"
            placeholder="Search"
          />
        </div>
        {memorizeconversationsList}
      </div>
      <div
        className={`${chatclass} overflow-y-hidden h-full min-h-[100vh] relative`}
      >
        {memorizechatbox}
      </div>
    </div>
  );
}

export default Conversations;
