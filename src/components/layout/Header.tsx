"use client";

import { useEffect, useState } from "react";
import { PiStarFourFill } from "react-icons/pi";
import { motion } from "framer-motion";

interface HeaderProps {
  timeLeft: number;
  onTimeUp?: () => void;
}

export default function Header({ timeLeft, onTimeUp }: HeaderProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (timeLeft <= 30 && timeLeft > 0) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const timeColor =
    timeLeft <= 0
      ? "text-white"
      : isBlinking
      ? "text-red-400"
      : "text-[#FFBB00]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#1D5B43] py-2 md:py-1 text-center border-b border-[#1D5B43]/50">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <p className="text-white text-base md:text-lg font-bold tracking-wide">
              Успейте открыть пробную неделю
            </p>

            <motion.div
              className={`
                mt-1 font-bold text-2xl md:text-3xl tracking-wider flex items-center gap-3 md:gap-4
                ${timeColor}
                ${isBlinking ? "animate-blink" : ""}
                transition-colors duration-500
              `}
              animate={isBlinking ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={
                isBlinking
                  ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5 }
              }
            >
              <PiStarFourFill size={12} />
              {formattedTime}
              <PiStarFourFill size={12} />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
