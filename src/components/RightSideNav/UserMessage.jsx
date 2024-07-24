import React from "react";

function UserMessage({ message }) {
  return (
    <div
      className="font-normal px-3 py-1 pb-2 rounded-2xl bg-blue-500 font-sans text-base text-white mb-0 w-fit text-start"
      style={{ maxWidth: "200px" }}
    >
      <p className="break-words  font-sans">
        {message}
      </p>
    </div>
  );
}

export default UserMessage;
