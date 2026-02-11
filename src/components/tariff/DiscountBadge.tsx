interface DiscountBadgeProps {
  discount: number;
}

export default function DiscountBadge({ discount }: DiscountBadgeProps) {
  return (
    <div className="absolute -top-2 left-10 bg-red-600 text-white font-bold px-2 py-1.5 rounded-bl-xl rounded-br-xl shadow-md text-sm md:text-base z-10">
      -{discount}%
    </div>
  );
}
