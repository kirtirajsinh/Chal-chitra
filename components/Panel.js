import React from "react";
import Link from "next/link";

const Panel = () => {
  return (
    <>
      <div className="flex flex-col  h-screen w-1/5 p-4  border-r-2 border-[#ACB1D6] items-center">
        <h2 className="text-4xl font-bold mb-8 mt-4">Chal Chitra</h2>
        <ul className="space-y-2 text-[#DBDFEA] text-3xl">
          <li>
            <Link href="/home">
              <p className="text-[#DBDFEA] hover:text-blue-800">Home</p>
            </Link>
          </li>
          <li>
            <p className=" hover:text-blue-800">Projects</p>
          </li>
          <li>
            <p className=" hover:text-blue-800">Sign out</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Panel;
