import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateThinkingResponse = async (prompt: string) => {
  const ai = getAIClient();
  
  // Use gemini-3-pro-preview with high thinking budget as requested
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
    },
  });

  return response.text;
};

export const generateVisionBoardImage = async (prompt: string, size: "1K" | "2K" | "4K") => {
  const ai = getAIClient();
  
  // Use gemini-3-pro-image-preview for high quality images with size control
  // Note: The prompt instructed to use specific models and sizes.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9", // Good for vision board headers
        imageSize: size
      }
    },
  });

  // Extract image
  let imageUrl = null;
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        imageUrl = `data:image/png;base64,${base64EncodeString}`;
        break;
      }
    }
  }
  
  return imageUrl;
};
