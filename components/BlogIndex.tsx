
import React from 'react';
import { posts } from '../blog/posts.ts';
import type { BlogPostMeta } from '../types.ts';
import { SparklesIcon } from './icons.tsx';

interface BlogIndexProps {
  onPostSelect: (post: BlogPostMeta) => void;
}

const BlogIndex: React.FC<BlogIndexProps> = ({ onPostSelect }) => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="text-center border-b border-brand-border pb-8 mb-8">
        <SparklesIcon className="w-12 h-12 text-brand-secondary mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-text-primary tracking-tight">
          Domain Investing Insights
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-brand-text-secondary">
          Articles, guides, and resources to help you find and develop valuable domain names.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.slug} className="bg-brand-surface rounded-lg border border-brand-border flex flex-col overflow-hidden">
            <div className="p-6 flex-grow">
              <p className="text-sm text-brand-text-secondary">{post.date}</p>
              <h2 className="mt-2 text-xl font-bold text-brand-text-primary">
                <button onClick={() => onPostSelect(post)} className="text-left hover:text-brand-secondary transition-colors">
                  {post.title}
                </button>
              </h2>
              <p className="mt-3 text-base text-brand-text-secondary">
                {post.summary}
              </p>
            </div>
            <div className="bg-brand-bg/50 p-6">
              <button onClick={() => onPostSelect(post)} className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors">
                Read article &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogIndex;
