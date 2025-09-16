
import React from 'react';

interface TrendListItemProps {
  rank: number;
  keyword: string;
  score: number;
  isSelected: boolean;
  onClick: () => void;
}

const TrendListItem: React.FC<TrendListItemProps> = ({ rank, keyword, score, isSelected, onClick }) => {
  const scorePercentage = (score / 50) * 100;
  const rankColor = rank <= 3 ? 'text-amber-400' : rank <= 10 ? 'text-indigo-400' : 'text-brand-text-secondary';
  
  const selectionClasses = isSelected 
    ? 'border-brand-primary bg-brand-primary/10 ring-2 ring-brand-primary' 
    : 'border-brand-border/50 hover:border-brand-primary/50';

  return (
    <li>
      <button 
        onClick={onClick}
        className={`w-full bg-brand-bg p-4 rounded-lg flex items-center space-x-4 border text-left transition-all ${selectionClasses}`}
      >
        <span className={`text-xl font-bold w-8 text-center flex-shrink-0 ${rankColor}`}>#{rank}</span>
        <div className="flex-grow">
          <p className="font-semibold text-brand-text-primary capitalize">{keyword}</p>
          <div className="w-full bg-brand-surface rounded-full h-2.5 mt-2" title={`Score: ${score}/50`}>
            <div 
              className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
        </div>
        <span className="text-lg font-bold text-brand-text-primary w-10 text-right flex-shrink-0">{score}</span>
      </button>
    </li>
  );
};

export default TrendListItem;
