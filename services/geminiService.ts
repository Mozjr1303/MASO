import { GoogleGenAI, Type } from "@google/genai";
import { Event, AIRecommendation } from '../types';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRecommendations = async (
  query: string,
  events: Event[]
): Promise<AIRecommendation[]> => {
  try {
    // Create a simplified context of events to save tokens and focus the model
    const eventContext = events.map(e => ({
      id: e.id,
      title: e.title,
      description: e.description,
      category: e.category,
      date: e.date
    }));

    const prompt = `
      You are an expert volunteer coordinator for 'Alchemy Connect'.
      User Query: "${query}"
      
      Available Events: ${JSON.stringify(eventContext)}
      
      Task: strictly identify the top 3 events that best match the user's query based on interest, skills implied, or availability.
      If the query is vague, prioritize upcoming events with available spots.
      
      Return the result as a JSON array of objects.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              eventId: { type: Type.STRING },
              reason: { type: Type.STRING, description: "A short, encouraging sentence explaining why this fits." }
            },
            required: ['eventId', 'reason']
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    const recommendations = JSON.parse(jsonStr) as AIRecommendation[];
    return recommendations;

  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return [];
  }
};
