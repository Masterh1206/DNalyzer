
import React, { useState } from 'react';
import type { AvailabilityStatus } from '../types.ts';
import { checkDomainAvailability } from '../services/domainAvailability.ts';
import { REGISTRAR_URLS } from '../constants.ts';
import { GlobeIcon, CheckIcon, LoaderIcon } from './icons.tsx';

interface GeneratedDomainListItemProps {
  domain: string;
  initialStatus?: AvailabilityStatus;
}

const GeneratedDomainListItem: React.FC<GeneratedDomainListItemProps> = ({ domain, initialStatus = 'IDLE' }) => {
    const [status, setStatus] = useState<AvailabilityStatus>(initialStatus);
    
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

export default GeneratedDomainListItem;
