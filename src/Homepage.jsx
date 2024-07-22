import React, { useEffect, useRef, useState } from "react";
import Content from "./Content";
import getPost from "./getPost";
import LeftSideNav from "./LeftSideNav/LeftSideNav";
import RightSideNav from "./RightSideNav/RightSideNav";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";
import currentuser from "./auth/currentuser";
import { setUserInfo } from "./utils/localstoreg";
import DropDown from "./UI/DropDown";
import  "./echo.js"


let id="";
function Homepage() {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState("");
console.log(id);

  const handleInput = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      message: state,
      sender_id: user.id,
      conversations_id: 1,
    };
    await message(payload,id);
  };

  
  const drop1 = useRef();
  const DispatchRedux = useDispatch();
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    try {
      const fn = async () => {
        const data = await currentuser();

        DispatchRedux(setUser(data));
        setUserInfo(data);
      };
      fn();
    } catch (e) {}
  }, []);
  // useEffect(() => {
  //   const handelevent = (e) => {
  //     console.log(e.target);
  //     if (!drop1.current.contains(e.target)) {
  //       setIsOpen1(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handelevent);
  // });

  return (
    <div className=" w-full h-fit bg-gray-100 grid grid-cols-1 grid-rows-auto items-start">
      <div className="w-full h-fit bg-gray-100">
        <div className="bg-blue-600 h-20 p-5 shadow-sm flex items-center w-full">
          <div className="flex text-white font-sans font-medium w-auto items-center">
            <div ref={drop1} id="drop1">
              <div
                className="grid grid-cols-2 gap-x-3 h-20 cursor-pointer"
                onClick={toggleDropdown1}
              >
                <DropDown />
                <span className="self-center">settings</span>
              </div>
              {isOpen1 && (
                <div className="relative">
                  <div className="absolute z-10 -right-9  top-5 bg-red-50 w-32 h-32"></div>
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto flex text-white font-sans font-medium w-auto items-center">
            <div
              className="grid grid-cols-2 gap-x-3 h-20 cursor-pointer"
              onClick={toggleDropdown2}
            >
              <DropDown />
              <span className="self-center">settings</span>
            </div>
            {isOpen2 && (
              <div className="relative ">
                <div className="absolute z-0 -right-1 top-5 bg-red-50 w-32 h-32">
                  <ul className="text-black bg-white">
                    <li>login</li>
                    <li>logout</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:row-start-1">
        <textarea
          value={state}
          onChange={handleInput}
          onKeyDownCapture={(e) => {
            console.log(e);
            if (e.key === "Enter" && e.shiftKey === false) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type something..."
          className="outline-none resize-none shadow-md w-3/4 rounded-xl bg-gray-200 text-sm font-normal font-sans flex-1 p-2"
          style={{ lineHeight: "1.5em", minWidth: "196px" }}
          rows="1"
        />
        <div className=" grid grid-cols-4  w-full h-fit bg-gray-100 py-6 px-0 gap-6">
          <LeftSideNav />
          <div className="col-start-1 col-end-5 md:col-span-2 px-6">
            {" "}
            <Post />
            <Content />
            <Content />
            <Content />
          </div>
          <RightSideNav />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
