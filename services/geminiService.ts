import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real environment, handle the missing key gracefully.
// We are assuming process.env.API_KEY is available as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProfessionalBio = async (draft: string, role: string): Promise<string> => {
  if (!process.env.API_KEY) return "AI services unavailable (Missing API Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite the following bio to be extremely professional, concise, and safe-for-work (SFW), suitable for a "LinkedIn for the adult industry" platform. 
      The user is a ${role}. 
      
      Draft: "${draft}"
      
      Output only the rewritten bio.`,
    });
    return response.text || "Could not generate bio.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating bio. Please try again.";
  }
};

export const analyzeSafetyParams = async (description: string): Promise<{ safe: boolean; reason: string }> => {
   if (!process.env.API_KEY) return { safe: true, reason: "AI Check Skipped" };

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following casting call description. Is it professional and likely safe, or does it contain red flags for human trafficking, non-consensual content, or illegal acts?
      
      Description: "${description}"
      
      Respond in JSON format: { "safe": boolean, "reason": string }`,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    const text = response.text;
    if (!text) return { safe: true, reason: "Analysis failed" };
    
    return JSON.parse(text);
  } catch (error) {
    return { safe: true, reason: "Manual review required" };
  }
}