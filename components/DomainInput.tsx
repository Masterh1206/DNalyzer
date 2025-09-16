
import React from 'react';
import { ScanIcon, LoaderIcon, SparklesIcon } from './icons.tsx';

interface DomainInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  aiTrends: { [key: string]: number } | null;
}

const DomainInput: React.FC<DomainInputProps> = ({ 
  value, 
  onChange, 
  onAnalyze, 
  isLoading, 
  aiTrends 
}) => {
  return (
    <div className="bg-brand-surface py-16 sm:py-24 border-b border-brand-border">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight">
          Find Valuable Domains, Instantly
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-text-secondary">
          Paste a list of domains to analyze for trending keywords, or let our AI generate new ideas for your next project.
        </p>
        
        <div className="max-w-2xl mx-auto mt-8">
          <textarea
            id="domain-input"
            rows={10}
            className="w-full bg-brand-bg border border-brand-border rounded-lg p-4 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder:text-brand-text-secondary/60 shadow-inner"
            placeholder="example.com&#10;anotherdomain.net&#10;greatidea.ai"
            value={value}
            onChange={onChange}
            disabled={isLoading}
            aria-label="Paste Domain List"
          />
          <div className="mt-4">
            <button
              onClick={onAnalyze}
              disabled={isLoading}
              className="w-full sm:w-auto sm:px-12 flex items-center justify-center bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary mx-auto"
            >
              {isLoading ? (
                <>
                  <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Scanning...
                </>
              ) : (
                <>
                  <ScanIcon className="mr-2 h-5 w-5" />
                  Scan Domains
                </>
              )}
            </button>
          </div>
          {aiTrends && (
            <div className="mt-6 text-center animate-fade-in bg-brand-bg/50 border border-brand-border rounded-lg p-3 max-w-md mx-auto">
                <h3 className="text-xs font-semibold text-brand-secondary uppercase tracking-wider mb-1 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 mr-2" />
                    AI-Powered Trends Are Active
                </h3>
                <p className="text-xs text-brand-text-secondary">Your domain scan will be prioritized using these keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainInput;
