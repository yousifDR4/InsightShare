import React, { memo, useEffect, useMemo, useState } from "react";
import Conversation from "./Conversation";
import currentUserConversations from "../../api/currentUserConversations";
import { useDispatch, useSelector } from "react-redux";
import useOnmountEffect from "../../controllerHooks/useOnmountEffect";
import {
  setMessageloaging,
  setMessages,
  startloading,
} from "../../store/messagesSlice";
import Loadingconversations from "./Loadingconversations";
import Userslist from "./Userslist";
import async from "./../../getPost";
import chatmessages from "../../api/chatmessages";
import { useQuery } from "@tanstack/react-query";
const MemorizeConversation = memo(Conversation);
function ConversationsList({ openchat }) {
  const [Conversations, setConversations] = useState(null);
  const [userlist, setUserlist] = useState(false);
  const state = useSelector((state) => state.messages.Loading);
  const [keys, setKeys] = useState([]);
  const dispatchRedux = useDispatch();
  async function fn() {
    try {
      console.log("worked");
      dispatchRedux(startloading());
      const data = await currentUserConversations(5);

      if (data?.error) {
        console.log("console.error();");

        return;
      }
      if (data.data.length < 1) {
        dispatchRedux(setMessageloaging({ loading: false }));
        return;
      }
      setKeys(Object.keys(data?.data));
      setConversations(data?.data);

      return data;
    } catch (e) {
      dispatchRedux(setMessageloaging({ loading: false }));
    }
  }
  const { data, loading } = useOnmountEffect(fn);
  console.log(loading);
  useEffect(() => {
    if (!data) return;
  }, [data]);
  const memoizedConversations = useMemo(() => {
    if (keys.length < 1) return null;
    console.log("worked");
    return keys.map((key, index) => (
      <MemorizeConversation
        key={key}
        mapkey={key}
        index={index}
        length={keys.length}
        conversation={Conversations[key]}
        openchat={openchat}
      />
    ));
  }, [keys]);
  console.log(keys);
  useEffect(() => {
    if (keys.length === 0) return;

    async function fn() {
      let conversationIds = [];
      let groupsIds = [];
      try {
        keys.map((key) => {
          console.log(key);

          if (Conversations[key][0]?.conversation_id) {
            conversationIds.push(Conversations[key][0].conversation_id);
          } else {
            groupsIds.push(Conversations[key][0].group_id);
          }
        });

        const data = await chatmessages(groupsIds, conversationIds);

        console.log(data);
        if (data) {
          dispatchRedux(setMessages({ messages: data }));
          dispatchRedux(setMessageloaging({ loading: false }));
          return data;
        } else {
          dispatchRedux(setMessageloaging({ loading: false }));
          throw new Error("Error!");
        }
      } catch (e) {
        dispatchRedux(setMessageloaging({ loading: false }));
        console.log(e);
      }
    }
    fn();
  }, [keys]);
  function hide() {
    return state.Loading || loading ? "hidden" : "";
  }
  const { data: newusers } = useQuery({
    queryKey: ["users"],
    enabled: false,
  });
  console.log(newusers);
  return (
    <>
      {loading ||
        (state.Loading && (
          <div className="row-start-3 h-full row-end-13 flex flex-col gap-y-2 px-1 overflow-y-auto max-h-[500px]">
            <Loadingconversations /> <Loadingconversations />
          </div>
        ))}
      <div
        id="users"
        className={`row-start-3  row-end-13 flex flex-col gap-y-2 px-1  overflow-y-auto  ${hide()}`}
      >
        {memoizedConversations}

        <Userslist />
      </div>
    </>
  );
}

export default ConversationsList;
