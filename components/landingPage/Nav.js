import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Nav = () => {
  const router = useRouter();
  return (
    <>
      <div className=" w-full bg-transparent flex flex-row items-center p-4 md:p-12 md:pt-12 h-6 md:h-[60px] justify-between">
        <h1 className="text-white text-2xl sm:text-4xl font-bold  font-font-heading">
          🎥 Chal Chitra
        </h1>
        <div
          onClick={() => router.push("/home")}
          className="text-white text-lg sm:text-xl font-bold  font-font-heading hover:bg-[#ACB1D6] p-2 rounded-md cursor-pointer bg-[#8294C4]"
        >
          Start Editing
        </div>
      </div>
    </>
  );
};

export default Nav;
