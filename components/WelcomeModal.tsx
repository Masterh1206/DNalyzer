import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { LoaderIcon } from './icons.tsx';

// A MailIcon is used in this component, but to avoid circular dependencies or defining it in two places,
// we'll define a simple version here. Assuming a MailIcon exists in icons.tsx for other parts of the app.
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    // FIX: Corrected typo in viewBox attribute. The extra "24"" was breaking JSX parsing.
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);


interface WelcomeModalProps {
  onAccept: (email: string) => void;
  onLinkClick: (modal: 'privacy' | 'terms') => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onAccept, onLinkClick }) => {
  const [email, setEmail] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const formspreeUrl = 'https://formspree.io/f/xvgbngna';

    fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Successfully submitted email to Formspree:', email);
        setShowSuccess(true);
        setTimeout(() => {
          onAccept(email);
        }, 1500);
      } else {
        response.json().then(data => {
          if (data && data.errors) {
            setError(data.errors.map((error: { message: string }) => error.message).join(', '));
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        }).catch(() => {
          setError('An error occurred while submitting. Please try again.');
        });
        setIsSubmitting(false);
      }
    })
    .catch(error => {
      console.error('Error submitting email to Formspree:', error);
      setError('Could not subscribe. Please check your network and try again.');
      setIsSubmitting(false);
    });
  };
  
  const isButtonDisabled = !isTermsAccepted || !email || isSubmitting;

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-modal-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
    >
      <div 
        className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-md flex flex-col animate-modal-content-slide-up border border-brand-border"
      >
        <div className="p-6 sm:p-8 text-center">
            {showSuccess ? (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-green-400">Thank You!</h2>
                    <p className="mt-2 text-brand-text-secondary">You're on the list. Redirecting you to the app...</p>
                </div>
            ) : (
                <>
                    <h2 id="welcome-modal-title" className="text-2xl font-bold text-brand-text-primary">Welcome to the Analyzer</h2>
                    <p className="mt-2 text-brand-text-secondary">
                        Get insights and updates directly to your inbox. Please accept our policies to continue.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 text-left space-y-4">
                        <div>
                            <label htmlFor="email-subscribe" className="sr-only">Email Address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MailIcon className="h-5 w-5 text-brand-text-secondary" />
                                </div>
                                <input
                                    type="email"
                                    id="email-subscribe"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-brand-bg border border-brand-border rounded-lg p-3 pl-10 text-sm text-brand-text-primary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder:text-brand-text-secondary/60 shadow-inner"
                                    placeholder="your@email.com"
                                    required
                                    aria-describedby="email-error"
                                />
                            </div>
                            {error && <p id="email-error" className="mt-2 text-sm text-red-400">{error}</p>}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms-accept"
                                    name="terms-accept"
                                    type="checkbox"
                                    checked={isTermsAccepted}
                                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                    className="h-4 w-4 rounded border-brand-border bg-brand-bg text-brand-primary focus:ring-brand-primary"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms-accept" className="text-brand-text-secondary">
                                    I agree to the{' '}
                                    <button type="button" onClick={() => onLinkClick('terms')} className="font-medium text-brand-secondary hover:underline">Terms of Service</button>
                                    {' '}and{' '}
                                    <button type="button" onClick={() => onLinkClick('privacy')} className="font-medium text-brand-secondary hover:underline">Privacy Policy</button>.
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isButtonDisabled}
                                className="w-full flex items-center justify-center bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                        Subscribing...
                                    </>
                                ) : 'Subscribe & Continue'}
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-xs text-brand-text-secondary/70">We will never spam you. Unsubscribe at any time.</p>
                </>
            )}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default WelcomeModal;