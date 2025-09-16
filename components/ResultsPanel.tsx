import React from 'react';
import type { TrendingDomain } from '../types.ts';
import KeywordListItem from './KeywordListItem.tsx';
import { AlertTriangleIcon, InfoIcon, FileDownIcon } from './icons.tsx';

interface ResultsPanelProps {
  domains: TrendingDomain[];
  isLoading: boolean;
  error: string | null;
  onUpdateDomain: (domainName: string, update: Partial<TrendingDomain>) => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ domains, isLoading, error, onUpdateDomain }) => {

  const handleExport = () => {
    const headers = [
      "Domain",
      "Matched Trends",
      "Availability",
      "Value Score",
      "Rationale",
      "Tags"
    ];

    const rows = domains.map(d => [
      d.domain,
      d.matchedTrends.join(', '),
      d.availability || 'Not Checked',
      d.aiAnalysis?.score ?? 'N/A',
      d.aiAnalysis?.rationale.replace(/"/g, '""') ?? 'N/A', // Escape double quotes
      d.aiAnalysis?.tags.join(', ') ?? 'N/A'
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => `"${e.join('","')}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "domain_analysis_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <h3 className="font-semibold text-lg text-brand-text-primary">Analysis Failed</h3>
            <p className="mt-1">{error}</p>
        </div>
      );
    }
    
    if (domains.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-6 text-brand-text-secondary">
            <InfoIcon className="w-12 h-12 text-brand-primary mb-4" />
            <h3 className="font-semibold text-lg text-brand-text-primary">Ready to Scan</h3>
            <p className="mt-1">Paste your domain list above and click "Scan Domains" to begin.</p>
        </div>
      );
    }
    
    return (
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold text-brand-text-primary">Analysis Results</h2>
            <button
              onClick={handleExport}
              disabled={domains.length === 0}
              className="flex items-center bg-brand-surface border border-brand-border text-brand-text-secondary hover:bg-brand-bg hover:text-brand-text-primary px-3 py-1.5 rounded-md transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              <FileDownIcon className="w-4 h-4 mr-2" />
              Export CSV
            </button>
        </div>
        <ul className="space-y-2">
          {domains.map((domain, index) => (
            <KeywordListItem 
              key={domain.domain} 
              domain={domain} 
              rank={index + 1}
              onUpdateDomain={onUpdateDomain}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-brand-surface rounded-lg shadow-md p-6 border border-brand-border">
      {renderContent()}
    </div>
  );
};

export default ResultsPanel;