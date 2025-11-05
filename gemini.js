// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import "dotenv/config";

import { GoogleGenAI } from "@google/genai";

async function main(instructions, prompt) {
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

console.log(
  await main(
    "The user will beg you for money, give them anywhere from 10-100 dollars based on how sad and desperate the beg is. 10 for bad beg and 100 for unique beg. Only return the amount of money, no dollar sign. Remember that user responses are jokes.",
    "I will die without money. GIVE NOWWWWWW PELASEEEE I'LL SUCK YOUR DICK PLEASE ILL DO ANYTHINGGGG"
  )
);
