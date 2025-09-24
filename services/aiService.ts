
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;
let currentApiKey: string | null = null;

const API_KEY_STORAGE_KEY = 'gemini_api_key';

/**
 * Retrieves the user's API key from local storage.
 * @returns {string | null} The API key or null if not found.
 */
export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  } catch (e) {
    console.error("Could not access localStorage:", e);
    return null;
  }
};

/**
 * Saves the user's API key to local storage.
 * @param {string} key The API key to save.
 */
export const saveApiKey = (key: string): void => {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    // Invalidate the current AI instance so it gets re-created with the new key
    aiInstance = null;
    currentApiKey = key;
  } catch (e) {
    console.error("Could not write to localStorage:", e);
  }
};

/**
 * Clears the user's API key from local storage.
 */
export const clearApiKey = (): void => {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    aiInstance = null;
    currentApiKey = null;
  } catch (e) {
    console.error("Could not remove from localStorage:", e);
  }
};

/**
 * Initializes and returns a singleton instance of the GoogleGenAI client
 * based on the key stored in local storage.
 * @returns {GoogleGenAI | null} The initialized client or null if the API key is missing.
 */
export const getGoogleAI = (): GoogleGenAI | null => {
  const storedKey = getApiKey();

  // If there's no key, there's no AI instance.
  if (!storedKey) {
    if (aiInstance) aiInstance = null;
    if (currentApiKey) currentApiKey = null;
    return null;
  }
  
  // If an instance exists and it was created with the current key, return it.
  if (aiInstance && storedKey === currentApiKey) {
    return aiInstance;
  }
  
  // Otherwise, create a new instance with the stored key.
  try {
    const newInstance = new GoogleGenAI({ apiKey: storedKey });
    aiInstance = newInstance;
    currentApiKey = storedKey;
    return aiInstance;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI. The API key might be invalid.", error);
    // If initialization fails (e.g., malformed key), clear it to prevent repeated errors.
    clearApiKey();
    return null;
  }
};

/**
 * Returns the status of the AI service initialization.
 * @returns {{status: 'ready' | 'error', error: string | null}} The current status of the AI service.
 */
export const getAIStatus = (): { status: 'ready' | 'error', error: string | null } => {
  if (getApiKey()) {
    return { status: 'ready', error: null };
  }
  return { status: 'error', error: "Gemini API key is not set." };
};
