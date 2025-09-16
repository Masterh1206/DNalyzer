
import React, { useEffect } from 'react';
import type { BlogPostMeta } from '../types.ts';

interface BlogPostProps {
  post: BlogPostMeta;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="animate-fade-in">
        <div className="max-w-3xl mx-auto">
            <button
                onClick={onBack}
                className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors mb-8"
            >
                &larr; Back to all articles
            </button>

            <article className="prose prose-invert prose-lg max-w-none text-brand-text-secondary prose-headings:text-brand-text-primary prose-a:text-brand-secondary hover:prose-a:text-brand-primary prose-strong:text-brand-text-primary prose-blockquote:border-l-brand-primary">
                <header>
                    <p className="text-base text-brand-text-secondary">{post.date} &bull; By {post.author}</p>
                    <h1 className="!mb-4">{post.title}</h1>
                </header>
                
                <post.component />

            </article>
        </div>
    </div>
  );
};

export default BlogPost;
