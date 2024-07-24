import React, { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import UserMessage from "./UserMessage";
import FriendMessage from "./FriendMessage";

const initialState = [
  { id: 1, type: "user", text: "Hello from user" },
  { id: 2, type: "friend", text: "Hello from friend" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER_MESSAGE":
      return [
        ...state,
        {
          id: action.payload.id,
          created_at: Date.now(),
          type: "user",
          text: action.payload.text,
        },
      ];

    case "ADD_FRIEND_MESSAGE":
      return [
        ...state,
        {
          id: action.payload.text,
          created_at: Date.now(),
          type: "friend",
          text: action.payload.text,
        },
      ];
    default:
      return state;
  }
}

function Messages({message:message}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const messagesEndRef=useRef();
 useEffect(()=>{
  if (message?.text){
    dispatch({ payload: message, type: "ADD_USER_MESSAGE"
    });}
   

 },[message])
 useLayoutEffect(()=>{
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
})
  // dispatch({ payload: "", type: "ADD_USER_MESSAGE" });
  return (
    <div className="h-full flex flex-col space-y-1">
      {state.map((message) =>
        message.type === "user" ? (
          <UserMessage key={message.id} message={message.text} />
        ) : (
          <FriendMessage key={message.id} message={message.text}  />
        )
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default Messages;
