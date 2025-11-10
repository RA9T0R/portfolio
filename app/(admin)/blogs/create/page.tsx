"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { type BlogPost, type BlogPostImage } from '@/lib/constants';
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from 'lucide-react';

// --- Form Data Type ---
type BlogFormData = {
    title: string;
    slug: string;
    author: string;
    date: string; // Stored as 'YYYY-MM-DD' for the input
    excerpt: string;
    content: string;
    images: BlogPostImage[];
    tags: string; // Comma-separated string
};

// --- Reusable Form Components ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; helpText?: string; }
const AdminInput = React.forwardRef<HTMLInputElement, InputProps>(({ label, name, helpText, ...props }, ref) => (
    <div className="flex flex-col gap-2"> <label htmlFor={name} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label> <input id={name} name={name} ref={ref} className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" {...props} /> {helpText && <p className="text-xs text-subtext/70">{helpText}</p>} </div>
));
AdminInput.displayName = "AdminInput";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; helpText?: string; }
const AdminTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, name, helpText, ...props }, ref) => (
    <div className="flex flex-col gap-2"> <label htmlFor={name} className="text-sm font-medium text-subtext dark:text-Dark_subtext">{label}</label> <textarea id={name} name={name} ref={ref} className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px] font-mono" {...props} /> {helpText && <p className="text-xs text-subtext/70">{helpText}</p>} </div>
));
AdminTextarea.displayName = "AdminTextarea";

// --- Main Create Post Page ---
const CreateBlogPage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Format date to YYYY-MM-DD for the input
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        slug: '',
        author: 'Phongphat Bangkha', // Default author
        date: new Date().toISOString().split('T')[0], // Default to today
        excerpt: '',
        content: '<h2>Your Title Here</h2>\n<p>Your content here...</p>\n<ul><li>List item</li></ul>',
        images: [],
        tags: '',
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push('/login');
            else setIsLoading(false);
        };
        checkUser();
    }, [router]);

    const generateSlug = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setFormData(prev => ({
            ...prev,
            title: newTitle,
            slug: generateSlug(newTitle)
        }));
    };

    const handleImageUpload = useCallback((uploadedImages: BlogPostImage[]) => {
        setFormData(prev => ({ ...prev, images: uploadedImages }));
    }, [setFormData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);

        try {
            // Format for Supabase
            const formattedData: Omit<BlogPost, 'id' | 'created_at'> = {
                ...formData,
                date: new Date(formData.date).toISOString(), // Convert date back to timestamp
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                images: formData.images,
            };

            const { error } = await supabase.from('blog_posts').insert([formattedData]);
            if (error) throw error;

            setFormStatus({ type: 'success', message: 'Blog post created successfully!' });
            setTimeout(() => router.push('/dashboard'), 1500);

        } catch (error: unknown) {
            if (error instanceof Error) setFormStatus({ type: 'error', message: `Error: ${error.message}` });
            else setFormStatus({ type: 'error', message: 'An unknown error occurred.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="w-full h-screen flex justify-center items-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
    }

    return (
        <div className="w-full mx-auto gap-6 py-3 font-space-grotesk">
            <h1 className="text-3xl font-bold my-6">Create New Blog Post</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Post Title" name="title" value={formData.title} onChange={handleTitleChange} placeholder="e.g., My First Blog Post" required />
                    <AdminInput label="Post Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g., my-first-blog-post" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Author" name="author" value={formData.author} onChange={handleChange} required />
                    <AdminInput label="Date" name="date" value={formData.date} onChange={handleChange} type="date" required />
                </div>

                <AdminTextarea label="Excerpt (Summary)" name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="A brief summary for the blog card." rows={3} required />

                <AdminTextarea label="Full Content (HTML)" name="content" value={formData.content} onChange={handleChange} helpText="Write content using HTML tags (e.g., <h2>, <p>, <ul>) for styling." rows={12} required />

                <AdminInput label="Tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., React, WebDev, Tutorial" helpText="Enter as a comma-separated list." required />

                {/* Use the same ImageUploader, but it needs to point to a 'blog_images' bucket */}
                <ImageUploader onUpload={handleImageUpload} />

                <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-secondary hover:bg-secondary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>

                {formStatus && (<p className={`text-sm ${formStatus.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{formStatus.message}</p>)}
            </form>
        </div>
    );
};

export default CreateBlogPage;