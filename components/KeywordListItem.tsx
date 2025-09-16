import React, { useState, useEffect } from 'react';
import type { TrendingDomain, AIAnalysisResult } from '../types.ts';
import { checkDomainAvailability } from '../services/domainAvailability.ts';
import { REGISTRAR_URLS } from '../constants.ts';
import { GoogleGenAI, Type } from "@google/genai";
import { ZapIcon, CheckIcon, GlobeIcon, LoaderIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon, AlertTriangleIcon } from './icons.tsx';

interface KeywordListItemProps {
  domain: TrendingDomain;
  rank: number;
  onUpdateDomain: (domainName: string, update: Partial<TrendingDomain>) => void;
}

const AnalysisDetails: React.FC<{ analysis: AIAnalysisResult }> = ({ analysis }) => {
  const scoreColor = analysis.score >= 75 ? 'text-green-400' : analysis.score >= 50 ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="mt-4 pl-9 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center justify-center bg-brand-bg/70 p-4 rounded-lg border border-brand-border">
          <p className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider">Value Score</p>
          <p className={`text-4xl font-bold mt-1 ${scoreColor}`}>{analysis.score}<span className="text-2xl text-brand-text-secondary">/100</span></p>
        </div>
        <div className="md:col-span-2 bg-brand-bg/70 p-4 rounded-lg border border-brand-border">
          <p className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-2">Rationale</p>
          <p className="text-brand-text-secondary">{analysis.rationale}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {analysis.tags.map(tag => (
          <span key={tag} className="bg-brand-secondary/10 text-brand-secondary text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
};


const KeywordListItem: React.FC<KeywordListItemProps> = ({ domain, rank, onUpdateDomain }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false);

  useEffect(() => {
    // Automatically show analysis when it becomes available
    if (domain.aiAnalysis && !isAnalysisVisible) {
      setIsAnalysisVisible(true);
    }
  }, [domain.aiAnalysis, isAnalysisVisible]);

  const handleCheck = async () => {
    setIsChecking(true);
    const result = await checkDomainAvailability(domain.domain);
    onUpdateDomain(domain.domain, { availability: result });
    setIsChecking(false);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "A value score from 1 to 100." },
                rationale: { type: Type.STRING, description: "A brief, 1-2 sentence explanation for the score." },
                tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 2-4 relevant string tags from this list: 'Brandable', 'Keyword-rich', 'Premium TLD', 'Short', 'SEO-Friendly', 'Memorable', 'Modern'." }
            },
            required: ['score', 'rationale', 'tags']
        };

        const prompt = `You are a domain valuation expert. Analyze the domain name "${domain.domain}". Consider brandability, memorability, length, keyword value (based on current trends), TLD type (.com, .ai, .io are premium), and overall market appeal. Provide your analysis in a JSON object with 'score', 'rationale', and 'tags' keys.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const analysisResult: AIAnalysisResult = JSON.parse(response.text);
        onUpdateDomain(domain.domain, { aiAnalysis: analysisResult });

    } catch (e) {
        console.error("AI Analysis Error:", e);
        setAnalysisError("AI analysis failed. Please try again.");
    } finally {
        setIsAnalyzing(false);
    }
  };
  
  const rankColor = rank <= 3 ? 'text-amber-400' : rank <= 10 ? 'text-indigo-400' : 'text-brand-text-secondary';
  
  const RegistrarLinks: React.FC = () => (
    <div className="flex items-center space-x-3 text-brand-text-secondary animate-fade-in">
        <a href={`${REGISTRAR_URLS.namecheap}${domain.domain}`} target="_blank" rel="noopener noreferrer" title="Check on Namecheap" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
        <a href={`${REGISTRAR_URLS.godaddy}${domain.domain}`} target="_blank" rel="noopener noreferrer" title="Check on GoDaddy" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
        <a href={`${REGISTRAR_URLS.namebio}${domain.domain}`} target="_blank" rel="noopener noreferrer" title="Check on NameBio" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
        <a href={`${REGISTRAR_URLS.unstoppable}${domain.domain}`} target="_blank" rel="noopener noreferrer" title="Check on Unstoppable" className="hover:text-brand-primary"><GlobeIcon className="w-4 h-4" /></a>
    </div>
  );

  const AvailabilityDisplay: React.FC = () => {
    if (isChecking) {
      return <div className="flex items-center text-xs text-brand-text-secondary px-3 py-1.5"><LoaderIcon className="w-4 h-4 mr-1.5 animate-spin" />Checking...</div>;
    }
    switch (domain.availability) {
      case 'AVAILABLE': return <div className="text-sm font-bold text-green-400 px-3 py-1.5">Available</div>;
      case 'TAKEN': return <div className="text-sm font-bold text-red-400 px-3 py-1.5">Taken</div>;
      case 'ERROR': return <div className="text-sm font-bold text-gray-500 px-3 py-1.5">Error</div>;
      default:
        return (
          <button onClick={handleCheck} className="flex items-center justify-center bg-brand-primary/10 text-brand-secondary hover:bg-brand-primary/20 hover:text-white px-3 py-1.5 rounded-md transition-colors text-xs font-semibold">
            <CheckIcon className="w-4 h-4 mr-1.5" />Check
          </button>
        );
    }
  };

  return (
    <li className="bg-brand-bg/50 p-3 rounded-md transition-all duration-200 ease-in-out hover:bg-brand-bg border border-transparent hover:border-brand-border">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 overflow-hidden">
          <span className={`text-sm font-bold w-6 text-center mt-1 ${rankColor}`}>#{rank}</span>
          <div className="flex-1 overflow-hidden">
            <span className="font-semibold text-brand-text-primary break-words">{domain.domain}</span>
            <div className="flex items-center flex-wrap gap-2 text-xs text-brand-text-secondary mt-1">
              {domain.matchedTrends.map(trend => (
                <span key={trend} className="flex items-center bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded-full font-medium">
                  <ZapIcon className="w-3 h-3 mr-1 flex-shrink-0" />{trend}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
            <AvailabilityDisplay />
            <button onClick={handleAnalyze} disabled={isAnalyzing} className="flex items-center justify-center bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20 hover:text-white px-3 py-1.5 rounded-md transition-colors text-xs font-semibold disabled:opacity-50">
                {isAnalyzing ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <SparklesIcon className="w-4 h-4" />}
            </button>
            {domain.aiAnalysis && (
                <button onClick={() => setIsAnalysisVisible(v => !v)} className="p-1.5 rounded-md hover:bg-brand-bg text-brand-text-secondary">
                    {isAnalysisVisible ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                </button>
            )}
        </div>
      </div>
      
      {domain.availability && !isChecking &&
        <div className="mt-3 pl-9">
            <RegistrarLinks />
        </div>
      }
      
      {isAnalyzing && <div className="mt-4 pl-9 text-sm text-brand-text-secondary">Analyzing with AI...</div>}
      {analysisError && <div className="mt-4 pl-9 text-sm text-red-400 flex items-center"><AlertTriangleIcon className="w-4 h-4 mr-2"/>{analysisError}</div>}
      
      {isAnalysisVisible && domain.aiAnalysis && <AnalysisDetails analysis={domain.aiAnalysis} />}
    </li>
  );
};

export default KeywordListItem;