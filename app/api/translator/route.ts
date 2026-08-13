import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { text, fromLanguage, toLanguage } = body;

    if (!text?.trim()) {
      return NextResponse.json(
        {
          error: "Please provide text to translate.",
        },
        { status: 400 },
      );
    }

    if (!fromLanguage || !toLanguage) {
      return NextResponse.json(
        {
          error: "Please select both source and target languages.",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are a professional travel translator.

Translate the following text from ${fromLanguage} to ${toLanguage}.

IMPORTANT RULES:

1. Preserve the original meaning.
2. Use natural language.
3. Do not add explanations.
4. Do not add quotation marks.
5. Do not summarize.
6. Do not change names, numbers, or important details.
7. If the text is a travel-related phrase, make the translation natural and useful for real communication.
8. Return ONLY the translated text.

Text to translate:
${text}
`;

    let response;

    try {
      response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          maxOutputTokens: 1000,
        },
      });
    } catch (firstError) {
      console.log("Translator first request failed. Retrying...");

      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            maxOutputTokens: 1000,
          },
        });
      } catch (secondError) {
        console.log("Translator retry failed. Using fallback model...");

        console.error(secondError);

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: prompt,
          config: {
            maxOutputTokens: 1000,
          },
        });
      }
    }

    const translation = response.text?.trim();

    if (!translation) {
      return NextResponse.json(
        {
          error: "AI did not return a translation.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      translation,
    });
  } catch (error) {
    console.error("Translator API error:", error);

    return NextResponse.json(
      {
        error: "Unable to translate right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
