import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight, CalendarDays} from 'lucide-react';
import { type BlogPost } from '@/lib/constants'; // Import the type

const BlogCard = ({ post }: { post: BlogPost }) => {
    return (
        <div className="bg-surface dark:bg-Dark_surface p-4 rounded-2xl flex flex-col">

            {/* Title */}
            <h3 className="font-bold text-2xl mb-2">{post.title}</h3>

            {/* Date and Author */}

            {/* Excerpt */}
            <p className="text-sm text-Text/90 dark:text-Dark_text/90 mb-6 line-clamp-3 flex-1 w-[80%]">
                {post.excerpt}
            </p>

            <div className="flex justify-between text-center text-sm">
                <div className="flex gap-2 items-center text-subtext dark:text-Dark_subtext">
                    <CalendarDays strokeWidth={1} />
                    {post.date}
                </div>

                {/* Read More Link */}
                <Link href={`/blogs/${post.slug}`} className="flex items-center justify-end gap-2 hover:gap-3 hover:scale-105 p-2 rounded-xl bg-secondary dark:bg-secondary transition-all duration-150 font-semibold">
                    Read More
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
}

export default BlogCard;