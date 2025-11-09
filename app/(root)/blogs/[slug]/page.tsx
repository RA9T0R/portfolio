// FILE: app/(root)/blogs/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';

// Import the data and types
import { blog_posts, type BlogPost } from '@/lib/constants';
import {CalendarDays} from 'lucide-react';
import ProjectImageSlider from "@/components/ProjectImageSlider";

// Define the props interface (using the async/await fix)
interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

const BlogPostDetailPage = async ({ params }: BlogPostPageProps) => {
    const { slug } = await params;
    const post = blog_posts.find(p => p.slug === slug);
    if (!post) {
        notFound();
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 py-6 font-space-grotesk">
            {/* Header elements... */}
            <h1 className="font-extrabold text-6xl flex gap-5 items-center">{post.title}</h1>
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">{post.excerpt}</p>
            <div className="flex gap-2 items-center text-subtext dark:text-Dark_subtext">
                <CalendarDays strokeWidth={1} />
                {post.date}
            </div>

            {/* Main Content Grid (70/30) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* 🌟 LEFT COLUMN: POST CONTENT (5/12 width) 🌟 */}
                <div className="lg:col-span-5 flex flex-col gap-8">

                    {/* Content Card (Added Card styling and padding here) */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20 h-full">
                        <div className="prose dark:prose-invert max-w-none text-Text dark:text-Dark_text">
                            <div className="blog-content"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: SLIDER AND TAGS (7/12 width) */}
                <div className="lg:col-span-7 lg:sticky lg:top-24 h-fit flex flex-col gap-8">
                    <ProjectImageSlider images={post.images} />
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-xl mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-secondary/20 text-secondary dark:bg-secondary/10 dark:text-secondary px-3 py-1 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDetailPage;