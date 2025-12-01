"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const PageTransitionProvider = ({ children }) => {
  const pathname = usePathname();
  const transRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);

  useGSAP(() => {
    const tl = gsap.timeline(); 

    tl.to(transRef.current, {
      x: "0vw",
      duration: 1.5,
      ease: "power4.out",
      delay: 0,
    });

    tl.to(transRef.current, {
      x: "-100vw",
      duration: 1.5,
      ease: "power4.out",
    });
  }, [children, pathname]);

  useEffect(()=>{
    console.log("Hello world")
    console.log(children)
setTimeout(()=>{
setDisplayChildren(children)
},3000)
  },[pathname,children])
  return (
    <>
      <div
        ref={transRef}
        style={{ transform: "translateX(100vw)", opacity: 1 }}
        className="absolute w-[100vw] h-[100vh] bg-white z-[100] flex justify-center items-center"
      >
        <h1>www.AIsathi.com</h1>
      </div>
      {displayChildren}
    </>
  );
};

export default PageTransitionProvider;
