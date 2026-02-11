import TariffCard from "./TariffCard";
import { Tariff } from "@/lib/types";

interface TariffListProps {
  tariffs: Tariff[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showDiscount: boolean;
}

export default function TariffList({
  tariffs,
  selectedId,
  onSelect,
  showDiscount,
}: TariffListProps) {
  const hitTariff = tariffs.find((t) => t.is_best === true);
  const regularTariffs = tariffs.filter((t) => t.is_best !== true);

  return (
    <div className="space-y-8">
      {hitTariff && (
        <TariffCard
          tariff={hitTariff}
          selected={selectedId === hitTariff.id}
          onSelect={() => onSelect(hitTariff.id)}
          showDiscount={showDiscount}
          isHit={true}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {regularTariffs.map((tariff) => (
          <TariffCard
            key={tariff.id}
            tariff={tariff}
            selected={selectedId === tariff.id}
            onSelect={() => onSelect(tariff.id)}
            showDiscount={showDiscount}
          />
        ))}
      </div>

      {regularTariffs.length > 0 && regularTariffs.length < 3 && (
        <p className="text-yellow-400 text-center py-4 text-sm sm:text-base">
          Oddiy tariflar: {regularTariffs.length} ta (kutilgan: 3 ta)
        </p>
      )}
    </div>
  );
}
