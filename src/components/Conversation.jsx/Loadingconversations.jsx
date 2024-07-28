import React from "react";
import styled, { keyframes } from "styled-components";

// Define the keyframes for the moving light animation
const movingLight = keyframes`
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 200%;
  }
`;

// Create a styled component for the animated background
const AnimatedBackground = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(200, 200, 200, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 75%
  );
  background-size: 200%;
  animation: ${movingLight} 1.5s infinite;
`;

function Loadingconversations() {
  return (
    <div className="h-16 min-h-16 rounded-2xl">
      <div className="md:grid md:grid-cols-2 md:grid-rows-2 flex gap-y-2 pl-3 h-full">
        <AnimatedBackground className="hidden md:block text-slate-200 mt-3 text-nowrap text-sm h-4 bg-neutral-700 font-medium md:col-start-1 md:row-start-1"></AnimatedBackground>
        <AnimatedBackground className="hidden md:block h-4 mt-1 text-slate-400 md:col-start-1 md:row-start-2"></AnimatedBackground>
        <div className="md:row-start-1 md:row-end-3 md:col-start-2 col-start-1 flex items-center md:justify-end w-full md:pr-3">
          <AnimatedBackground className="rounded-full w-12 h-12 bg-neutral-700"></AnimatedBackground>
        </div>
      </div>
    </div>
  );
}

export default Loadingconversations;
