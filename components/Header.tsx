
import React from 'react';
import { DnaIcon } from './icons.tsx';

interface HeaderProps {
  onLinkClick: (modal: 'about' | 'contact' | 'privacy' | 'terms') => void;
  activeView: 'analyzer' | 'trends';
  onViewChange: (view: 'analyzer' | 'trends') => void;
}

const Header: React.FC<HeaderProps> = ({ onLinkClick, activeView, onViewChange }) => {
  const linkStyles = "text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors";

  const getButtonClass = (view: 'analyzer' | 'trends') => {
    const baseClasses = "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-surface";
    if (activeView === view) {
      return `${baseClasses} bg-brand-primary text-white shadow-md`;
    }
    return `${baseClasses} text-brand-text-secondary hover:bg-brand-bg`;
  };

  return (
    <header className="bg-brand-bg/80 backdrop-blur-sm sticky top-0 z-40 border-b border-brand-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <DnaIcon className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-brand-text-primary tracking-tight hidden sm:inline">
              Domain Trend Analyzer
            </span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-brand-surface p-1 rounded-full border border-brand-border">
            <button 
              onClick={() => onViewChange('analyzer')}
              className={getButtonClass('analyzer')}
              aria-pressed={activeView === 'analyzer'}
            >
              Analyzer
            </button>
            <button 
              onClick={() => onViewChange('trends')}
              className={getButtonClass('trends')}
              aria-pressed={activeView === 'trends'}
            >
              AI Trends
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => onLinkClick('about')} className={linkStyles}>About</button>
            <button onClick={() => onLinkClick('privacy')} className={linkStyles}>Privacy</button>
            <button onClick={() => onLinkClick('terms')} className={linkStyles}>Terms</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
