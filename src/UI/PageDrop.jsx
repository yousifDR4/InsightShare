import { forwardRef } from "react";

const PageDrop = forwardRef(({ backdrop }, ref) => {
  return (
    backdrop && (
      <div
        ref={ref}
        id="bluerRef"
        className="z-1 top-0 left-0  w-full h-screen fixed "
        style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}
      ></div>
    )
  );
});

export default PageDrop;
