"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Aurora from "@/components/Aurora";
import ChatBox from "@/components/ChatBox";
import HeroSection from "@/components/HeroSection";
import InputField from "@/components/InputField";
import Navbar from "@/components/Navbar";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if unauthenticated
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Render nothing while loading or unauthenticated
  if (!session || status === "loading") return null;

  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white relative flex gap-4 justify-end items-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute w-full h-full">
        <Aurora
          colorStops={["#7dff67", "#b19ef0", "#5226ff"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>


      <Navbar />

      <div className="relative z-20 text-white w-[85%] h-full flex flex-col justify-center items-center">
        {/* Hero Section */}
        <div className="px-8 py-8 w-full h-[5%] flex justify-between items-center">
          <h1 className="text-md mt-8 font-bold text-gray-300">
            "Your Smart Companion”
          </h1>
        </div>

        {/* Chat Section */}
        <div className="w-full h-[95%] flex flex-col justify-center items-center rounded-[50px] relative">
          <HeroSection />
          <div className="w-[80%] h-full absolute">
            <ChatBox />
          </div>
          <InputField />
        </div>
      </div>
    </div>
  );
};

export default Page;
