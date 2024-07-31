import React from "react";
import { monthNames } from "../../utils/month";

function Usermessage({ message, messages, index, length }) {
  const LoadDate = () => {
    if (length - 1 === index) {
      if (new Date(message.created_at) !== new Date())
        return (
          <div className="md:w-96 h-10 flex mt-2 pb-10  py-5 justify-center items-center">
            <span className="bg-zinc-700 min-w-fit w-32 rounded-3xl h-10 flex justify-center items-center text-center">{`${new Date(
              message.created_at
            ).getDate()} ${
              monthNames[new Date(message.created_at).getMonth()]
            }`}</span>
          </div>
        );
      else return <></>;
    } else if (
      new Date(message.created_at).getDate() !==
      new Date(messages[index + 1].created_at).getDate()
    )
      return (
        <div className="md:w-96 h-10 flex mt-2 pb-10 py-5 justify-center items-center">
          <span className="bg-zinc-700 min-w-fit w-32 rounded-3xl h-10 flex justify-center items-center text-center">{`${new Date(
            message.created_at
          ).getDate()} ${
            monthNames[new Date(message.created_at).getMonth()]
          }`}</span>
        </div>
      );
    else return <></>;
  };

  return (
    <>
      <LoadDate />
      <div
        style={{
          backgroundColor: "#0084ff",
        }}
        className="  font-normal px-3 py-1 pb-2 rounded-2xl font-sans text-base text-slate-100 mb-0 w-fit text-start md:max-w-96"
      >
        <p className=" break-words whitespace-break-spaces font-sans">
          {message.body}
        </p>
      </div>
    </>
  );
}

export default Usermessage;
