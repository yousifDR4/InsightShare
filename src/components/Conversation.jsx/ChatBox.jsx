import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getmessages from "../../api/messages/conversationsmessages";
import conversationsmessages from "../../api/messages/conversationsmessages";
import groupmesages from "../../api/messages/groupmesages";
import useFetch from "../../Hooks/useFetch";

const ChatBox = memo(() => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadmessage, setloadmessage] = useState(false);
  const selectedChat = useSelector((state) => state.selectedChat.selectedChat);
  const storemessages = useSelector((state) => state.messages.messages);
  const findkey = (selectedchattemp) => {
    if (selectedchattemp === null) return;
    const key = selectedchattemp?.conversation_id
      ? `conversation_${selectedchattemp.conversation_id}`
      : `group_${selectedchattemp.group_id}`;
    if (key === "group_undefined") return null;
    return key;
  };
  const selectedkey = findkey(selectedChat?.data ? selectedChat.data : null);
  console.log("conversation_1" === selectedkey);
  useEffect(() => {
    if (!selectedkey) return;
    setMessages(storemessages[selectedkey]);
    if (storemessages[selectedkey]?.length > 0) setloadmessage(true);
  }, [selectedkey, storemessages]);
  // const { messages: temp } = useMessages();
  // console.log(temp, "temp");
  // useEffect(() => {
  //   console.log(temp, "contexts");
  // }, [temp]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageObject = {
        text: newMessage,
        timestamp: new Date(),
        user: "current", // You can change this to differentiate users
      };
      setMessages([...messages, messageObject]);
      setNewMessage("");
    }
  };

  return (
    <>
      <div className=" flex-col h-screen ">
        <div className=" flex flex-col  bg-neutral-900 h-[550px]">
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {loadmessage &&
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg max-w-xs ${
                    msg.user === "current"
                      ? "bg-blue-600 text-white self-end"
                      : "bg-green-600 text-white self-start"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.created_at.toLocaleString()}
                  </div>
                  <div>{msg.body}</div>
                </div>
              ))}
          </div>
        </div>
        <div className=" p-4 bg-neutral-800 flex items-center space-x-2 mb-auto">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 p-2 rounded-lg bg-neutral-700 text-white resize-none outline-none"
            placeholder="Type a message..."
            rows="2"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
});

export default ChatBox;
