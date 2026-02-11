interface BuyButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function BuyButton({ onClick, disabled }: BuyButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full sm:w-full md:w-[50%]  // Mobile full, Desktop 50%
        py-4 px-8 rounded-[20px] cursor-pointer font-bold text-lg md:text-xl text-black
        bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600
        transition-all duration-300 shadow-lg
        ${disabled ? "opacity-60 cursor-not-allowed" : "animate-pulse-shadow"}
      `}
    >
      Купить
    </button>
  );
}
