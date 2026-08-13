import { NextResponse } from "next/server";
import { getExchangeRates } from "@/lib/exchangeRate";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        {
          error: "Please provide both from and to currencies.",
        },
        { status: 400 },
      );
    }

    const data = await getExchangeRates(from);

    const rate = data.rates[to];

    if (!rate) {
      return NextResponse.json(
        {
          error: `Exchange rate for ${to} was not found.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      from,
      to,
      rate,
    });
  } catch (error) {
    console.error("Currency API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch exchange rate.",
      },
      { status: 500 },
    );
  }
}
