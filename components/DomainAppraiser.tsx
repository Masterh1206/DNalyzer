
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { LoaderIcon, SparklesIcon, ScaleIcon, AlertTriangleIcon } from './icons.tsx';

const AppraisalResult: React.FC<{ result: string }> = ({ result }) => {
  // A simple regex-based parser to find and replace markdown-style bold tags (**text**) with <strong> elements.
  const parts = result.split(/(\*\*.*?\*\*)/g);

  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none text-brand-text-secondary prose-headings:text-brand-text-primary prose-strong:text-brand-text-primary whitespace-pre-wrap font-sans">
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </div>
  );
};


const DomainAppraiser: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [appraisal, setAppraisal] = useState<string | null>(null);
  const [isAppraising, setIsAppraising] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAppraise = useCallback(async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name.');
      return;
    }
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain.trim())) {
      setError('Please enter a valid domain name format.');
      return;
    }

    setIsAppraising(true);
    setError(null);
    setAppraisal(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const prompt = `You are a senior domain name appraiser specializing in aftermarket valuations. Act as if you are providing a professional domain bin appraisal similar to DNrater.com.

For the domain name "${domain.trim()}", deliver a complete appraisal that includes the following sections, precisely in this format:

1. **Domain Overview**
   - Length, word count, extension quality (.com, .net, .org, etc.)
   - Ease of spelling, pronunciation, memorability
   - Brandability and commercial use potential

2. **Market Factors**
   - Industry relevance and search demand
   - Keyword strength and CPC/SEO potential
   - Global vs local market appeal
   - Liquidity (how easily it could be sold)

3. **Comparable Sales**
   - At least 2–3 similar domains with reported sales (from NameBio-style data if possible)
   - Brief comparison explaining why those sales are relevant

4. **Final Appraisal**
   - Estimated wholesale value range (quick sale to investors)
   - Estimated retail/end-user value range
   - Confidence level (High, Medium, Low)

Output the final report using the following format for each section header and the final appraisal line. Use markdown for bolding.

**Domain:** ${domain.trim()}
**Overview:**
**Market Factors:**
**Comparable Sales:**
**Final Appraisal:** Wholesale [$X–$Y], Retail [$X–$Y], Confidence: [level]

The tone must be professional, concise, and data-driven, exactly like an appraisal report. Do not add any conversational text or introductions outside of this format.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setAppraisal(response.text);

    } catch (e) {
      console.error("AI Appraisal Error:", e);
      setError("AI appraisal failed. The model may be busy or the domain is too obscure. Please try again.");
    } finally {
      setIsAppraising(false);
    }
  }, [domain]);

  return (
    <div className="animate-fade-in">
      <div className="bg-brand-surface py-16 sm:py-24 border-b border-brand-border">
        <div className="container mx-auto px-4 text-center">
            <ScaleIcon className="w-12 h-12 text-brand-secondary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight">AI Domain Appraiser</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-text-secondary">Get a professional, data-driven valuation for any domain name, powered by AI.</p>
            <div className="max-w-xl mx-auto mt-8 flex flex-col sm:flex-row items-center gap-2">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full flex-grow bg-brand-bg border border-brand-border rounded-md p-3 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder:text-brand-text-secondary/60 shadow-inner"
                    placeholder="Enter domain to appraise, e.g., example.com"
                    disabled={isAppraising}
                    aria-label="Domain to appraise"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAppraise(); }}
                />
                <button
                    onClick={handleAppraise}
                    disabled={isAppraising || !domain.trim()}
                    className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
                >
                    {isAppraising ? (
                        <>
                            <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
                            Appraising...
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="mr-2 h-5 w-5" />
                            Appraise Domain
                        </>
                    )}
                </button>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {isAppraising && (
            <div className="bg-brand-surface rounded-lg shadow-md p-6 border border-brand-border animate-pulse">
              <div className="h-6 bg-brand-border rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-brand-border rounded w-full"></div>
                <div className="h-4 bg-brand-border rounded w-5/6"></div>
                <div className="h-4 bg-brand-border rounded w-full"></div>
                <div className="h-4 bg-brand-border rounded w-3/4"></div>
              </div>
              <div className="h-6 bg-brand-border rounded w-1/4 my-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-brand-border rounded w-full"></div>
                <div className="h-4 bg-brand-border rounded w-4/6"></div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center text-center p-6 text-brand-text-secondary bg-brand-surface rounded-lg border border-yellow-500/30">
                <AlertTriangleIcon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="font-semibold text-lg text-brand-text-primary">Appraisal Failed</h3>
                <p className="mt-1">{error}</p>
            </div>
          )}
          {appraisal && (
            <div className="bg-brand-surface rounded-lg shadow-md p-8 border border-brand-border animate-fade-in">
              <AppraisalResult result={appraisal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainAppraiser;
