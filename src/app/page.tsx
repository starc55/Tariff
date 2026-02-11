"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import TariffList from "@/components/tariff/TariffList";
import CheckboxWithLabel from "@/components/ui/CheckBoxWithLabel";
import BuyButton from "@/components/ui/BuyButton";
import FooterGuarantee from "@/components/layout/FooterGuarantee";
import { fetchTariffs } from "@/lib/api";
import { Tariff } from "@/lib/types";
import Image from "next/image";

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showDiscount, setShowDiscount] = useState(true);

  useEffect(() => {
    async function load() {
      console.log("Fetching tariffs...");
      const data = await fetchTariffs();
      console.log("API дан келган тарифлар:", data);
      setTariffs(data);
      const best = data.find((t) => t.is_best);
      if (best) setSelectedId(best.id);
      else if (data.length) setSelectedId(data[0].id);
    }
    load();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowDiscount(false);
      return;
    }
    const timer = setInterval(
      () => setTimeLeft((p) => Math.max(0, p - 1)),
      1000
    );
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleBuy = () => {
    if (!agreed) {
      setShowCheckboxError(true);
      setTimeout(() => setShowCheckboxError(false), 3000);
      return;
    }
    alert("Переход на оплату...");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header timeLeft={timeLeft} onTimeUp={() => setShowDiscount(false)} />

      <main className="pt-[100px] md:pt-[120px] pb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Выбери подходящий для себя{" "}
          <span className="text-[#FDB056]">тариф</span>
        </motion.h1>

        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full lg:w-5/12 max-w-[400px] lg:max-w-[450px] relative">
            <Image
              width={500}
              height={600}
              src="/gym.png"
              alt="Мужчина в форме"
              className="w-full h-auto object-contain rounded-xl max-h-[500px] sm:max-h-[600px] md:max-h-none"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 450px"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none rounded-b-xl" />
          </div>

          <div className="w-full lg:w-7/12 max-w-lg lg:max-w-none mt-5">
            <TariffList
              tariffs={tariffs}
              selectedId={selectedId}
              onSelect={setSelectedId}
              showDiscount={showDiscount}
            />

            <div className="mt-8 space-y-6">
              <div
                className="
                  bg-[#2D3233] 
                  pl-4 py-2 
                  rounded-[20px] 
                  w-full 
                  md:w-[65%] 
                  md:mx-0 
                  lg:w-[65%] 
                  lg:mx-0 
                  mx-auto
                "
              >
                <p
                  className="
                    text-white/80 
                    font-medium 
                    text-xs leading-relaxed
                    sm:text-sm
                    md:text-base
                  "
                >
                  <span className="text-[#FDB056] mr-2">!</span>
                  Следуя плану на 3 месяца и более, люди получают в 2 раза
                  лучший результат, чем за 1 месяц
                </p>
              </div>

              <CheckboxWithLabel
                checked={agreed}
                onChange={setAgreed}
                showError={showCheckboxError}
              />

              <BuyButton onClick={handleBuy} disabled={!selectedId} />

              <p className="text-xs leading-relaxed text-[#9B9B9B] text-left max-w-md sm:text-sm md:max-w-lg lg:max-w-none">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные
                кредитной/дебетовой карты будут сохранены для осуществления
                покупок дополнительных услуг сервиса в случае желания
                пользователя.
              </p>
            </div>
          </div>
        </motion.div>

        <FooterGuarantee />
      </main>
    </div>
  );
}
