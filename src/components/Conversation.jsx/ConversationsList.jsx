import React, { memo, useEffect, useMemo, useState } from "react";
import Conversation from "./Conversation";
import currentUserConversations from "../../api/currentUserConversations";
import { useDispatch, useSelector } from "react-redux";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect";
import { setMessageloaging, startloading } from "../../store/messagesSlice";
import Loadingconversations from "./Loadingconversations";
const MemorizeConversation = memo(Conversation);

function ConversationsList() {
  const [Conversations, setConversations] = useState(null);
  const state = useSelector((state) => state.messages.Loading);
  const [keys, setKeys] = useState([]);
  const dispatchRedux = useDispatch();
  async function fn() {
    try {
      dispatchRedux(startloading());
      const data = await currentUserConversations(3);

      if (data?.error) {
        console.log(data);
        return;
      }
      setKeys(Object.keys(data?.data));
      setConversations(data?.data);
      console.log("redux");

      return data;
    } catch (e) {}
  }
  const { data, loading } = useOnmountEffect(fn);
  console.log(loading);
  useEffect(() => {
    if (!data) return;
  }, [data]);
  const memoizedConversations = useMemo(() => {
    if (keys.length < 1) return null;
    return keys.map((key, index) => (
      <MemorizeConversation
        key={key}
        mapkey={key}
        index={index}
        length={keys.length}
        conversation={Conversations[key]}
      />
    ));
  }, [keys]);
  function hide() {
    return state.Loading || loading ? "hidden" : "";
  }
  return (
    <>
      {loading ||
        (state.Loading && (
          <div className="row-start-3 h-full row-end-13 flex flex-col gap-y-2 px-1 overflow-y-auto max-h-[600px]">
            <Loadingconversations /> <Loadingconversations />
          </div>
        ))}
      <div
        id="users"
        className={`row-start-3 h-full row-end-13 flex flex-col gap-y-2 px-1 overflow-y-auto max-h-[600px] ${hide()}`}
      >
        {memoizedConversations}
      </div>
    </>
  );
}

export default ConversationsList;
