import React from 'react';
import dogWalk from '../../assets/dogWalk.gif';
import { motion } from 'framer-motion';

function DogLoading() {
  return (
    <div className="relative w-full flex flex-col justify-center items-center min-h-screen bg-white">
      <motion.img
        src={dogWalk}
        alt="Walking Dog"
        className="h-64 sm:h-72 md:h-80"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <motion.p
        className="absolute top-[60%] text-lg font-medium text-gray-700 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading, please wait...
      </motion.p>
    </div>
  );
}

export default DogLoading;
