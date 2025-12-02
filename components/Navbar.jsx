"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import useChatStore from "@/store/useChatStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import History from "./History";
import {  PlusIcon } from "lucide-react";

const Navbar = ({ setSessionId }) => {
  let navRef = useRef(null);
  let historyRef = useRef(null)

  useGSAP(() => {
    let tl = gsap.timeline();
    let h2 = navRef.current.querySelector("h2");
    let btn = navRef.current.querySelectorAll("button");

    tl.to(h2, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
    });
    tl.to(navRef.current, {
      width: "15vw",
      duration: 1,
    });
    tl.to(h2, {
      top: 0,
      duration: 1,
    });
    tl.to(historyRef.current,{
      opacity:1,
      height:'80%',
      duration:0.5
    })
    tl.to(btn, {
      opacity: 1,
      duration: 1,
    });
  }, []);
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState([]);

  const clearMessages = useChatStore((state) => state.clearMessages);

  const fetchAllSessions = useChatStore((state) => state.fetchAllSessions);

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.id) return;

    const loadSessions = async () => {
      const allSessions = await fetchAllSessions(session.user.id);

      setSessions(allSessions);
    };

    loadSessions();
  }, [session, status]);

  return (
    <div
      ref={navRef}
      className="w-[100vw] fixed left-0 h-[100vh] bg-white text-black  flex flex-col  items-center pl-4 py-8 shadow-md z-50"
    >
      <div >
        <h2 className="opacity-0 top-[40vh] relative text-2xl font-bold pb-8">
          AI Sathi
        </h2>

        <Button
          onClick={clearMessages}
          className="opacity-0 mb-8  cursor-pointer  hover:bg-black hover:text-white text-white bg-transparent font-bold  bg-[black] ml-[-10px]"
        >
          New Chat <PlusIcon/>
        </Button>
      </div>
   <div ref={historyRef} className="opacity-0 ">

      <History />
   </div>

      

      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="opacity-0 bg-black text-white rounded-full px-4 py-2 mt-4"
      >
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
