import React from 'react'
import BlogCard from '@/components/BlogCard';
import { supabase } from '@/lib/supabaseClient';
import { type BlogPost } from '@/lib/constants';

async function getBlogPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false }); // Show newest first

    if (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
    return data as BlogPost[];
}

const Blogs = async () => {
    const blog_posts = await getBlogPosts();

    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            <p className="px-4 lg:hidden text-subtext dark:text-Dark_subtext">
                This is my blog, where I post updates everything i want.
            </p>
            <p className="hidden lg:block lg:w-[60%] text-subtext dark:text-Dark_subtext">
                This is my blog, where I post updates everything i want such as my upcoming/launched projects and give insights on what i've learned from each one. Additionally, I may write posts about the industry as a whole.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {blog_posts.map((post: BlogPost) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    )
}
export default Blogs
