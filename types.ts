
import React from 'react';

export interface AIAnalysisResult {
  score: number;
  rationale: string;
  tags: string[];
}

export interface TrendingDomain {
  domain: string;
  matchedTrends: string[];
  availability?: Exclude<AvailabilityStatus, 'IDLE' | 'CHECKING'>;
  aiAnalysis?: AIAnalysisResult;
}

export type AvailabilityStatus = 'IDLE' | 'CHECKING' | 'AVAILABLE' | 'TAKEN' | 'ERROR';

export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  component: React.FC;
  date: string;
  author: string;
}

export type ViewType = 'analyzer' | 'trends' | 'blog' | 'appraiser';
