"use client";

import { motion } from "framer-motion";
import DiscountBadge from "./DiscountBadge";

interface TariffCardProps {
  tariff: Tariff;
  selected: boolean;
  onSelect: () => void;
  showDiscount: boolean;
  isHit?: boolean;
}

export default function TariffCard({
  tariff,
  selected,
  onSelect,
  showDiscount,
  isHit = false,
}: TariffCardProps) {
  const discount = Math.round(
    ((tariff.full_price - tariff.price) / tariff.full_price) * 100
  );

  return (
    <motion.div
      onClick={onSelect}
      className={`
        relative cursor-pointer transition-all duration-300 rounded-[34px] overflow-hidden shadow-lg
        ${
          isHit
            ? "bg-[#313637] border-2 border-orange-500/70 hover:border-orange-500/90"
            : "bg-[#313637] border-2 border-[#484D4E] hover:border-gray-500"
        }
        ${
          selected
            ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-[#0A0A0A] scale-[1.02]"
            : ""
        }
        w-full flex flex-col
        h-auto md:min-h-[220px]
      `}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {showDiscount && <DiscountBadge discount={discount} />}

      {isHit && (
        <motion.div
          className="text-[#FDB056] absolute top-2 right-3 tracking-wider text-sm sm:text-base font-medium px-2.5 py-0.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          ХИТ!
        </motion.div>
      )}

      <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full ">
        <h3
          className={` text-left text-lg sm:text-xl md:text-2xl font-medium mt-3 sm:mt-4 md:mt-5 mb-3 md:mb-4 text-white ${
            isHit ? "text-left" : "text-center md:text-center"
          }`}
        >
          {tariff.period}
        </h3>

        <div
          className={`flex w-full ${
            isHit
              ? "flex-row items-center gap-4 sm:gap-6"
              : "flex-row md:flex-col items-center gap-4 sm:gap-6 md:gap-0"
          }`}
        >
          <div
            className={`relative flex ${
              isHit ? "flex-col" : "flex-col md:items-center"
            } items-start`}
          >
            <motion.span
              className={`
                font-medium
                ${
                  isHit
                    ? "text-3xl sm:text-4xl md:text-5xl"
                    : "text-3xl sm:text-4xl md:text-5xl"
                }
                ${isHit ? "text-[#FDB056]" : "text-white"}
              `}
              animate={{ scale: selected ? [1, 1.05, 1] : 1 }}
              transition={
                selected
                  ? { duration: 1.2, repeat: Infinity, repeatType: "reverse" }
                  : {}
              }
            >
              {showDiscount ? tariff.price : tariff.full_price} ₽
            </motion.span>

            {showDiscount && (
              <span
                className={`text-sm sm:text-base md:text-lg text-[#919191] line-through ${
                  isHit
                    ? "ml-3 sm:ml-4"
                    : "ml-3 sm:ml-4 md:ml-0 md:relative md:right-[-32px] md:bottom-[-3px]"
                }`}
              >
                {tariff.full_price} ₽
              </span>
            )}
          </div>

          <p
            className={`
              text-xs sm:text-sm md:text-base text-white/70
              ${
                isHit
                  ? "flex-1 text-left"
                  : "flex-1 md:flex-none text-left md:text-left md:mt-4 sm:md:mt-6"
              }
            `}
          >
            {tariff.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
