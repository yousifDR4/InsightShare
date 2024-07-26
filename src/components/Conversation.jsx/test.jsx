import React from "react";

function Test() {
  return (
    <>
      <div className="flex flex-col h-svh ">
        <div className=" flex flex-col h-[60svh] bg-neutral-900 ">
          <div className=" overflow-y-auto p-4 space-y-4"></div>
        </div>

        <textarea
          className="flex-1 p-2 rounded-lg bg-neutral-700 text-white resize-none outline-none"
          placeholder="Type a message..."
          rows="2"
        ></textarea>
        <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500">
          Send
        </button>
      </div>
    </>
  );
}

export default Test;
