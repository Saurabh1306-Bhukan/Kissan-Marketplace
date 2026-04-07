import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FarmingAdvice } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const getFarmingAdvice = async (query: string): Promise<FarmingAdvice> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const prompt = `
You are an expert agricultural advisor for Indian farmers.

Return ONLY valid JSON in this format:

{
  "weather_summary": "string",
  "crop_suggestions": [
    {
      "name": "string",
      "sowing_season": "string",
      "water_requirements": "string",
      "soil_suitability": "string",
      "potential_yield": "string",
      "common_pests_diseases": "string"
    }
  ]
}

Now answer this:
${query}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean markdown if exists
    const cleanJson = text.replace(/```json|```/g, "").trim();

    const parsedData = JSON.parse(cleanJson);

    return parsedData as FarmingAdvice;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get farming advice.");
  }
};