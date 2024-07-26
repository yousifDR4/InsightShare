import React, { useEffect, useState } from "react";
function useFetch(fn, dep = []) {
  const [loading, setlaoding] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    async function temp() {
      try {
        setlaoding(true);
        seterror(false);
        await fn();
        setlaoding(false);
      } catch (e) {
        setlaoding(false);
        seterror(true);
      }
    }
    temp();
  }, [dep]);
  return { loading, error };
}
export default useFetch;
