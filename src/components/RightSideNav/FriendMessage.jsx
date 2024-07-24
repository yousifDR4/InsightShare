import React from "react";

function FriendMessage({ message: text }) {
  return (
    <div className="flex justify-end">
    <div
      className="font-normal  px-3 py-1 pb-2 rounded-2xl bg-gray-200 font-sans text-base text-black mb-0 w-fit text-start "
      style={{
        maxWidth: "200px",
      }}
    >
      <p className="break-words text-justify font-sans">{text}</p>
    </div>
    </div>
  );
}

export default FriendMessage;
