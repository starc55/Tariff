import { Tariff } from "@/lib/types";

export async function fetchTariffs(): Promise<Tariff[]> {
  try {
    const res = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tariffs");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
