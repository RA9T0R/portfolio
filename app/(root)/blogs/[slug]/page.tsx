import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { type BlogPost } from '@/lib/constants';
import { CalendarDays} from 'lucide-react';
import ImageSlider from '@/components/ImageSlider';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    const normalizedSlug = slug.toLowerCase();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', normalizedSlug)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
    }
    return data as BlogPost | null;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const BlogPostDetailPage = async ({ params }: BlogPostPageProps) => {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 py-6 font-space-grotesk">
            <h1 className="font-extrabol text-4xl lg:text-6xl">{post.title}</h1>
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">{post.excerpt}</p>

            <div className="flex gap-2 items-center text-subtext dark:text-Dark_subtext">
                <CalendarDays strokeWidth={1} size={16} />
                <span>{formatDate(post.date)}</span>
                <span className="mx-1">|</span>
                <span>{post.author}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
                <div className="lg:col-span-5 flex flex-col">
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20 h-full">
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col gap-8">
                    {post.images && post.images.length > 0 && (
                        <ImageSlider images={post.images} />
                    )}

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