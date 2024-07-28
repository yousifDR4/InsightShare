import React from "react";

function Othermessages({ message: text }) {
  return (
    <div className="flex justify-end">
      <div
        style={{ backgroundColor: "#303030" }}
        className="font-normal  px-3 py-1 pb-2 rounded-2xl shadow-2xl font-sans md:w-96 text-base text-white mb-0 w-fit text-start "
      >
        <p className="break-words text-justify font-sans">
          {text} Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          architecto itaque aspernatur nulla quod laboriosam? Veniam molestiae
          facilis pariatur recusandae minima vitae aspernatur! Deleniti voluptas
          labore aliquid? Voluptatibus, culpa voluptatum.
        </p>
      </div>
    </div>
  );
}

export default Othermessages;
