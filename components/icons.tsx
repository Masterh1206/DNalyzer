
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const DnaIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14.01s3.43-1.03 3.43-4.01c0-2.23-1.5-3-1.5-3" />
    <path d="M20 14.01s-3.43-1.03-3.43-4.01c0-2.23 1.5-3 1.5-3" />
    <path d="M8.5 16.5s3.43 1.03 3.43 4.01c0 2.23-1.5 3-1.5 3" />
    <path d="M15.5 16.5s-3.43 1.03-3.43 4.01c0 2.23 1.5 3 1.5 3" />
    <path d="M7 10h1" />
    <path d="M16 10h1" />
    <path d="M11 4h1" />
    <path d="m12 12-1-1" />
    <path d="m13 13 1 1" />
    <path d="M11 20h1" />
  </svg>
);

export const ScanIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M7 12a5 5 0 0 1 5-5" />
    <path d="M12 17a5 5 0 0 1-5-5" />
  </svg>
);

export const LoaderIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const ZapIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);

export const LinkIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/>
    </svg>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
    </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.93 13.5A2.25 2.25 0 0 0 7.5 12a2.25 2.25 0 0 0-2.43 1.5" />
      <path d="M14.07 13.5A2.25 2.25 0 0 1 16.5 12a2.25 2.25 0 0 1 2.43 1.5" />
      <path d="M12 3v.01" />
      <path d="M21.07 4.93l-.01.01" />
      <path d="M3 12h.01" />
      <path d="M4.93 19.07l.01-.01" />
      <path d="M12 21v-.01" />
      <path d="M19.07 19.07l-.01-.01" />
      <path d="M2.93 4.93l.01.01" />
      <path d="M16.5 7.5a2.25 2.25 0 0 0-2.43-1.5" />
      <path d="M9.93 6A2.25 2.25 0 0 1 7.5 7.5" />
    </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 5a3 3 0 1 0-5.993.142"/>
        <path d="M18 5a3 3 0 1 0-5.993.142"/>
        <path d="M12 19a3 3 0 1 0 5.993-.142"/>
        <path d="M6 19a3 3 0 1 0 5.993-.142"/>
        <path d="M12 12a3 3 0 1 0-5.993.142"/>
        <path d="M18 12a3 3 0 1 0-5.993.142"/>
        <path d="M6 8V6"/>
        <path d="M6 18v-2"/>
        <path d="M12 8V6"/>
        <path d="M12 18v-2"/>
        <path d="M18 8V6"/>
        <path d="M18 18v-2"/>
        <path d="m6 10-3-1"/>
        <path d="m6 14 3 1"/>
        <path d="m18 10 3-1"/>
        <path d="m18 14-3 1"/>
        <path d="m9 12-3 1"/>
        <path d="m15 12 3 1"/>
    </svg>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5c0-2.2-1.8-4-4-4-2.2 0-4 1.8-4 4 0 1.5.3 2.7 1.5 3.9.8.8 1.3 1.5 1.5 2.5"/>
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

export const MailIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
    </svg>
);

export const BuildingIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 18v-6H5l.1-1.2"/>
        <path d="m15 12 4-1v5"/>
        <path d="M15 12v6"/>
        <path d="M9 6H5"/>
        <path d="M19 6h-4"/>
        <path d="M15 6v12"/>
        <path d="M9 12v6"/>
    </svg>
);
