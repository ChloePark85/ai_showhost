"use client";
import { motion } from "framer-motion";

export const BackgroundWave = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-[-1] hidden md:block">
      <motion.img
        src="/olive.png"
        alt="olive background"
        className="w-full h-auto pointer-events-none opacity-75"
      />
    </div>
  );
};
