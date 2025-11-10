import React from 'react';
import Link from 'next/link';
import {ArrowRight, CalendarDays} from 'lucide-react';
import { type BlogPost } from '@/lib/constants';

// Helper function to format the date
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const BlogCard = ({ post }: { post: BlogPost }) => {
    return (
        <div className="bg-surface dark:bg-Dark_surface gap-2 p-4 rounded-2xl flex flex-col font-space-grotesk">
            <h3 className="font-bold text-md xl:text-2xl mb-2">{post.title}</h3>

            <p className="font-extralight text-sm text-text dark:text-Dark_text line-clamp-3 flex-1 mb-4">{post.excerpt}</p>

            <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
                <div className="flex gap-2 text-subtext dark:text-Dark_subtext">
                    <CalendarDays strokeWidth={1} />
                    {formatDate(post.date)} | {post.author}
                </div>
                <Link href={`/blogs/${post.slug}`} className="justify-center items-center text-white p-2 rounded-xl bg-secondary mt-auto flex gap-2 hover:gap-3 hover:scale-105 transition-all duration-150 font-semibold text-sm">
                    Read More
                    <ArrowRight size={16} />
                </Link>
            </div>

        </div>
    );
}

export default BlogCard;