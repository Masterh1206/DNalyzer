
export interface TrendingDomain {
  domain: string;
  matchedTrends: string[];
}

export type AvailabilityStatus = 'IDLE' | 'CHECKING' | 'AVAILABLE' | 'TAKEN' | 'ERROR';