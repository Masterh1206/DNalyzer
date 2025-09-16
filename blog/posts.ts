
import type { BlogPostMeta } from '../types.ts';
import Post1GuideToDomainValuation from '../components/content/blog/Post1GuideToDomainValuation.tsx';
import Post2TopNiches from '../components/content/blog/Post2TopNiches.tsx';
import Post3BrandableDomains from '../components/content/blog/Post3BrandableDomains.tsx';
import Post4Placeholder from '../components/content/blog/Post4Placeholder.tsx';

export const posts: BlogPostMeta[] = [
  {
    slug: 'guide-to-domain-valuation-2024',
    title: "A Beginner's Guide to Domain Valuation in 2024",
    summary: 'Learn the key factors that determine a domain\'s worth, from TLD value and keyword strength to brandability and market trends. Discover how AI can help automate this complex process.',
    component: Post1GuideToDomainValuation,
    author: 'Admin',
    date: 'July 15, 2024',
  },
  {
    slug: 'top-10-niches-domain-investing',
    title: 'Top 10 Niches for Domain Investing This Year',
    summary: 'Explore the highest-growth industries to focus your domain search on, from AI-powered wellness platforms to sustainable technology and the future of remote work.',
    component: Post2TopNiches,
    author: 'Admin',
    date: 'July 10, 2024',
  },
  {
    slug: 'art-of-brandable-domain',
    title: 'The Art of the Brandable Domain: From Idea to Registration',
    summary: 'A great brand starts with a great name. This guide covers the principles of creating memorable, catchy, and valuable brandable domains that stand out in a crowded market.',
    component: Post3BrandableDomains,
    author: 'Admin',
    date: 'July 5, 2024',
  },
  {
    slug: 'seo-impact-on-domains',
    title: 'How Your Domain Name Impacts SEO and Search Rankings',
    summary: 'Does an exact-match keyword in your domain still matter? We break down the relationship between domain names and SEO in the age of semantic search and AI.',
    component: Post4Placeholder,
    author: 'Admin',
    date: 'July 1, 2024',
  },
];
