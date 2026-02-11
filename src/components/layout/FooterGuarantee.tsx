"use client";

import { motion } from "framer-motion";

export default function FooterGuarantee() {
  return (
    <motion.div
      className="mt-12 p-5 sm:p-4 bg-transparent rounded-[30px] border border-[#484D4E]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h4
        className="
          text-[#81FE95] font-medium border-1 border-[#81FE95] text-center py-2 mb-4 bg-[#2D3233] rounded-[20px]
          w-full sm:w-full md:w-[25%]
        "
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Гарантия возврата 30 дней
      </motion.h4>

      <motion.p
        className="text-[#DCDCDC] text-sm sm:text-sm md:text-base leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Мы уверены, что наш план сработает для тебя и ты увидишь видимые
        результаты уже через 4 недели. Мы даже готовы полностью вернуть твои
        деньги в течение 30 дней с момента покупки, если ты не получишь видимых
        результатов.
      </motion.p>
    </motion.div>
  );
}
