import React from "react";

const Content = () => {
  return (
    <div
      style={{ pointerEvents: "none" }}
      className="z-1  w-full h-full px-8 py-15 flex flex-col justify-between absolute"
    >
      <h1 className="text-[white] font-bold">www.AIsathi.com</h1>
      <h2
        style={{
          textShadow: "[0_2px_4px_rgb(99_102_241_/_0.8)]",
        }}
        className="text-[3.4vw]"
      >
        Talk, Ask, Explore <br />
        Your Personal AI Companion.{" "}
      </h2>
    </div>
  );
};

export default Content;
