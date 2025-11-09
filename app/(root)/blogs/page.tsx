import React from 'react'
import BlogCard from "@/components/BlogCard";
import {blog_posts, BlogPost} from "@/lib/constants";

const Blogs = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">
                This is my blog, where I post updates on my upcoming/launched projects and give insights on what i've learned from each one. Additionally, I may write posts about the industry as a whole.
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
