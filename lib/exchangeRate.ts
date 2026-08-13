const API_URL = "https://open.er-api.com/v6/latest";

export type ExchangeRateResponse = {
  result: string;
  base_code: string;
  rates: Record<string, number>;
};

export async function getExchangeRates(
  baseCurrency: string,
): Promise<ExchangeRateResponse> {
  const response = await fetch(`${API_URL}/${baseCurrency}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates.");
  }

  const data = await response.json();

  if (data.result !== "success") {
    throw new Error("Exchange rate API returned an error.");
  }

  return data;
}
