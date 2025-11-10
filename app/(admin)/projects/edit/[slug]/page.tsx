"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { type Project, type ProjectImage } from '@/lib/constants';
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from 'lucide-react';

// --- Type Definitions ---
type ProjectFormData = {
    title: string;
    slug: string;
    short_description: string;
    overview: string;
    tech_stack_details: string;
    features: string;
    images: ProjectImage[];
    github_url: string;
    live_demo_url: string;
    status: 'Completed' | 'In Progress' | 'Planning';
    technologies: string;
};

// --- Reusable Form Components (omitted for brevity, assume correct) ---
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

interface EditProjectPageProps {
    params: Promise<{ slug: string }>;
}

const EditProjectPage = ({ params }: EditProjectPageProps) => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [initialProject, setInitialProject] = useState<Project | null>(null);

    const [formData, setFormData] = useState<ProjectFormData>({
        title: '',
        slug: '',
        short_description: '',
        overview: '',
        tech_stack_details: '',
        features: '',
        images: [],
        github_url: '',
        live_demo_url: '',
        status: 'Planning',
        technologies: '',
    });

    useEffect(() => {
        const initializeData = async () => {
            const { slug } = await params;

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return router.push('/login');
            }

            const { data: project, error } = await supabase
                .from('projects')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !project) {
                console.error("Error fetching project:", error);
                return router.push('/dashboard?error=notfound');
            }

            setInitialProject(project);
            setFormData({
                title: project.title,
                slug: project.slug,
                short_description: project.short_description,
                overview: project.overview,
                tech_stack_details: (project.tech_stack_details as string[]).join('\n'),
                features: (project.features as string[]).join('\n'),
                technologies: (project.technologies as string[]).join(', '),
                images: project.images as ProjectImage[],
                github_url: project.github_url,
                live_demo_url: project.live_demo_url || '',
                status: project.status,
            });

            setIsLoading(false);
        };

        initializeData();
    }, [params, router]);

    const handleImageUpload = useCallback((uploadedImages: ProjectImage[]) => {
        setFormData(prev => ({
            ...prev,
            images: uploadedImages
        }));
    }, [setFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateSlug = (str: string) =>
        str.toLowerCase().trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setFormData(prev => ({
            ...prev,
            title: newTitle,
            slug: (prev.slug === generateSlug(prev.title) || prev.slug === '') ? generateSlug(newTitle) : prev.slug
        }));
    };

    // --- Submission Logic ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);

        if (!initialProject?.id) {
            setFormStatus({ type: 'error', message: 'Error: Could not find original project ID for update.' });
            setIsSubmitting(false);
            return;
        }

        try {
            const formattedData: Omit<Project, 'id' | 'created_at'> = {
                ...formData,
                live_demo_url: formData.live_demo_url || undefined,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
                tech_stack_details: formData.tech_stack_details.split('\n').map(t => t.trim()).filter(Boolean),
                features: formData.features.split('\n').map(t => t.trim()).filter(Boolean),
                images: formData.images
            };

            const { error } = await supabase
                .from('projects')
                .update(formattedData)
                .eq('id', initialProject.id);

            if (error) throw error;

            setFormStatus({ type: 'success', message: 'Project updated successfully!' });
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);

        } catch (error: unknown) {
            if (error instanceof Error) {
                setFormStatus({ type: 'error', message: `Error: ${error.message}` });
            } else {
                setFormStatus({ type: 'error', message: 'An unknown error occurred.' });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="w-full mx-auto gap-6 py-3 font-space-grotesk">

            <h1 className="text-3xl font-bold my-6">Edit Project: {formData.title}</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Title and Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput
                        label="Project Title"
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="e.g., QuickBites"
                        required
                    />
                    <AdminInput
                        label="Project Slug (URL)"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="e.g., quickbites"
                        // Slug should often be read-only after creation, but allowing edit for flexibility
                    />
                </div>

                {/* Short Description */}
                <AdminTextarea
                    label="Short Description"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    placeholder="A brief summary for the project card."
                    rows={3}
                    required
                />

                {/* Overview */}
                <AdminTextarea
                    label="Overview"
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
                    placeholder="A detailed overview for the project page."
                    rows={5}
                    required
                />

                {/* Tech Stack Details */}
                <AdminTextarea
                    label="Tech Stack Details"
                    name="tech_stack_details"
                    value={formData.tech_stack_details}
                    onChange={handleChange}
                    placeholder="e.g., Front-end: React, Tailwind CSS"
                    helpText="Enter one item per line. This will be formatted as a list."
                    rows={5}
                    required
                />

                {/* Features */}
                <AdminTextarea
                    label="Features"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="e.g., Real-time order updates"
                    helpText="Enter one item per line. This will be formatted as a list."
                    rows={5}
                    required
                />

                {/* Technologies (Tags) */}
                <AdminInput
                    label="Technologies (Tags)"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js, Supabase"
                    helpText="Enter as a comma-separated list (e.g., React, Node.js, Supabase)."
                    required
                />

                {/* Image Uploader - Pre-filled with existing images */}
                <ImageUploader
                    onUpload={handleImageUpload}
                    initialImages={formData.images}
                />

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AdminInput
                        label="GitHub URL"
                        name="github_url"
                        value={formData.github_url}
                        onChange={handleChange}
                        placeholder="httpsPlease://..."
                        required
                    />
                    <AdminInput
                        label="Live Demo URL (Optional)"
                        name="live_demo_url"
                        value={formData.live_demo_url || ''}
                        onChange={handleChange}
                        placeholder="httpsPlease://..."
                    />
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="text-sm font-medium text-subtext dark:text-Dark_subtext">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Updating...' : 'Save Changes'}
                </button>

                {/* Status Message */}
                {formStatus && (
                    <p className={`text-sm ${
                        formStatus.type === 'error' ? 'text-red-500' : 'text-green-500'
                    }`}>
                        {formStatus.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default EditProjectPage;