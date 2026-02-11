"use client";

import { motion } from "framer-motion";

interface CheckboxWithLabelProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showError: boolean;
}

export default function CheckboxWithLabel({
  checked,
  onChange,
  showError,
}: CheckboxWithLabelProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute opacity-0 h-0 w-0 cursor-pointer"
        />

        <motion.div
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center
            transition-all duration-200
            ${
              checked
                ? "border-[#606566] bg-transparent"
                : "border-[#606566] bg-transparent"
            }
            ${showError ? "border-red-400" : ""}
          `}
          initial={{ scale: 1 }}
          animate={{ scale: checked ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {checked && (
            <motion.svg
              className="w-4 h-4 text-[#FDB056] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>

      <motion.span
        className={`text-sm md:text-base w-full sm:w-full md:w-[70%] ${
          showError ? "text-red-400" : "text-gray-400"
        }`}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Я согласен с офертой рекуррентных платежей и Политикой
        конфиденциальности
      </motion.span>
    </label>
  );
}
