import React, { useEffect, useState, useRef } from "react";

function useOnmountEffect(asyncFunction, info) {
  const [data, setData] = useState(null);
  const [loading, setlaoding] = useState(false);
  const [error, seterror] = useState(false);
  const hasMounted = useRef(false);
  useEffect(() => {
    try {
      console.log(info, hasMounted);
    } catch (e) {}
    seterror(false);
    if (hasMounted.current) return;
    try {
      async function fn() {
        setlaoding(true);
        const temp = await asyncFunction();
        setData(temp);

        hasMounted.current = true;
      }
      fn();
    } catch (e) {
      setlaoding(false);
      seterror(true);
    }
  }, []);
  return { data, loading, error };
}
export default useOnmountEffect;
