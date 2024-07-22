import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

function AddComments() {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleInput = (e) => {
    setContent(e.target.value);
  };
  const handleEmojiClick = (event, emojiObject) => {};
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Add your form submission logic here
    console.log("Form submitted with content:", content);
  };
  const handleOutsideClick = (e) => {
    console.log(555555555555555555555);
    console.log(showEmojiPicker);
    if (showEmojiPicker == true) {
      console.log("worksssssssss");
      setShowEmojiPicker(false);
    }
  };
  useEffect(() => {
    adjustHeight();
  }, [content]);

  return (
    <>
      <form
        className="flex flex-col p-4 rounded"
        onSubmit={handleSubmit}
        onClick={handleOutsideClick}
      >
        <div className="grid grid-cols-1 bg-gray-100 rounded-3xl">
        <textarea
          ref={textareaRef}
          className="bg-gray-100 rounded-2xl outline-none w-full h-auto px-3 pt-3 pb-0 resize-none font-sans"
          placeholder="Type your comment here..."
          value={content}
          onChange={handleInput}
          style={{ overflow: "hidden" }}
        ></textarea>

        <div className="flex  rounded-2xl bg-gray-100 py-2 pt-3 px-6">
          <button
            type="button"
            className="  px-3 py-2 justify-items-start rounded-full hover:bg-gray-200"
          >
            <img src="/camera.svg" alt="Add Picture" className="w-6 h-6 " />
          </button>
          <button
            type="button"
            className="  px-3 py-2 justify-items-start rounded-full hover:bg-gray-200"
            onClick={() => setShowEmojiPicker((state) => !state)}
          >
            <img src="/happiness.svg" alt="Add Picture" className="w-6 h-6" />
          </button>
          <button
            type="button"
            className=" text-white  px-3 py-2  ml-auto rounded-full hover:bg-gray-200 "
          >
            <img
              src="/right-arrow.svg"
              alt=" Add Comment"
              className="w-6 h-6 "
            />
          </button>
        </div>
        </div>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <EmojiPicker
        onEmojiClick={handleEmojiClick}
        height={300} width={300}
        emojiStyle={{ height: '100px', width: '100px' }}
        searchDisabled={true}
      />
        </div>
      )}
    </>
  );
}

export default AddComments;
