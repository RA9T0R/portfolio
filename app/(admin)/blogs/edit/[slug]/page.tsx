"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, notFound } from 'next/navigation';
import { type BlogPost, type BlogPostImage } from '@/lib/constants';
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from 'lucide-react';

// --- Form Data Type ---
type BlogFormData = {
    title: string;
    slug: string;
    author: string;
    date: string;
    excerpt: string;
    content: string;
    images: BlogPostImage[];
    tags: string;
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

// --- Main Edit Post Page ---
interface EditBlogPageProps {
    params: Promise<{ slug: string }>;
}

const EditBlogPage = ({ params }: EditBlogPageProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [initialPost, setInitialPost] = useState<BlogPost | null>(null);

    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        slug: '',
        author: '',
        date: '',
        excerpt: '',
        content: '',
        images: [],
        tags: '',
    });

    // Format ISO date (2025-11-09T...) to YYYY-MM-DD for the <input type="date">
    const formatISODateForInput = (isoDate: string) => {
        if (!isoDate) return '';
        try {
            return new Date(isoDate).toISOString().split('T')[0];
        } catch (e) {
            return ''; // Handle invalid date
        }
    };

    // Fetch data
    useEffect(() => {
        const initializeData = async () => {
            const { slug } = await params;

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return router.push('/login');

            const { data: post, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !post) {
                console.error("Error fetching post:", error);
                return notFound();
            }

            setInitialPost(post);
            setFormData({
                title: post.title,
                slug: post.slug,
                author: post.author,
                date: formatISODateForInput(post.date),
                excerpt: post.excerpt,
                content: post.content,
                images: post.images as BlogPostImage[],
                tags: (post.tags as string[]).join(', '),
            });
            setIsLoading(false);
        };
        initializeData();
    }, [params, router]);

    const handleImageUpload = useCallback((uploadedImages: BlogPostImage[]) => {
        setFormData(prev => ({ ...prev, images: uploadedImages }));
    }, [setFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);
        if (!initialPost) return;

        try {
            const formattedData: Omit<BlogPost, 'id' | 'created_at'> = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                images: formData.images,
                date: new Date(formData.date).toISOString(), // Convert date back to timestamp
            };

            const { error } = await supabase
                .from('blog_posts')
                .update(formattedData)
                .eq('id', initialPost.id);

            if (error) throw error;

            setFormStatus({ type: 'success', message: 'Blog post updated successfully!' });
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
            <h1 className="text-3xl font-bold my-6">Edit Blog Post: {formData.title}</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Post Title" name="title" value={formData.title} onChange={handleChange} required />
                    <AdminInput label="Post Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput label="Author" name="author" value={formData.author} onChange={handleChange} required />
                    <AdminInput label="Date" name="date" value={formData.date} onChange={handleChange} type="date" required />
                </div>

                <AdminTextarea label="Excerpt (Summary)" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} required />

                <AdminTextarea label="Full Content (HTML)" name="content" value={formData.content} onChange={handleChange} rows={12} required />

                <AdminInput label="Tags" name="tags" value={formData.tags} onChange={handleChange} helpText="Enter as a comma-separated list." required />

                <ImageUploader onUpload={handleImageUpload} initialImages={formData.images} />

                <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-secondary hover:bg-secondary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>

                {formStatus && (<p className={`text-sm ${formStatus.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>{formStatus.message}</p>)}
            </form>
        </div>
    );
};

export default EditBlogPage;