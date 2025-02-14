import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Trash2, Home } from "lucide-react";

const DeleteAddress = ({ isOpen, onClose, address }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-[300px] sm:max-w-md bg-white dark:bg-black rounded-2xl shadow-lg overflow-hidden border dark:border-gray-600"
      >
        <div className="relative h-14 bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <Trash2 className="w-6 h-6 text-red-500 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="p-6 pt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Delete Address
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Are you sure you want to delete this address? This action cannot be undone.
          </p>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-6">
            <div className="flex items-start space-x-3">
              <Home className="w-5 h-5 mt-1 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Vignesh Reddy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Srinagar colony, kurnool road
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  ongole, Andhra Pradesh - 523001
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Mobile: 9381XXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto px-2 md:px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-red-500 to-pink-600 
                     hover:from-red-600 hover:to-pink-700 text-white rounded-lg
                     transform transition-all active:scale-95 focus:outline-none
                     focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Delete Address
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteAddress;