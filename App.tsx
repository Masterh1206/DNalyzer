
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header.tsx';
import DomainInput from './components/DomainInput.tsx';
import ResultsPanel from './components/ResultsPanel.tsx';
import Footer from './components/Footer.tsx';
import Modal from './components/Modal.tsx';
import WelcomeModal from './components/WelcomeModal.tsx';
import AboutContent from './components/content/AboutContent.tsx';
import ContactContent from './components/content/ContactContent.tsx';
import PrivacyContent from './components/content/PrivacyContent.tsx';
import TermsContent from './components/content/TermsContent.tsx';
import { analyzeDomains } from './services/domainAnalyzer.ts';
import type { TrendingDomain } from './types.ts';
import { SAMPLE_DOMAINS } from './constants.ts';
import { LightbulbIcon, ClockIcon, SparklesIcon, TrendingUpIcon, ScanIcon } from './components/icons.tsx';
import AITrendExplorer from './components/AITrendExplorer.tsx';

type ModalType = 'about' | 'contact' | 'privacy' | 'terms';
type ViewType = 'analyzer' | 'trends';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(SAMPLE_DOMAINS);
  const [trendingDomains, setTrendingDomains] = useState<TrendingDomain[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiTrends, setAiTrends] = useState<{ [key: string]: number } | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ViewType>('analyzer');

  useEffect(() => {
    try {
        const hasAccepted = localStorage.getItem('hasAcceptedWelcome');
        if (!hasAccepted) {
            setShowWelcomeModal(true);
        }
    } catch (error) {
        console.error("Could not access localStorage:", error);
        setShowWelcomeModal(false);
    }
  }, []);


  const handleAnalysis = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setTrendingDomains([]);

    setTimeout(() => {
      try {
        if (!inputText.trim()) {
          setError("Input text cannot be empty.");
          setIsLoading(false);
          return;
        }
        // Use AI trends if available
        const results = analyzeDomains(inputText, aiTrends);
        if (results.length === 0) {
            setError("No domains containing trend keywords were found.");
        } else {
            setTrendingDomains(results);
        }
      } catch (e) {
        setError("An unexpected error occurred during analysis.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Simulate processing time
  }, [inputText, aiTrends]);

  const handleTrendsFetched = (trends: { [key: string]: number } | null) => {
    setAiTrends(trends);
    // Trends are now available for the analyzer, but we stay on the trends view.
  };
  
  const handleModalOpen = (modal: ModalType) => setActiveModal(modal);
  
  const handleWelcomeAccept = (email: string) => {
    console.log(`User subscribed with email: ${email}. NOTE: This is a simulation. No email is actually collected or stored.`);
    try {
        localStorage.setItem('hasAcceptedWelcome', 'true');
    } catch (error) {
         console.error("Could not write to localStorage:", error);
    }
    setShowWelcomeModal(false);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'about': return <AboutContent />;
      case 'contact': return <ContactContent />;
      case 'privacy': return <PrivacyContent />;
      case 'terms': return <TermsContent />;
      default: return null;
    }
  };
  
  const getModalTitle = () => {
    switch (activeModal) {
      case 'about': return "About Domain Trend Analyzer";
      case 'contact': return "Contact Us";
      case 'privacy': return "Privacy Policy";
      case 'terms': return "Terms of Service";
      default: return "";
    }
  };
  
  const showResults = !isLoading && !error && trendingDomains.length > 0;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Header 
        onLinkClick={handleModalOpen}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <main className="flex-grow">
        
        {activeView === 'analyzer' ? (
            <>
                <DomainInput 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onAnalyze={handleAnalysis}
                isLoading={isLoading}
                aiTrends={aiTrends}
                />

                <div className="container mx-auto px-4 py-8 sm:py-12">
                    {(isLoading || error || showResults) && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                            <div className="lg:col-span-8 lg:col-start-3">
                                <ResultsPanel 
                                domains={trendingDomains} 
                                isLoading={isLoading}
                                error={error}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </>
        ) : (
            <AITrendExplorer onTrendsFetched={handleTrendsFetched} />
        )}
        
        {activeView === 'analyzer' && (
            <>
                <section className="py-12 sm:py-16 bg-brand-surface/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-brand-text-primary tracking-tight">How It Works</h2>
                        <p className="mt-4 text-lg text-brand-text-secondary">
                            Unlock valuable domain insights in three simple steps.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center text-brand-text-secondary mt-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center">
                            <div className="bg-brand-primary/10 text-brand-primary rounded-full p-4 mb-4">
                                <TrendingUpIcon className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl text-brand-text-primary mb-2">1. Explore & Generate</h3>
                            <p>Visit the AI Trend Explorer to discover high-value keywords and generate creative domain names from them instantly.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-brand-primary/10 text-brand-primary rounded-full p-4 mb-4">
                                <ScanIcon className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl text-brand-text-primary mb-2">2. Analyze Domains</h3>
                            <p>Paste your own domain list into the Analyzer to find matches against the powerful AI-generated trends.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-brand-primary/10 text-brand-primary rounded-full p-4 mb-4">
                                <LightbulbIcon className="w-8 h-8" />
                            </div>
                            <h3 className="font-semibold text-xl text-brand-text-primary mb-2">3. Validate Ideas</h3>
                            <p>Use the built-in availability checker on any generated or analyzed domain to see if it's ready to register.</p>
                        </div>
                    </div>
                </div>
                </section>
                
                <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-brand-text-primary tracking-tight">Why Choose Us?</h2>
                        <p className="mt-4 text-lg text-brand-text-secondary">
                            Gain a competitive edge in the domain market with powerful, easy-to-use features.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
                        <div className="bg-brand-surface p-6 rounded-lg">
                        <SparklesIcon className="w-8 h-8 text-brand-secondary mb-3"/>
                        <h3 className="font-semibold text-lg text-brand-text-primary mb-1">AI-Powered Insights</h3>
                        <p className="text-brand-text-secondary text-sm">Fetch real-time trending keywords using Google's Gemini AI to stay ahead of market shifts and identify opportunities first.</p>
                        </div>
                        <div className="bg-brand-surface p-6 rounded-lg">
                        <ClockIcon className="w-8 h-8 text-brand-secondary mb-3"/>
                        <h3 className="font-semibold text-lg text-brand-text-primary mb-1">Save Time & Effort</h3>
                        <p className="text-brand-text-secondary text-sm">Instantly scan hundreds of domains from any source, eliminating hours of manual research and tedious spreadsheet work.</p>
                        </div>
                        <div className="bg-brand-surface p-6 rounded-lg">
                        <LightbulbIcon className="w-8 h-8 text-brand-secondary mb-3"/>
                        <h3 className="font-semibold text-lg text-brand-text-primary mb-1">Boost Creativity</h3>
                        <p className="text-brand-text-secondary text-sm">Overcome creative blocks with the AI Domain Generator, which turns your discovered keywords into unique, brandable names.</p>
                        </div>
                    </div>
                </div>
                </section>
            </>
        )}

      </main>
      <Footer onLinkClick={handleModalOpen} />
      {showWelcomeModal && (
        <WelcomeModal 
            onAccept={handleWelcomeAccept} 
            onLinkClick={handleModalOpen} 
        />
      )}
      {activeModal && (
        <Modal title={getModalTitle()} onClose={() => setActiveModal(null)}>
            {renderModalContent()}
        </Modal>
      )}
    </div>
  );
};

export default App;
