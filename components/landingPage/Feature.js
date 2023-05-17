import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,

    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
    },
  },
};

const Feature = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center  mt-64 ">
        <h1 className=" text-4xl font-semibold  font-font-heading text-[#DBDFEA]">
          Wanna see the Demo?👀
        </h1>
        <motion.div
          className="flex flex-col items-center  px-2"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={cardVariants}
        >
          <div className="flex justify-center items-center ">
            <video
              className="w-3/4 h-auto rounded-xl hover:shadow-xl shadow- "
              controls
              src="/demo.mp4"
            />
          </div>

          <h1 className=" text-xl sm:text-xl font-semibold mt-4 text-white font-font-heading ">
            Explore your creativity with Chal Chitra and create Tiktoks, shorts
            and Animations in minutes.
          </h1>
        </motion.div>
        <motion.div
          className="flex flex-col items-center  px-2"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
          variants={cardVariants}
        >
          <h1 className=" text-4xl font-semibold  font-font-heading text-[#DBDFEA] mt-32">
            Potential Use Cases
          </h1>

          <h1 className=" text-xl space-y-8 sm:text-xl font-semibold mt-4 mb-64 text-white font-font-heading ">
            <ul className="space-y-8">
              <li>
                Make your own animated short film{" "}
                <span className="text-md text-blue-500">
                  &#40;save 100+ hours Animating frame by frame &#41;{" "}
                </span>
              </li>
              <li>Create Interesting content for your social Media </li>
              <span className="text-md text-blue-500">
                &#40;just do and create funny stuff &#41;{" "}
              </span>
              <li>Train model and create your unique style videos</li>{" "}
              <span className="text-md text-blue-500">
                &#40;Think Mr. beast personality kinda vid &#41;{" "}
              </span>
            </ul>
          </h1>
        </motion.div>
      </div>
    </>
  );
};

export default Feature;
