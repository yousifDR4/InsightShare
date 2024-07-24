import { useEffect } from "react";

const useDomScroll = (backdrop) => {
  useEffect(() => {
    if (backdrop) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [backdrop]);
};
export default useDomScroll;
