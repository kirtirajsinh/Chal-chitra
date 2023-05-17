import Panel from "@/components/Panel";
import VidPrompt from "@/components/VidPrompt";
import React from "react";

const home = () => {
  return (
    <>
      <div className="flex flex-row items-center ">
        <Panel />
        <div>
          <VidPrompt />
        </div>
      </div>
    </>
  );
};

export default home;
