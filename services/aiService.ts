
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;
let isInitialized = false;
let aiStatus: 'ready' | 'error' = 'ready';
let aiError: string | null = null;

/**
 * Initializes and returns a singleton instance of the GoogleGenAI client.
 * It strictly relies on the `process.env.API_KEY` environment variable.
 * If the API key is not found, it logs a critical error to the console
 * and returns null, allowing the application to gracefully disable AI features.
 * @returns {GoogleGenAI | null} The initialized client or null if the API key is missing.
 */
export const getGoogleAI = (): GoogleGenAI | null => {
  if (isInitialized) {
    return aiInstance;
  }

  isInitialized = true; // Attempt initialization only once.

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error(
      "%cAI Service Critical Error: The 'API_KEY' environment variable is not set. This is required for all AI features to function. Please ensure this variable is configured in your deployment environment.",
      "color: red; font-weight: bold; font-size: 14px;"
    );
    aiInstance = null;
    aiStatus = 'error';
    aiError = "The 'API_KEY' environment variable is not configured in your hosting environment.";
    return null;
  }

  aiInstance = new GoogleGenAI({ apiKey });
  aiStatus = 'ready';
  return aiInstance;
};

/**
 * Returns the status of the AI service initialization.
 * This function will trigger initialization if it hasn't happened yet.
 * @returns {{status: 'ready' | 'error', error: string | null}} The current status of the AI service.
 */
export const getAIStatus = (): { status: 'ready' | 'error', error: string | null } => {
  if (!isInitialized) {
    getGoogleAI(); // Ensures the initialization logic runs once.
  }
  return { status: aiStatus, error: aiError };
};
