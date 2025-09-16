import React from 'react';
import type { TrendingDomain } from '../types.ts';
import KeywordListItem from './KeywordListItem.tsx';
import { AlertTriangleIcon, InfoIcon } from './icons.tsx';

interface ResultsPanelProps {
  domains: TrendingDomain[];
  isLoading: boolean;
  error: string | null;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ domains, isLoading, error }) => {

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4 items-center p-3">
              <div className="h-8 w-8 bg-brand-border rounded-full"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-brand-border rounded w-3/4"></div>
                <div className="h-3 bg-brand-border rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-6 text-brand-text-secondary">
                <AlertTriangleIcon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="font-semibold text-lg text-yellow-400">Analysis Error</h3>
                <p className="text-sm">{error}</p>
            </div>
        );
    }
    
    if (domains.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-6 text-brand-text-secondary h-full">
          <InfoIcon className="w-12 h-12 text-brand-primary mb-4" />
          <h3 className="font-semibold text-lg text-brand-text-primary">Results Will Appear Here</h3>
          <p className="text-sm">Scan a list of domains to find hidden gems containing valuable keywords.</p>
        </div>
      );
    }

    return (
      <ul className="space-y-2">
        {domains.map((domain, index) => (
          <KeywordListItem key={domain.domain} domain={domain} rank={index + 1} />
        ))}
      </ul>
    );
  };
  
  return (
    <div className="bg-brand-surface rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-bold text-brand-text-primary mb-4 border-b border-brand-border pb-3">
        Trending Domains <span className="text-brand-text-secondary font-medium text-base">({isLoading ? '...' : domains.length})</span>
      </h2>
      <div className="max-h-[65vh] overflow-y-auto pr-2 -mr-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResultsPanel;
