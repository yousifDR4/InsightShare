import React, { memo, useEffect, useMemo, useState } from "react";
import Conversation from "./Conversation";
import currentUserConversations from "../../api/currentUserConversations";
import { useSelector } from "react-redux";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect";
const MemorizeConversation = memo(Conversation);

function ConversationsList() {
  const [Conversations, setConversations] = useState(null);

  const [keys, setKeys] = useState([]);
  async function fn() {
    try {
      const data = await currentUserConversations(3);

      if (data?.error) {
        console.log(data);
        return;
      }
      setKeys(Object.keys(data?.data));
      setConversations(data?.data);
      return data;
    } catch (e) {}
  }
  const data = useOnmountEffect(fn);
  useEffect(() => {
    if (!data) return;
  }, [data]);
  const memoizedConversations = useMemo(() => {
    if (keys.length < 1) return null;
    return keys.map((key) => (
      <MemorizeConversation
        key={key}
        mapkey={key}
        conversation={Conversations[key]}
      />
    ));
  }, [keys]);
  return (
    <div
      id="users"
      className="row-start-3 h-full row-end-13 flex flex-col gap-y-2 px-1 overflow-y-auto max-h-[600px]"
    >
      {memoizedConversations}
    </div>
  );
}

export default ConversationsList;
