import React from "react";
import AddComments from "./AddComments";

function Content() {
  const post =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. NatusLorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.\
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,\
        quibusdam debitis. Culpa facilis at, similique neque aperiam voluptate\
        ea corrupti adipisci! Iusto atque autem illum distinctio, esse culpa\
        molestiae optio.";

  return (
    <div
      className="  bg-white rounded shadow-md px-6 py-6 font-sans
     w-full mb-8"
    >
      <div className="w-10 h-10 flex items-center justify-end text-white rounded-full text-lg font-bold">
        <img src="./photo_2024-05-18_12-08-09.jpg" alt="" className="rounded-full h-10 w-10"  />
      </div>
      <p className="py-3 font-sans">
        {post.length > 40 ? post.substring(0, 40) + "..." : post}
        <span className="font-sans font-medium cursor-pointer hover:underline">
          Read More
        </span>
      </p>

      <AddComments />
    </div>
  );
}

export default Content;
