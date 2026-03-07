import { GoogleGenAI } from "@google/genai";

export async function getMarketIntelligence(query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return {
      text: "⚠️ **API Key Missing**: I'm currently running in 'UI-only' mode. To enable real-time AI market analysis, please configure your `GEMINI_API_KEY` in the `.env` file as described in the README.",
      sources: []
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are FinSight AI, a professional quantitative financial analyst. 
        Provide data-backed insights on stocks, market trends, and economic indicators. 
        Use professional, precise language. 
        When asked about specific stocks, provide sentiment analysis based on recent news.
        Always use Google Search to get the latest real-time market data.`,
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text || "I couldn't process that request.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
        title: chunk.web?.title,
        url: chunk.web?.uri
      })).filter(s => s.title && s.url) || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Error connecting to market intelligence service.", sources: [] };
  }
}

export async function analyzeSentiment(text: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") return null;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the sentiment of the following financial news snippet. 
      Return a JSON object with: 
      - score: number between -1 (very bearish) and 1 (very bullish)
      - label: string (positive, negative, or neutral)
      - entities: array of stock symbols mentioned
      - reasoning: short explanation
      
      Snippet: "${text}"`,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Sentiment Analysis Error:", error);
    return null;
  }
}
