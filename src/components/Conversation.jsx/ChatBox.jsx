import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import getmessages from "../../api/messages/conversationsmessages";
import conversationsmessages from "../../api/messages/conversationsmessages";
import groupmesages from "../../api/messages/groupmesages";
import useFetch from "../../Hooks/useFetch";
import Usermessage from "./Usermessage";
import { styled } from "styled-components";
import Othermessages from "./Othermessages";

const ChatBox = memo(() => {
  const textareaRef = useRef();
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState([]);
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
  console.log();

  console.log(messages);
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
  function handelinput(e) {
    setContent(e.target.value);
    adjustHeight();
  }
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    console.log(textarea.style.height, textarea.scrollHeight);
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"; // Set to the scroll height or max height

    if (!content || content == "") {
      console.log("not working");
    } else {
      const h = textarea.style.height.slice(
        0,
        textarea.style.height.length - 2
      );
      const newcut = Math.abs(+h + Math.abs(40 - 37));
      console.log(newcut);
      console.log(newcut);
      const temp = `calc(100% - ${newcut}px)`;
      console.log(temp);
      adjustMessageHeight(temp);
    }
  };
  const adjustMessageHeight = (x) => {
    console.log(messageRef.current.style.height);
    const message = messageRef.current;
    message.style.height = "auto"; // Reset the height
    message.style.height = `${x}`;
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  function convertISOToLocalTime(isoTimestamp) {
    // Create a JavaScript Date object from the ISO timestamp
    const date = new Date(isoTimestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid ISO timestamp");
    }

    // Get local time components
    const localDate = date.toLocaleDateString();
    const localTime = date.toLocaleTimeString();

    // Return formatted local time
    return `${localDate} ${localTime}`;
  }
  try {
    const x = convertISOToLocalTime(messages[0].created_at);
    console.log(x);
    console.log(x - "0/1/0");
  } catch (e) {
    console.log(e);
  }
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full "
        style={{ backgroundColor: "#242526" }}
      >
        <div
          ref={messageRef}
          className="relative flex flex-col text-white text-lg"
          style={{
            height: "calc(100% - 40px)",
          }}
        >
          <div className="mb-10">
            {" "}
            <div className="fixed bg-neutral-800 h-10 p-3 w-full shadow-md "></div>
          </div>
          <div className="overflow-y-auto">
            {messages.length > 0
              ? (() => {
                  const messageComponents = [];
                  for (let index = messages.length - 1; index >= 0; index--) {
                    const message = messages[index];
                    messageComponents.push(
                      <div key={index} className="px-5 py-2 w-full">
                        <Usermessage
                          key={index}
                          message={message}
                          messages={messages}
                          index={index}
                          length={messages.length}
                        />
                      </div>
                    );
                  }
                  return messageComponents;
                })()
              : ""}

            <div className="px-5 py-1 w-full">
              {" "}
              <Othermessages />
            </div>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          rows={1}
          className=" outline-none resize-none overflow-auto  shadow-md w-full rounded-xl h-[50px] bg-neutral-600 text-sm font-normal font-sans p-2 px-20"
          name=""
          id=""
          style={{ lineHeight: "1.5em" }}
          value={content}
          onChange={handelinput}
        ></textarea>
      </div>
    </>
  );
});

export default ChatBox;
