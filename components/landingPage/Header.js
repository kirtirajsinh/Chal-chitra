import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <>
      <div className="">
        <motion.div
          className=" flex flex-col  items-center justify-center mt-64 "
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            x: { duration: 0.5 },
          }}
        >
          <h1 className="text-7xl font-bold  font-font-heading text-[#DBDFEA]">
            🎥 Chal Chitra
          </h1>
          <p className="text-2xl font-semibold mt-4 font-font-heading">
            Creator friendly editor✂️ that animates, lights and composes
            characters in a video scene.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Header;
