import React from "react";

function Conversation() {
  return (
    <div className="h-16 rounded-2xl hover:bg-neutral-700">
      <div className="grid grid-cols-2 grid-rows-2 pl-3 h-full">
        <div className="text-slate-200 text-lg font-medium col-start-1 row-start-1">
          title
        </div>
        <div className="text-slate-400 col-start-1 row-start-2">
          how are you
        </div>
        <div className="row-start-1 row-end-3 col-start-2 flex items-center justify-end pr-3">
          <img
            src="./photo_2024-05-18_12-08-09.jpg"
            className="w-12 h-12 rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Conversation;
