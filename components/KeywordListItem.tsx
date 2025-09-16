import React, { useState } from 'react';
import type { TrendingDomain, AvailabilityStatus } from '../types.ts';
import { checkDomainAvailability } from '../services/domainAvailability.ts';
import { REGISTRAR_URLS } from '../constants.ts';
import { ZapIcon, CheckIcon, GlobeIcon, LoaderIcon } from './icons.tsx';

interface KeywordListItemProps {
  domain: TrendingDomain;
  rank: number;
}

const KeywordListItem: React.FC<KeywordListItemProps> = ({ domain, rank }) => {
  const [status, setStatus] = useState<AvailabilityStatus>('IDLE');

  const handleCheck = async () => {
    setStatus('CHECKING');
    const result = await checkDomainAvailability(domain.domain);
    setStatus(result);
  };

  const namecheapUrl = `${REGISTRAR_URLS.namecheap}${domain.domain}`;
  const godaddyUrl = `${REGISTRAR_URLS.godaddy}${domain.domain}`;
  const namebioUrl = `${REGISTRAR_URLS.namebio}${domain.domain}`;
  const unstoppableUrl = `${REGISTRAR_URLS.unstoppable}${domain.domain}`;


  const rankColor = rank <= 3 ? 'text-amber-400' : rank <= 10 ? 'text-indigo-400' : 'text-brand-text-secondary';

  const StatusDisplay: React.FC = () => {
    switch (status) {
      case 'IDLE':
        return (
          <button
            onClick={handleCheck}
            className="flex items-center justify-center bg-brand-primary/10 text-brand-secondary hover:bg-brand-primary/20 hover:text-white px-3 py-1.5 rounded-md transition-colors text-xs font-semibold"
            aria-label={`Check domain availability for ${domain.domain}`}
          >
            <CheckIcon className="w-4 h-4 mr-1.5" />
            Check
          </button>
        );
      case 'CHECKING':
        return (
          <div className="flex items-center text-xs text-brand-text-secondary px-3 py-1.5">
            <LoaderIcon className="w-4 h-4 mr-1.5 animate-spin" />
            Checking...
          </div>
        );
      case 'AVAILABLE':
        return <div className="text-sm font-bold text-green-400 px-3 py-1.5">Available</div>;
      case 'TAKEN':
        return <div className="text-sm font-bold text-red-400 px-3 py-1.5">Taken</div>;
      case 'ERROR':
        return <div className="text-sm font-bold text-gray-500 px-3 py-1.5">Error</div>;
      default:
        return null;
    }
  };


  return (
    <li className="bg-brand-bg/50 p-3 rounded-md transition-all duration-200 ease-in-out hover:bg-brand-bg border border-transparent hover:border-brand-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className={`text-sm font-bold w-6 text-center ${rankColor}`}>#{rank}</span>
          <div className="flex-1 overflow-hidden">
            <span className="font-semibold text-brand-text-primary break-words">{domain.domain}</span>
            <div className="flex items-center flex-wrap gap-2 text-xs text-brand-text-secondary mt-1">
              {domain.matchedTrends.map(trend => (
                <span key={trend} className="flex items-center bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded-full font-medium">
                  <ZapIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                  {trend}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <StatusDisplay />
        </div>
      </div>
      {(status === 'AVAILABLE' || status === 'TAKEN' || status === 'ERROR') && (
        <div className="mt-3 pl-9 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 animate-fade-in">
          <a href={namecheapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-brand-text-secondary hover:text-brand-primary transition-colors">
            <GlobeIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> Namecheap
          </a>
          <a href={godaddyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-brand-text-secondary hover:text-brand-primary transition-colors">
            <GlobeIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> GoDaddy
          </a>
          <a href={namebioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-brand-text-secondary hover:text-brand-primary transition-colors">
            <GlobeIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> NameBio
          </a>
           <a href={unstoppableUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-brand-text-secondary hover:text-brand-primary transition-colors">
            <GlobeIcon className="w-4 h-4 mr-1.5 flex-shrink-0" /> Unstoppable
          </a>
        </div>
      )}
    </li>
  );
};

export default KeywordListItem;
