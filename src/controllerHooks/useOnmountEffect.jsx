import React, { useEffect, useState } from "react";
let mount = 0;
function useOnmountEffect(asyncFunction) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (mount === 1) return;
    async function fn() {
      const temp = await asyncFunction();
      setData(temp);
      mount = 1;
    }
    fn();
  }, []);
  return data;
}
export default useOnmountEffect;
