import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import currentUserConversations from "../../api/currentUserConversations";
import { useSelector } from "react-redux";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect";

function ConversationsList() {
  const [Conversations, setConversations] = useState(null);
  const seletedconversation = useSelector(
    (state) => state.selectedChat.selectedChat
  );
  const [keys, setKeys] = useState([]);

  async function fn() {
    const data = await currentUserConversations(3);
    console.log(data);
    setKeys(Object.keys(data?.data));
    setConversations(data?.data);
    return data;
  }
  const data = useOnmountEffect(fn);
  useEffect(() => {
    if (!data) return;
  }, [data]);
  console.log(seletedconversation);
  return (
    <div
      id="users"
      className="row-start-3 h-full row-end-13 flex flex-col gap-y-2 px-1 overflow-y-auto max-h-[600px]"
    >
      {keys.length > 0
        ? keys.map((key) => (
            <Conversation key={key} conversation={Conversations[key]} />
          ))
        : ""}
    </div>
  );
}

export default ConversationsList;
