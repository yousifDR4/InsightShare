import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/userSlice";
import logout from "../auth/logout";
import { getUserInfo } from "../utils/localstoreg";

function LeftSideNav() {
  const navigate = useNavigate();
  const DispatchRedux = useDispatch();
  const user = getUserInfo();
  console.log(user);
  return (
    <div>
      <div className="hidden md:block md:w-64 md:fixed md:h-screen">
        <ul className="hidden md:block lg:w-64 fixed px-3">
          {!user && (
            <>
              <li
                onClick={() => {
                  console.log("works");
                  navigate("/login");
                }}
                className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md"
              >
                <img
                  src="/download.svg"
                  alt=""
                  className="w-6 h-6 mr-3 mt-1 fill-blue-400"
                />
                login
              </li>
              <li
                onClick={() => {
                  console.log("works");
                  navigate("/register");
                }}
                className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md"
              >
                <img
                  src="/download.svg"
                  alt=""
                  className="w-6 h-6 mr-3 mt-1 fill-blue-400"
                />
                regiser
              </li>
            </>
          )}
          {user !== null && (
            <li
              onClick={async () => {
                const promise = await logout();
                if (promise) DispatchRedux(clearUser());
                navigate("/");
              }}
              className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md"
            >
              <img
                src="/download.svg"
                alt=""
                className="w-6 h-6 mr-3 mt-1 fill-blue-400"
              />
              logout
            </li>
          )}
          <li className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md">
            <img
              src="/download.svg"
              alt=""
              className="w-6 h-6 mr-3 mt-1 fill-blue-400"
            />
            change picture
          </li>
          <li className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md">
            <img
              src="/users.png"
              alt=""
              className="w-6 h-6 mr-3 mt-1 fill-blue-400"
            />
            friends list
          </li>
          <li className="font-sans hover:bg-gray-300 px-3 py-2 pb-3 font-medium text-lg text-start flex cursor-pointer rounded-md">
            <img
              src="/download.svg"
              alt=""
              className="w-6 h-6 mr-3 mt-1 fill-blue-400"
            />
            settings
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSideNav;
