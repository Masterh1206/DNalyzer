
import React from 'react';
import Modal from './Modal.tsx';
import { KeyIcon } from './icons.tsx';

const ApiKeyInstructionsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Modal title="AI Service Configuration" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary flex items-center">
            <KeyIcon className="w-5 h-5 mr-3 text-brand-secondary" />
            What's the Issue?
          </h3>
          <p className="mt-2">
            This application uses the Google Gemini API to power its AI features (like Trend Analysis and Domain Appraisal). To work correctly, it needs a valid API key.
          </p>
          <p className="mt-2">
            The key has not been configured in the hosting environment where this app is deployed.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary">Why Can't I Paste My Key Here?</h3>
          <p className="mt-2">
            For your security, your API key should never be pasted directly into the website. It must be stored securely as an <strong>environment variable</strong> on the server.
          </p>
          <p className="mt-2">
            This prevents unauthorized users from viewing your website's code, stealing your key, and misusing your API access. The current setup is designed to be secure by default.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-text-primary">How to Fix It (Vercel Example)</h3>
          <ol className="list-decimal list-inside mt-2 space-y-3 pl-2">
            <li>
              <strong>Get your API Key:</strong> Go to{' '}
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-secondary hover:underline">
                Google AI Studio
              </a>, create a free API key, and copy it.
            </li>
            <li>
              <strong>Go to your Vercel Project:</strong> Open your project dashboard on Vercel.
            </li>
            <li>
              <strong>Navigate to Settings:</strong> Click on the "Settings" tab, then select "Environment Variables" from the left menu.
            </li>
            <li>
              <strong>Add the Variable:</strong> Create a new variable. Enter the exact name <code className="bg-brand-bg px-1.5 py-0.5 rounded text-sm font-mono text-amber-400">API_KEY</code> and paste your copied key into the value field. Ensure it is available on all environments.
            </li>
            <li>
              <strong>Redeploy:</strong> Vercel will automatically start a new deployment. Once it's finished, refresh this page, and the AI services will be connected.
            </li>
          </ol>
        </div>
      </div>
    </Modal>
  );
};

export default ApiKeyInstructionsModal;
