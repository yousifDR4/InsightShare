import React, { useEffect } from "react";
function useDropminue(ref, setIsOpen) {
  console.log(ref);
  useEffect(() => {
    const handelevent = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handelevent);
  }, []);
}

export default useDropminue;
