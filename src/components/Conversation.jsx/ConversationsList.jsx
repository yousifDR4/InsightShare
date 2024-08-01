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
  const [Conversations, setConversations] = useState({});
  const [userlist, setUserlist] = useState(false);
  const state = useSelector((state) => state.messages.Loading);
  const [keys, setKeys] = useState([]);
  const dispatchRedux = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  async function fn() {
    try {
      console.log("worked");
      dispatchRedux(startloading());
      const data = await currentUserConversations(user.id);

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
  console.log(keys);
  const { data, loading } = useOnmountEffect(fn);
  const { data: newusers } = useQuery({
    queryKey: ["users"],
    initialData: {},
    enabled: false,
  });

  const userskeywithconversations = useMemo(() => {
    if (Object.keys(newusers).length === 0 && keys.length === 0) return [];
    else {
      console.log(newusers);
      setConversations((s) => ({ ...s, ...newusers }));
      console.log([...Object.keys(newusers), ...keys]);
      return [...keys, ...Object.keys(newusers)];
    }
  }, [keys, newusers]);
  useEffect(() => {
    if (keys.length === 0) return;
    async function fn() {
      let conversationIds = [];
      let groupsIds = [];
      try {
        keys.map((key) => {
          console.log(key);

          if (Conversations[key]?.conversation_id) {
            conversationIds.push(Conversations[key].conversation_id);
          } else {
            groupsIds.push(Conversations[key].group_id);
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
        {userskeywithconversations.map((key, index) => (
          <Conversation
            key={key}
            mapkey={key}
            index={index}
            length={keys.length}
            conversation={Conversations[key]}
            openchat={openchat}
            Conversations={Conversations}
          />
        ))}

        <Userslist />
      </div>
    </>
  );
}

export default ConversationsList;
