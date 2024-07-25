import React, { useState } from "react";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
      <div className=" grid grid-col-1 grid-rows-12 h-full gap-y-[30px]">
        <div className="row-start-1 row-end-11 flex flex-col h-full bg-neutral-900 max-h-[900px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
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
                  {msg.timestamp.toLocaleString()}
                </div>
                <div>{msg.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="row-start-11 p-4 bg-neutral-800 flex items-center space-x-2">
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
}

export default ChatBox;
