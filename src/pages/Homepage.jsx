import Content from "../components/Post/Content";
import LeftSideNav from "../components/LeftSideNav/LeftSideNav.jsx";
import RightSideNav from "../components/RightSideNav/RightSideNav.jsx";
import Post from "../components/Post/Post";
import DropDown from "../UI/DropDown";
import MobileChat from "../components/ChatBox/MobileChat.jsx";
import HomePageModule from "../Modules/HomePageModule.jsx";
import PageDrop from "./../UI/PageDrop";

function Homepage() {
  const {
    backdropRef,
    bluerRef,
    toggleDropdown1,
    toggleDropdown2,
    drop1,
    backdrop,
    drop2,
    isOpen1,
    isOpen2,
    setBackdrop,
  } = HomePageModule();
  const users = [{ name: "yousif" }, { name: "noor" }, { name: "hamza" }];
  return (
    <div className=" w-full h-fit bg-gray-100 grid grid-cols-1 grid-rows-auto items-start">
      <div className="w-full h-fit bg-gray-100">
        <div className="md:hidden bg-blue-600 h-20 p-5 shadow-sm flex items-center w-full">
          <div className="flex text-white font-sans font-medium w-auto items-center">
            <div ref={drop1} id="drop1">
              <div
                className=" flex space-x-1 h-20 cursor-pointer"
                onClick={toggleDropdown1}
              >
                <DropDown />
                <span className="self-center">settings</span>
              </div>
              {isOpen1 && (
                <div className="relative">
                  <div className="absolute z-10 -right-9  -top-5 bg-red-50 w-32 h-32 font-sans rounded-md">
                    <ul className="text-black bg-white shadow-sm ">
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        login
                      </li>
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        register
                      </li>
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        change picture
                      </li>
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        notifications
                      </li>
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        logout
                      </li>
                      <li className="p-1 px-2 cursor-pointer hover:bg-gray-200">
                        change password
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="ml-auto flex text-white font-sans font-medium w-auto items-center">
            <div
              className=" h-20 flex space-x-1 cursor-pointer"
              onClick={toggleDropdown2}
              id="drop2"
              ref={drop2}
            >
              <DropDown />
              <span className="self-center">friends list</span>
              {isOpen2 && (
                <div className="relative ">
                  <div className="absolute  -right-3 top-14 z-10 w-32 h-32">
                    <ul className="text-black bg-white shadow-sm ">
                      {users.length > 0
                        ? users.map((user) => <MobileChat data={user} />)
                        : ""}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="md:row-start-1">
        <div className=" grid grid-cols-4  w-full h-fit bg-gray-100 py-6 px-0 gap-6">
          <LeftSideNav />
          <div className="col-start-1 col-end-5 md:col-span-2 px-6">
            {" "}
            <Post
              backdrop={backdrop}
              setBackdrop={setBackdrop}
              ref={backdropRef}
            />
            <Content />
            <Content />
            <Content />
          </div>
          <RightSideNav />
        </div>
      </div>
      <PageDrop backdrop={backdrop} ref={bluerRef} />
    </div>
  );
}
export default Homepage;
