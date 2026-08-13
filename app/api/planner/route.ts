import { NextResponse } from "next/server";

import { ai } from "@/lib/gemini";
import destinations from "@/data/destinations.json";
import foods from "@/data/foods.json";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { destination, days, budget, interest } = body;

    // Validate user input
    if (!destination || !days || !budget || !interest) {
      return NextResponse.json(
        {
          error: "Please provide destination, days, budget, and interest.",
        },
        { status: 400 },
      );
    }

    // Find selected destination
    const selectedDestination = destinations.find(
      (item) => item.name.toLowerCase() === destination.toLowerCase(),
    );

    if (!selectedDestination) {
      return NextResponse.json(
        {
          error: "Destination not found.",
        },
        { status: 404 },
      );
    }

    // Find relevant food information
    const destinationFoods = foods.filter((food: any) => {
      const foodText = JSON.stringify(food).toLowerCase();

      return (
        foodText.includes(destination.toLowerCase()) ||
        foodText.includes(selectedDestination.province.toLowerCase())
      );
    });

    // Create local knowledge context
    const localData = {
      destination: selectedDestination,
      foods: destinationFoods,
    };

    // Prompt for Gemini
    const prompt = `
You are an expert Thailand travel planner for an international travel website.

Your task is to create a practical and personalized travel itinerary for a tourist visiting Thailand.

USER INFORMATION

Destination: ${destination}
Number of days: ${days}
Budget: ${budget}
Interest: ${interest}

LOCAL WEBSITE DATA

The following information comes from our website's local data files.

Use this information as the primary reference when recommending destinations, attractions, and food.

${JSON.stringify(localData, null, 2)}

IMPORTANT RULES

1. Focus on the selected destination: ${destination}.

2. Use the provided local website data whenever possible.

3. Do not invent specific information that contradicts the provided website data.

4. Only recommend places that are relevant to the selected destination.

5. Consider the user's budget.

6. Focus strongly on the user's stated interest.

7. Create a realistic itinerary that does not require excessive travel between locations.

8. Include morning activities, lunch, afternoon activities, dinner, and evening activities when appropriate.

9. Recommend places that are suitable for international tourists.

10. If information is uncertain or may change, clearly tell the user to verify the latest details.

11. Do not claim that a restaurant is halal unless the provided website data explicitly confirms it.

12. Do not invent restaurant names from the local website data.

13. Write the response in clear and natural English.

14. Make the result easy to read.

15. Keep the recommendations practical rather than listing too many places in one day.

16. The user may be from any country. Do not assume that the traveler is Malaysian.

17. Respect different cultures, religions, budgets, and travel preferences.

Return ONLY valid JSON.

Do not use Markdown.
Do not use code fences.
Do not add explanations outside the JSON.

Use exactly this structure:

{
  "tripSummary": {
    "destination": "string",
    "duration": "string",
    "budget": "string",
    "interest": "string"
  },
  "days": [
    {
      "day": 1,
      "morning": "string",
      "lunch": "string",
      "afternoon": "string",
      "dinner": "string",
      "evening": "string"
    }
  ],
  "budgetTips": [
    "string"
  ],
  "travelTips": [
    "string"
  ]
}

Create one object inside "days" for every day of the trip.
`;

    let response;

    try {
      // First attempt
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          maxOutputTokens: 3000,
          responseMimeType: "application/json",
        },
      });
    } catch (firstError) {
      console.log("Gemini 3.6 Flash failed. Retrying...");

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        // Second attempt
        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            maxOutputTokens: 3000,
            responseMimeType: "application/json",
          },
        });
      } catch (secondError) {
        console.log("Gemini 3.6 Flash retry failed. Using fallback model...");

        console.error(secondError);

        // Fallback model
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: prompt,
          config: {
            maxOutputTokens: 3000,
            responseMimeType: "application/json",
          },
        });
      }
    }

    const result = response.text;

    if (!result) {
      return NextResponse.json(
        {
          error: "AI did not return a response.",
        },
        { status: 500 },
      );
    }

    let itinerary;

    try {
      itinerary = JSON.parse(result);
    } catch (error) {
      console.error("Invalid AI JSON:", result);

      return NextResponse.json(
        {
          error: "AI returned an invalid itinerary format.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      itinerary,
    });
  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error);
    console.error("===================================");

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate itinerary.",
      },
      { status: 500 },
    );
  }
}
