
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a short, compassionate, and calming message for the patient.
 */
export const getCalmingMessage = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un asistente de salud extremadamente compasivo en un centro oncológico. 
      Un paciente llamado ${name} acaba de llegar.
      Proporciona un mensaje de bienvenida de UNA SOLA FRASE (máximo 15 palabras) que transmita calma, 
      tranquilidad y cuidado. El tono debe ser cálido y humano, no clínico ni tecnológico. 
      No uses exclamaciones excesivas ni promesas médicas. Solo calidez.`,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text?.trim() || "Estamos aquí para acompañarte en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tu bienestar es nuestra prioridad hoy.";
  }
};
