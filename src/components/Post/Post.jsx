import React, { forwardRef } from "react";
import PostForm from "./PostForm";

const Post = forwardRef(({ backdrop, setBackdrop, backdropRef }, ref) => {
  return (
    <div className="" ref={ref}>
      <div
        className="bg-white py-5 mb-5 shadow-sm flex px-6 space-x-3 relative"
        onClick={() => {
          setBackdrop(true);
        }}
      >
        <img
          src="./photo_2024-05-18_12-08-09.jpg"
          alt=""
          className="rounded-full h-10 w-10"
        />
        <div
          className="bg-gray-100 rounded-2xl text-gray-400 hover:bg-gray-200 cursor-pointer outline-none w-full h-auto px-3 pt-2 pb-2 resize-none font-sans"
          placeholder="what is one mind..."
          style={{ overflow: "hidden" }}
          disabled={true}
        >
          what is on your mind...
        </div>
        <div className="relative h-fit"></div>
      </div>
      {/* <PostForm/> */}
      {backdrop && (
        <div
          className="absolute z-40 top-1/2 left-1/2 shadow-md rounded-md h-96 w-[500px] bg-white font-sans transform -translate-x-1/2 -translate-y-1/2"
          style={{}}
        >
          <div className="block w-full">
            <div className="font-sans font-semibold text-2xl w-32 ml-auto mr-auto pt-5">
              <span className="ml-auto">create post</span>
            </div>
            <PostForm />
          </div>
        </div>
      )}
    </div>
  );
});

export default Post;
