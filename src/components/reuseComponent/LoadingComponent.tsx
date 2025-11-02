"use client";

import { motion } from "framer-motion"; 

export default function LoadingComponent() { 

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center gap-4"
      >
        <img
          src={import.meta.env["VITE_SITE_LOGO"]}
          alt="Rubito Logo"
          width={120}
          height={120} 
        />
        <motion.div
          className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}