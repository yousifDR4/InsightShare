import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Messages from "./Messages";
import { CSSTransition } from "react-transition-group";
import "./RightNav.css";
import UserList from "./UserList";
const MemorizeMessages = memo(Messages);
function RightSideNav() {
  const messageRef = useRef();
  const textareaRef = useRef();
  const [content, setContent] = useState("");
  const [showIcons, setShowIcons] = useState(true);
  const [showAfterFade, setShowAfterFade] = useState(false);
  const [message, setMessage] = useState(null);
  const [chatbox, setChatbox] = useState(false);
  const [user, setUser] = useState("");
  const memorizeMessages = useMemo(
    () => <MemorizeMessages message={message} />,
    [message]
  );
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"; // Set to the scroll height or max height

    if (!content || content == "") {
      console.log("not working");
      console.log(messageRef.current.style.height);
    } else {
      const temp =
        293 - textarea.style.height.slice(0, textarea.style.height.length - 2);
      console.log(temp);
      adjustMessageHeight(temp);
    }
  };

  const adjustMessageHeight = (x) => {
    console.log(x, "xxx");
    const message = messageRef.current;
    message.style.height = "auto"; // Reset the height
    message.style.height = `${x}px`;
  };

  useEffect(() => {
    if (chatbox == true) adjustHeight();
  }, [content]);

  const handleInput = (e) => {
    setContent(e.target.value);

    adjustHeight();
    if (e.target.value === "") {
      setShowIcons(true);
      setShowAfterFade(false);
    } else {
      setShowIcons(false);
    }
  };
  const handlemessagesubmit = (e) => {
    setMessage({ text: content, id: 1 });
  };
  const onUserselect = () => {
    setChatbox(true);
  };
  return (
    <div className="w-full pr-3 mr-0">
      <UserList onUserselect={onUserselect} setUser={setUser}/>
      {chatbox && (
        <div className="fixed rounded-md bg-white w-72 h-96 bottom-1 right-5 z-10 shadow-2xl font-bold font-sans">
          <div className="p-1 shadow-md grid grid-cols-3">
            <div className="col-span-2">
              <span className="hover:bg-gray-200 text-sm w-fit h-12 flex items-center text-right cursor-pointer rounded-lg">
                <img
                  src="./photo_2024-05-18_12-08-09.jpg"
                  alt=""
                  className="rounded-full h-10 w-10 ml-3 mr-3 items-center m-0"
                />
                <p className="pr-2">{user}</p>
              </span>
            </div>
            <button
              className="justify-self-end flex justify-center items-center rounded-full h-10 w-10 hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                setChatbox(false);
              }}
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-cyan-700"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="currentColor"
                  stroke="none"
                >
                  <path
                    d="M222 5102 c-141 -51 -231 -190 -220 -337 11 -127 -42 -70 1071 -1182
                l1022 -1023 -1026 -1027 c-1149 -1150 -1064 -1054 -1064 -1208 0 -60 6 -92 22
                -127 30 -66 96 -133 162 -165 47 -24 69 -28 136 -28 154 0 58 -84 1208 1064
                l1027 1026 1028 -1026 c1150 -1149 1054 -1065 1207 -1063 99 0 174 33 234 100
                63 72 84 126 85 219 2 153 86 57 -1063 1207 l-1026 1028 1026 1028 c1148 1149
                1064 1053 1064 1207 0 67 -4 89 -28 136 -32 66 -99 132 -165 162 -35 16 -67
                22 -127 22 -154 0 -58 85 -1208 -1064 l-1027 -1026 -1023 1022 c-858 859
                -1030 1026 -1072 1044 -70 31 -174 35 -243 11z"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div ref={messageRef} className=" h-64 p-2 overflow-y-auto">
            {memorizeMessages}
          </div>
          <div className="p-3 mr-auto flex space-x-2 border-t items-center h-30 ">
            <div className="ease-in duration-100">
              {" "}
              <CSSTransition
                in={showIcons}
                timeout={300}
                classNames="fade"
                unmountOnExit
                onExited={() => setShowAfterFade(true)}
              >
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="px-1 py-2 justify-items-start rounded-full hover:bg-gray-200"
                  >
                    <img
                      src="/camera.svg"
                      alt="Add Picture"
                      className="w-4 h-4"
                    />
                  </button>
                  <button
                    type="button"
                    className="px-1 py-2 justify-items-start rounded-full hover:bg-gray-200"
                  >
                    <img
                      src="/happiness.svg"
                      alt="Add Emoji"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </CSSTransition>
            </div>

            {!showIcons && showAfterFade && <div>---</div>}
            <textarea
              value={content}
              ref={textareaRef}
              onChange={handleInput}
              onKeyDownCapture={(e) => {
                console.log(e);
                if (e.key === "Enter" && e.shiftKey === false) {
                  console.log(e, "work");
                  e.preventDefault();
                  handlemessagesubmit(e);
                }
              }}
          
              placeholder="Type something..."
              className="outline-none resize-none shadow-md w-3/4 rounded-xl bg-gray-200 text-sm font-normal font-sans flex-1 p-2"
              style={{ lineHeight: "1.5em", minWidth: "196px" }}
              rows="1"
            />
           
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSideNav;
