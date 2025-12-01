"use client";
import React, { useLayoutEffect } from "react";
import Orb from "./animations/Orb";
import useChatStore from "@/store/useChatStore";
import gsap from "gsap";
import { useSession } from "next-auth/react";

const HeroSection = () => {
  const { messages } = useChatStore();
  const { data: session } = useSession();
  const heroRef = React.useRef(null);
  useLayoutEffect(() => {
    if (!heroRef.current) return;
    gsap.to(heroRef.current, {
      top: messages.length ? "-80vh" : "0vh",
      duration: 1,
      ease: "power1.out",
    });
  }, [messages.length]);

  return (
    <div
      ref={heroRef}
      className="w-[80%] h-[30vw]  mb-[10px] rounded-[50px] z-1 flex flex-col justify-start  items-center relative"
    >
      <div className="text-center flex flex-col items-center justify-center mb-[5vh] ">
        <div className="w-[10vw] h-[10vw] mb-[2vw] ">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>
        <h1 className="text-[2.5vw] font-bold  mb-10 leading-none">
          Hi  {(session.user.name)}, I'm AI Saathi
        </h1>
        <p className="text-[1vw] text-[#545454]   mb-[2vw] mt-[-2vw]">
          How can I help you today?
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
