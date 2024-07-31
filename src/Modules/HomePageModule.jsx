import { useEffect, useRef, useState } from "react";

import useDomScroll from "../controllerHooks/useDomScroll";
import useDropminue from "./../controllerHooks/useDropminue";
import useBackdorp from "./../controllerHooks/useBackdorp";
import { useDispatch, useSelector } from "react-redux";
import currentuser from "./../auth/currentuser";
import { setUser } from "../store/userSlice";
import { setUserInfo } from "../utils/localstoreg";
import currentUserConversations from "../api/currentUserConversations";

function HomePageModule() {
  const DispatchRedux = useDispatch();
  const backdropRef = useRef();
  const bluerRef = useRef();
  const user = useSelector((state) => state.user.user);
  const [backdrop, setBackdrop] = useState("");
  useDomScroll(backdrop);
  const drop1 = useRef();
  const drop2 = useRef();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  useDropminue(drop1, setIsOpen1);
  useDropminue(drop2, setIsOpen2);
  useBackdorp(bluerRef, setBackdrop);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };
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
    } catch (e) {
      /* empty */
    }
  }, []);
  return {
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
  };
}

export default HomePageModule;
