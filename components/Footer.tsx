import React from 'react';

interface FooterProps {
  onLinkClick: (modal: 'about' | 'contact' | 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const linkStyles = "cursor-pointer text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors";

  return (
    <footer className="bg-brand-surface border-t border-brand-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="font-bold text-brand-text-primary">Domain Trend Analyzer</p>
                <p className="text-sm text-brand-text-secondary">
                    &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
                 <p className="text-sm text-brand-text-secondary mt-1">
                    Made with ❤️ by Hamza Hallou
                </p>
            </div>
            <nav className="flex items-center space-x-4 sm:space-x-6">
            <button onClick={() => onLinkClick('about')} className={linkStyles}>About</button>
            <button onClick={() => onLinkClick('contact')} className={linkStyles}>Contact</button>
            <button onClick={() => onLinkClick('privacy')} className={linkStyles}>Privacy Policy</button>
            <button onClick={() => onLinkClick('terms')} className={linkStyles}>Terms of Service</button>
            </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
