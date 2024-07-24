import { useEffect } from "react";
const useBackdorp = (bluerRef, setBackdrop) => {
  useEffect(() => {
    const handelevent2 = (e) => {
      if (e.target.id === bluerRef.current.id) {
        setBackdrop(false);
        console.log("working");
      } else setBackdrop(true);
    };
    document.addEventListener("mousedown", handelevent2);
  }, []);
};
export default useBackdorp;
