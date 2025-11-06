import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

export async function askGemini(instructions, prompt) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    systemInstruction: [
      {
        text: `${instructions}`,
      },
    ],
  };
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${prompt}`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  return response.text.trim();
}
