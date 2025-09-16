import type { TrendingDomain } from '../types.ts';
import { TREND_KEYWORDS } from '../constants.ts';

const DOMAIN_REGEX = /([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/g;

export const analyzeDomains = (text: string, dynamicTrends: { [key: string]: number } | null = null): TrendingDomain[] => {
  const domains = [...new Set(text.match(DOMAIN_REGEX) || [])];
  if (domains.length === 0) return [];

  // Merge hardcoded trends with dynamic, AI-powered trends.
  const allTrends = { ...TREND_KEYWORDS, ...dynamicTrends };
  const trendKeywords = Object.keys(allTrends);

  const trendingDomains: TrendingDomain[] = [];

  for (const domain of domains) {
    const domainLower = domain.toLowerCase();
    const domainParts = domainLower.split('.');
    const sld = domainParts.length > 1 ? domainParts.slice(0, -1).join('.') : domainParts[0];

    const matchedTrends = trendKeywords.filter(trend => {
      // New, smarter logic to find keywords in compound domain names.
      // A keyword matches if it's a prefix, suffix, or separated by hyphens.
      // This is much more effective than the previous "whole word" regex.

      // 1. Check for start/end, which is most common (e.g., "aiforge", "forgeai").
      if (sld.startsWith(trend) || sld.endsWith(trend)) {
        return true;
      }

      // 2. Check for keywords separated by hyphens (e.g., "my-crypto-wallet").
      const hyphenParts = sld.split('-');
      if (hyphenParts.includes(trend)) {
        return true;
      }
      
      return false;
    });

    if (matchedTrends.length > 0) {
      trendingDomains.push({
        domain,
        matchedTrends,
      });
    }
  }

  // Sort by number of trends matched (descending), then alphabetically.
  return trendingDomains.sort((a, b) => {
    if (b.matchedTrends.length !== a.matchedTrends.length) {
      return b.matchedTrends.length - a.matchedTrends.length;
    }
    return a.domain.localeCompare(b.domain);
  });
};