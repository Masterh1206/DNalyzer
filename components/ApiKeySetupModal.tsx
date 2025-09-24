
import React, { useState, useEffect } from 'react';
import Modal from './Modal.tsx';
import { KeyIcon, SaveIcon, TrashIcon, EyeIcon, EyeOffIcon } from './icons.tsx';
import { saveApiKey, getApiKey, clearApiKey } from '../services/aiService.ts';

interface ApiKeySetupModalProps {
  onClose: () => void;
  onApiKeyUpdate: () => void;
}

const ApiKeySetupModal: React.FC<ApiKeySetupModalProps> = ({ onClose, onApiKeyUpdate }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [storedKey, setStoredKey] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setStoredKey(getApiKey());
  }, []);

  const handleSave = () => {
    saveApiKey(apiKeyInput);
    setStoredKey(apiKeyInput);
    setSuccessMessage('API Key saved successfully! AI is now active.');
    onApiKeyUpdate();
    setApiKeyInput('');
    setTimeout(() => {
        onClose();
    }, 1500); // Close modal after showing success
  };
  
  const handleRemove = () => {
    clearApiKey();
    setStoredKey(null);
    onApiKeyUpdate();
    setSuccessMessage(''); // Clear any previous success message
  };

  const getMaskedKey = (key: string): string => {
    if (key.length < 8) return '••••••••';
    return `${key.substring(0, 4)}••••••••${key.substring(key.length - 4)}`;
  }

  return (
    <Modal title="Connect Your Gemini API Key" onClose={onClose}>
      <div className="space-y-6">
        {storedKey ? (
          <div>
            <h3 className="text-lg font-semibold text-brand-text-primary">AI Status: Active</h3>
            <div className="mt-4 bg-brand-bg p-4 rounded-lg flex items-center justify-between border border-brand-border">
                <div>
                    <p className="text-sm text-brand-text-secondary">Your API Key is connected.</p>
                    <p className="font-mono text-green-400 mt-1">{getMaskedKey(storedKey)}</p>
                </div>
                <button 
                  onClick={handleRemove}
                  className="flex items-center space-x-2 bg-red-500/10 text-red-400 px-3 py-2 rounded-md hover:bg-red-500/20 hover:text-red-300 transition-colors text-sm font-semibold"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Remove Key</span>
                </button>
            </div>
            <p className="mt-4 text-sm text-brand-text-secondary">
              The application is now using your API key to power all AI features. Your key is stored securely in your browser's local storage and is never sent to our servers.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-brand-text-primary flex items-center">
              <KeyIcon className="w-5 h-5 mr-3 text-brand-secondary" />
              Provide Your API Key
            </h3>
            <p className="mt-2 text-brand-text-secondary">
              To activate the AI-powered features, please enter your Google Gemini API key below. Your key is stored only in your browser.
            </p>
            <p className="mt-2 text-brand-text-secondary">
              You can get your free key from{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-secondary hover:underline">
                Google AI Studio
              </a>.
            </p>

            <div className="mt-4 space-y-3">
              <label htmlFor="api-key-input" className="sr-only">Gemini API Key</label>
              <div className="relative">
                <input
                  id="api-key-input"
                  type={showPassword ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full bg-brand-bg border border-brand-border rounded-lg p-3 pr-10 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder:text-brand-text-secondary/60 shadow-inner font-mono"
                  placeholder="Enter your API key"
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-brand-text-secondary hover:text-brand-text-primary"
                  aria-label={showPassword ? "Hide API key" : "Show API key"}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              {successMessage && <p className="text-sm text-green-400 animate-fade-in">{successMessage}</p>}
              <button
                onClick={handleSave}
                disabled={!apiKeyInput.trim()}
                className="w-full flex items-center justify-center bg-brand-primary text-white font-bold py-2.5 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <SaveIcon className="w-5 h-5 mr-2" />
                Save & Activate AI
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ApiKeySetupModal;
