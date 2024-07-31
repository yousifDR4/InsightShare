import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import getmessages from "../../api/messages/conversationsmessages";
import conversationsmessages from "../../api/messages/conversationsmessages";
import groupmesages from "../../api/messages/groupmesages";
import useFetch from "../../Hooks/useFetch";
import Usermessage from "./Usermessage";
import { styled } from "styled-components";
import Othermessages from "./Othermessages";
import groupusers from "../../auth/groupusers";
import Leftarrow from "../../UI/Leftarrow";
let worked2 = 0;
const ChatBox = memo(({ closechat }) => {
  const textareaRef = useRef();
  const messageRef = useRef();
  const worked = useRef(false);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [loadmessage, setloadmessage] = useState(false);
  const [users, setusers] = useState([]);
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
    if (textarea.style.height === 0) return;
    console.log(textarea.style.height, textarea.scrollHeight);
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"; // Set to the scroll height or max height
    if (!content || content == "") {
      adjustMessageHeight(`calc(100% - 60px)`);
      return;
    }

    const h = textarea.style.height.slice(0, textarea.style.height.length - 2);
    const newcut = Math.abs(+h + Math.abs(60 - 43));
    console.log(newcut);
    console.log(newcut);
    const temp = `calc(100% - ${newcut}px)`;
    console.log(temp);
    adjustMessageHeight(temp);
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
  // try {
  //   const x = convertISOToLocalTime(messages[0].created_at);
  //   console.log(x);
  //   console.log(x - "0/1/0");
  // } catch (e) {
  //   console.log(e);
  // }

  const handelsubmit = (e) => {
    console.log(content);
    let s = "";
    let a = [];
    if (content.includes(["a", "b"])) console.log(true);
    setMessages((state) => [
      {
        body: content,
        snder_id: 1,
        created_at: new Date(),
        status: "sending",
      },
      ...state,
    ]);
    setContent("");
  };
  console.log(storemessages);
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
            height: "calc(100% - 60px)",
          }}
        >
          <div className=" w-full">
            {" "}
            <div className="sticky bg-neutral-800 h-12   w-full shadow-md ">
              <div className="flex  px-3 h-12">
                <div className=" relative flex items-center  h-full md:hidden  ">
                  <span
                    className="relative cursor-pointer "
                    onClick={() => closechat()}
                  >
                    <Leftarrow />
                  </span>
                </div>
                <div className="relative flex justify-end w-full h-full items-center pr-3 ">
                  <span className="relative cursor-pointer ">
                    <img
                      src="/photo_2024-05-18_12-08-09.jpg"
                      alt=""
                      className="w-10 h-10 rounded-3xl"
                    />
                  </span>
                </div>
              </div>
            </div>
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
        <div className="px-5 h-fit w-full mb-5">
          <textarea
            ref={textareaRef}
            rows={1}
            className=" outline-none resize-none overflow-auto  shadow-md w-full rounded-xl h-[50px] bg-neutral-600 text-lg font-normal font-sans p-2 "
            name=""
            id=""
            style={{ lineHeight: "1.5em" }}
            value={content}
            onChange={handelinput}
            onKeyDownCapture={(e) => {
              console.log(e);
              if (e.key === "Enter" && e.shiftKey === false) {
                console.log(e, "work");
                e.preventDefault();
                handelsubmit(e);
              }
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
});

export default ChatBox;
