import React, { useEffect, useState, useRef } from "react";

function useOnmountEffect(asyncFunction, info) {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const hasMounted = useRef(false);
  useEffect(() => {
    seterror(false);
    if (hasMounted.current) return;

    try {
      setloading(true);
      async function fn() {
        setloading(true);
        const temp = asyncFunction;
        setData(temp);

        hasMounted.current = true;
      }
      fn();
    } catch (e) {
      setloading(false);
      seterror(true);
    } finally {
      setloading(false);
    }
  }, []);
  return { data, loading, error };
}
export default useOnmountEffect;
