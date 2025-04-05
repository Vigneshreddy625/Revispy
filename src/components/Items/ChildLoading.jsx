import React from "react";
import dogWalk from "../../assets/dogWalk.gif";
import { motion } from "framer-motion";

function ChildLoading() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center h-[300px]">
      <motion.img
        src={dogWalk}
        alt="Walking Dog"
        className="h-[300px]"
      />
      <p className="absolute top-[200px] text-lg font-medium mt-4">Loading, please wait...</p>
    </div>
  );
}

export default ChildLoading;
