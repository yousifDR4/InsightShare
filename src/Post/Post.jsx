import React from "react";
import PostForm from "./PostForm";

function Post() {
  return (
    <>
    <div
      className="bg-white py-5 mb-5 shadow-sm flex px-6 space-x-3"
      onClick={() => {
        console.log("click");
      }}
    >
          <img src="./photo_2024-05-18_12-08-09.jpg" alt="" className="rounded-full h-10 w-10"  />
      <div
        className="bg-gray-100 rounded-2xl text-gray-400 hover:bg-gray-200 cursor-pointer outline-none w-full h-auto px-3 pt-2 pb-2 resize-none font-sans"
        placeholder="what is one mind..."
        style={{ overflow: "hidden" }}
        disabled={true}
      >
        what is one mind...
      </div>
    </div>
    {/* <PostForm/> */}
    </>
  );
}

export default Post;
