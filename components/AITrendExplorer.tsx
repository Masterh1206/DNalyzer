
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { LoaderIcon, SparklesIcon, AlertTriangleIcon, TrendingUpIcon, BuildingIcon } from './icons.tsx';
import TrendListItem from './TrendListItem.tsx';
import GeneratedDomainListItem from './GeneratedDomainListItem.tsx';
import { TLD_LIST } from '../constants.ts';
import { checkDomainAvailability } from '../services/domainAvailability.ts';

interface Trend {
  keyword: string;
  score: number;
}

interface AITrendExplorerProps {
  onTrendsFetched: (trends: { [key: string]: number } | null) => void;
}

const AITrendExplorer: React.FC<AITrendExplorerProps> = ({ onTrendsFetched }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [trends, setTrends] = useState<Trend[]>([]);
  
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [industry, setIndustry] = useState<string>('');
  const [selectedTlds, setSelectedTlds] = useState<string[]>(['com', 'ai', 'io']);
  const [generatedDomains, setGeneratedDomains] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [isFetchingIndustries, setIsFetchingIndustries] = useState<boolean>(false);
  const [industriesError, setIndustriesError] = useState<string | null>(null);
  const [industries, setIndustries] = useState<string[]>([]);

  const handleFetchTrends = useCallback(async () => {
    setIsFetching(true);
    setError(null);
    setTrends([]);
    setSelectedTrends([]);
    setGeneratedDomains([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const responseSchema = {
        type: Type.OBJECT, properties: { trends: { type: Type.ARRAY, description: "A list of trending keywords.", items: { type: Type.OBJECT, properties: { keyword: { type: Type.STRING, description: "The trending keyword, must be a single lowercase word." }, score: { type: Type.INTEGER, description: "A trend score from 1 to 50, representing current market value." } } } } } };
      const prompt = `You are a market trend analyst. Your task is to identify the top 20 most valuable and currently trending keywords for new domain registrations, based on the very latest world news and emerging global events. Focus on keywords that have suddenly become relevant due to recent news in technology, science, culture, and business. For each keyword, provide a 'trend score' from 1 to 50, where 50 represents the absolute highest potential and demand right now. Return the list in JSON format.`;
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, config: { responseMimeType: "application/json", responseSchema: responseSchema } });
      const parsed = JSON.parse(response.text);
      if (parsed.trends && Array.isArray(parsed.trends)) {
          const sortedTrends = parsed.trends.sort((a: Trend, b: Trend) => b.score - a.score);
          setTrends(sortedTrends);
          const trendsMap = parsed.trends.reduce((acc: { [key: string]: number }, trend: Trend) => {
            if (trend.keyword && typeof trend.score === 'number') { acc[trend.keyword.toLowerCase()] = trend.score; }
            return acc;
          }, {});
          onTrendsFetched(trendsMap);
      } else { throw new Error("Invalid response format from AI."); }
    } catch (e) {
      console.error(e);
      setError("Could not fetch AI trends. Please check your API key and try again.");
      onTrendsFetched(null);
    } finally { setIsFetching(false); }
  }, [onTrendsFetched]);

  const handleFetchIndustries = useCallback(async () => {
    setIsFetchingIndustries(true);
    setIndustriesError(null);
    setIndustries([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const responseSchema = { type: Type.OBJECT, properties: { industries: { type: Type.ARRAY, description: 'A list of 10 booming industry names.', items: { type: Type.STRING } } } };
      const prompt = `Based on real-time market data and global news, list the top 10 highest-growth, "booming" industries right now. Examples might be 'AI Drug Discovery', 'Sustainable Aviation Fuel', or 'Personalized Nutrition Platforms'. Provide only a list of industry names.`;
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, config: { responseMimeType: "application/json", responseSchema } });
      const parsed = JSON.parse(response.text);
      if (parsed.industries && Array.isArray(parsed.industries)) {
        setIndustries(parsed.industries);
      } else { throw new Error("Invalid industry data from AI."); }
    } catch (e) {
      console.error(e);
      setIndustriesError("Failed to fetch booming industries.");
    } finally {
      setIsFetchingIndustries(false);
    }
  }, []);

  const handleTrendSelect = (keyword: string) => {
    setSelectedTrends(prev => prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]);
  };
  
  const handleTldChange = (tld: string) => {
    setSelectedTlds(prev => prev.includes(tld) ? prev.filter(t => t !== tld) : [...prev, tld]);
  };

  const handleGenerateDomains = useCallback(async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedDomains([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const responseSchema = { type: Type.OBJECT, properties: { domains: { type: Type.ARRAY, items: { type: Type.STRING } } } };
      const prompt = `Generate 25 creative, brandable domain names. Each domain name must contain exactly two English words. One word should be descriptive of the trend(s): "${selectedTrends.join(', ')}". The other word must be descriptive of the industry: "${industry}". The domain names must be valuable, trendy, and descriptive. The domain names must end with one of these TLDs: ${selectedTlds.join(', ')}. The final output must be a valid JSON object with a 'domains' key containing an array of lowercase strings.`;
      const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt, config: { responseMimeType: "application/json", responseSchema } });
      const parsed = JSON.parse(response.text);
      
      if (parsed.domains && Array.isArray(parsed.domains)) {
        const rawDomains: string[] = parsed.domains;
        
        // Concurrently check availability of all generated domains.
        const availabilityChecks = rawDomains.map(domain => checkDomainAvailability(domain));
        const statuses = await Promise.all(availabilityChecks);

        // Filter for domains that are available.
        const availableDomains = rawDomains.filter((_, index) => statuses[index] === 'AVAILABLE');

        if (availableDomains.length === 0) {
            setGenerationError("AI generated some ideas, but all of them were already taken. Try different keywords or TLDs!");
        }
        
        setGeneratedDomains(availableDomains);

      } else { throw new Error("Invalid response format from AI."); }
    } catch (e) {
      console.error(e);
      setGenerationError("Could not generate domains. The AI might be busy, please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [selectedTrends, industry, selectedTlds]);
  
  return (
    <div className="animate-fade-in">
      <div className="bg-brand-surface py-16 sm:py-24 border-b border-brand-border">
        <div className="container mx-auto px-4 text-center">
            <SparklesIcon className="w-12 h-12 text-brand-secondary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight">AI Trend Explorer</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-text-secondary">Discover trending keywords and industries, then generate your next valuable domain name—all in one place.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Keywords & Generator */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-text-primary flex items-center"><TrendingUpIcon className="w-6 h-6 mr-3 text-brand-primary"/>Trending Keywords</h2>
              <button onClick={handleFetchTrends} disabled={isFetching} className="flex items-center bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 transition-colors text-sm">
                {isFetching ? <><LoaderIcon className="animate-spin mr-2 h-4 w-4" />Fetching...</> : 'Fetch Keywords'}
              </button>
            </div>
            {isFetching && <div className="grid grid-cols-1 md:grid-cols-2 gap-2">{[...Array(6)].map((_, i) => <div key={i} className="animate-pulse h-16 bg-brand-bg rounded-lg"></div>)}</div>}
            {error && <p className="text-red-400 text-center">{error}</p>}
            {!isFetching && !error && trends.length > 0 && 
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {trends.map((trend, index) => <TrendListItem key={trend.keyword} rank={index + 1} keyword={trend.keyword} score={trend.score} isSelected={selectedTrends.includes(trend.keyword)} onClick={() => handleTrendSelect(trend.keyword)} />)}
              </ul>
            }
          </div>
          
          {selectedTrends.length > 0 && (
            <div className="bg-brand-surface rounded-lg p-6 border border-brand-border animate-fade-in">
              <h2 className="text-xl font-bold text-brand-text-primary mb-4">Domain Generator</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-brand-text-secondary mb-1">Enter or Select an Industry</label>
                  <input type="text" id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full bg-brand-bg border border-brand-border rounded-md p-2 text-sm" placeholder="e.g., SaaS, Health, Fintech" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-text-secondary mb-2">Select TLDs</label>
                  <div className="flex flex-wrap gap-2">
                    {TLD_LIST.slice(0, 10).map(tld => (
                      <button key={tld} onClick={() => handleTldChange(tld)} className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedTlds.includes(tld) ? 'bg-brand-primary border-brand-primary text-white' : 'bg-brand-bg border-brand-border hover:border-brand-primary/50'}`}>.{tld}</button>
                    ))}
                  </div>
                </div>
                <button onClick={handleGenerateDomains} disabled={isGenerating || !industry} className="w-full flex items-center justify-center bg-brand-secondary text-white font-bold py-2.5 px-4 rounded-md hover:bg-violet-500 disabled:opacity-50 transition-colors">
                  {isGenerating ? <><LoaderIcon className="animate-spin mr-2 h-5 w-5" />Generating & Verifying...</> : <><SparklesIcon className="mr-2 h-5 w-5" />Generate Available Domains</>}
                </button>
              </div>
              {isGenerating && <div className="space-y-2 mt-4">{[...Array(5)].map((_, i) => <div key={i} className="animate-pulse h-12 bg-brand-bg rounded-lg"></div>)}</div>}
              {generationError && <p className="text-red-400 text-center mt-4">{generationError}</p>}
              {generatedDomains.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {generatedDomains.map(domain => <GeneratedDomainListItem key={domain} domain={domain} initialStatus="AVAILABLE" />)}
                </ul>
              )}
            </div>
          )}
        </div>
        
        {/* Right Column: Industries */}
        <div className="lg:col-span-5">
          <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-brand-text-primary flex items-center"><BuildingIcon className="w-6 h-6 mr-3 text-brand-primary"/>Booming Industries</h2>
              <button onClick={handleFetchIndustries} disabled={isFetchingIndustries} className="flex items-center bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 transition-colors text-sm">
                {isFetchingIndustries ? <><LoaderIcon className="animate-spin mr-2 h-4 w-4" />Fetching...</> : 'Fetch Industries'}
              </button>
            </div>
            {isFetchingIndustries && <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="animate-pulse h-8 bg-brand-bg rounded-lg"></div>)}</div>}
            {industriesError && <p className="text-red-400 text-center">{industriesError}</p>}
            {!isFetchingIndustries && !industriesError && industries.length > 0 && 
              <ul className="space-y-2">
                {industries.map((ind, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setIndustry(ind)}
                      className={`w-full text-left bg-brand-bg p-3 rounded-md text-brand-text-primary text-sm transition-colors hover:bg-brand-primary/20 ${industry === ind ? 'ring-2 ring-brand-primary' : ''}`}
                    >
                      {ind}
                    </button>
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITrendExplorer;
