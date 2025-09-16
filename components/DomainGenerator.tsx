
import React, { useState, useMemo, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { TrendingDomain, AvailabilityStatus } from '../types.ts';
import { checkDomainAvailability } from '../services/domainAvailability.ts';
import { REGISTRAR_URLS } from '../constants.ts';
import { BrainCircuitIcon, SparklesIcon, LoaderIcon, AlertTriangleIcon, GlobeIcon, CheckIcon } from './icons.tsx';

interface DomainGeneratorProps {
  trendingDomains: TrendingDomain[];
  isLoading: boolean;
}

const GeneratedDomainItem: React.FC<{ domain: string }> = ({ domain }) => {
    const [status, setStatus] = useState<AvailabilityStatus>('IDLE');
    
    const handleCheck = async () => {
        setStatus('CHECKING');
        const result = await checkDomainAvailability(domain);
        setStatus(result);
    };

    const namecheapUrl = `${REGISTRAR_URLS.namecheap}${domain}`;
    const godaddyUrl = `${REGISTRAR_URLS.godaddy}${domain}`;
    const unstoppableUrl = `${REGISTRAR_URLS.unstoppable}${domain}`;

    const StatusDisplay: React.FC = () => {
        switch (status) {
            case 'IDLE':
                return (
                    <button onClick={handleCheck} className="text-xs font-semibold flex items-center p-1.5 rounded-md bg-brand-bg hover:bg-brand-primary/20 text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                        <CheckIcon className="w-3.5 h-3.5 mr-1"/> Check
                    </button>
                );
            case 'CHECKING':
                return (
                    <div className="text-xs flex items-center p-1.5 text-brand-text-secondary">
                        <LoaderIcon className="w-3.5 h-3.5 mr-1 animate-spin"/> Checking...
                    </div>
                );
            case 'AVAILABLE': return <span className="text-xs font-bold text-green-400 p-1.5">Available</span>;
            case 'TAKEN': return <span className="text-xs font-bold text-red-400 p-1.5">Taken</span>;
            case 'ERROR': return <span className="text-xs font-bold text-gray-500 p-1.5">Error</span>;
            default: return null;
        }
    };
    
    return (
        <li className="bg-brand-bg/50 p-3 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between transition-all duration-200 ease-in-out hover:bg-brand-bg border border-transparent hover:border-brand-border group">
            <span className="font-mono text-sm text-brand-text-primary break-all">{domain}</span>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0 sm:pl-4">
                <StatusDisplay />
                {(status === 'AVAILABLE' || status === 'TAKEN' || status === 'ERROR') && (
                    <div className="flex items-center space-x-2 text-brand-text-secondary animate-fade-in">
                        <a href={namecheapUrl} target="_blank" rel="noopener noreferrer" title="Check on Namecheap" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
                        <a href={godaddyUrl} target="_blank" rel="noopener noreferrer" title="Check on GoDaddy" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
                        <a href={unstoppableUrl} target="_blank" rel="noopener noreferrer" title="Check on Unstoppable" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
                    </div>
                )}
            </div>
        </li>
    );
};


const DomainGenerator: React.FC<DomainGeneratorProps> = ({ trendingDomains, isLoading }) => {
  const [generatedDomains, setGeneratedDomains] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uniqueKeywords = useMemo(() => {
    const allKeywords = trendingDomains.flatMap(d => d.matchedTrends);
    return [...new Set(allKeywords)];
  }, [trendingDomains]);

  const handleGenerate = useCallback(async () => {
    if (uniqueKeywords.length === 0) {
        setError("No keywords to generate domains from. Please scan first.");
        return;
    }
    setIsGenerating(true);
    setError(null);
    setGeneratedDomains([]);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                domains: {
                    type: Type.ARRAY,
                    description: 'A list of generated domain name strings. Should be lowercase.',
                    items: {
                        type: Type.STRING
                    },
                },
            },
        };

        const prompt = `Based on these trending keywords: ${uniqueKeywords.join(', ')}. Generate a list of 20 creative, brandable, and likely available domain names. The domains should be relevant for tech startups, SaaS products, or modern web projects. Combine the keywords, add prefixes or suffixes, and be creative. Include TLDs like .com, .ai, .io, and .dev. The output must be a JSON object with a 'domains' key containing an array of strings.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const parsed = JSON.parse(response.text);

        if (parsed.domains && Array.isArray(parsed.domains)) {
            setGeneratedDomains(parsed.domains);
        } else {
            throw new Error("Invalid response format from AI.");
        }

    } catch (e) {
        console.error(e);
        setError("Could not generate domains. The AI might be busy, please try again.");
        setGeneratedDomains([]);
    } finally {
        setIsGenerating(false);
    }
  }, [uniqueKeywords]);

  const renderContent = () => {
    if (isGenerating) {
        return (
            <div className="space-y-3 mt-4">
            {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center bg-brand-bg/50 p-4 rounded-md">
                    <div className="h-4 bg-brand-border rounded w-2/3"></div>
                </div>
            ))}
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-6 mt-4 text-brand-text-secondary bg-brand-bg/50 rounded-md">
                <AlertTriangleIcon className="w-10 h-10 text-yellow-500 mb-3" />
                <h3 className="font-semibold text-md text-yellow-400">Generation Failed</h3>
                <p className="text-sm">{error}</p>
            </div>
        );
    }
    if (generatedDomains.length > 0) {
        return (
            <div className="mt-4 animate-fade-in">
                <h3 className="text-sm font-semibold text-brand-text-secondary mb-2">Generated Ideas:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {generatedDomains.map(domain => (
                        <GeneratedDomainItem key={domain} domain={domain} />
                    ))}
                </ul>
            </div>
        )
    }
    return null; // No content if not generating, no error, and no results
  };

  if (trendingDomains.length === 0 && !isLoading && !error) {
    return (
      <div className="bg-brand-surface rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
        <BrainCircuitIcon className="w-16 h-16 text-brand-primary/50 mb-4" />
        <h2 className="text-xl font-bold text-brand-text-primary mb-2">AI Domain Generator</h2>
        <p className="text-brand-text-secondary max-w-xs">Unlock New Ideas. Once you scan a list, the best keywords will appear here, ready to fuel the AI generator.</p>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border-b border-brand-border pb-3 mb-4">
        <div className="flex items-center space-x-3">
          <BrainCircuitIcon className="w-8 h-8 text-brand-primary flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-brand-text-primary">AI Domain Generator</h2>
            <p className="text-sm text-brand-text-secondary">Generate ideas from trending keywords.</p>
          </div>
        </div>
        <button
            onClick={handleGenerate}
            disabled={isGenerating || uniqueKeywords.length === 0}
            className="flex mt-4 sm:mt-0 items-center justify-center bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out w-full sm:w-auto"
        >
            {isGenerating ? (
                <>
                    <LoaderIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Generating...
                </>
            ) : (
                <>
                    <SparklesIcon className="mr-2 h-5 w-5" />
                    Generate Ideas
                </>
            )}
        </button>
      </div>
      
      <div>
        <h3 className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Source Keywords:</h3>
        <div className="flex flex-wrap gap-2">
            {uniqueKeywords.map(keyword => (
                <span key={keyword} className="bg-brand-bg border border-brand-border text-brand-secondary text-xs font-medium px-2.5 py-1 rounded-full">
                    {keyword}
                </span>
            ))}
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default DomainGenerator;
