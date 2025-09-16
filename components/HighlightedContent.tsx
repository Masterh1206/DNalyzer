
import React from 'react';

interface HighlightedContentProps {
  text: string;
  keywordsToHighlight: string[];
}

// Define the component outside of HighlightedContent to prevent re-creation on re-renders.
const HighlightRenderer: React.FC<{ text: string, keywords: string[] }> = React.memo(({ text, keywords }) => {
  if (!keywords || keywords.length === 0) {
    return <>{text}</>;
  }

  // Create a regex that is case-insensitive and global.
  // Escape special regex characters in keywords.
  const escapedKeywords = keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        keywords.some(kw => kw.toLowerCase() === part.toLowerCase()) ? (
          <mark key={i} className="bg-brand-highlight text-black rounded px-1 py-0.5">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
});

HighlightRenderer.displayName = 'HighlightRenderer';


const HighlightedContent: React.FC<HighlightedContentProps> = ({ text, keywordsToHighlight }) => {
  return (
    <div className="bg-brand-surface rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-brand-text-primary mb-4 border-b border-gray-700 pb-2">
        Highlighted Text
      </h2>
      <pre className="whitespace-pre-wrap text-sm text-brand-text-secondary bg-brand-bg rounded-md p-4 max-h-[calc(100vh-200px)] overflow-y-auto font-mono">
        <HighlightRenderer text={text} keywords={keywordsToHighlight} />
      </pre>
    </div>
  );
};

export default HighlightedContent;
