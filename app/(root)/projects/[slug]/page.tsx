import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, Dot } from 'lucide-react';

// Database and Types
import { supabase } from '@/lib/supabaseClient';
import { type Project } from '@/lib/constants'; // 1. FIX: Import type from lib/types

// Components
import ProjectImageSlider from '@/components/ProjectImageSlider';
import { StatusBadge } from "@/components/ProjectCard";


// 2. FIX: Change the props interface to use a Promise
interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>;
}

// Define the async data fetching function
async function getProject(slug: string) {
    // This function is now safe because 'slug' will be a valid string
    const normalizedSlug = slug.toLowerCase();

    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', normalizedSlug)
        .single();

    if (error) {
        console.error("Error fetching project:", error);
    }
    return data as Project | null;
}

// Helper: A simple component for a list item
const DetailListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start text-subtext dark:text-Dark_subtext">
        <Dot size={24} className="flex-shrink-0 text-primary mt-0.5" />
        <span>{children}</span>
    </li>
);

// --- Project Details Page Component (async Server Component) ---
const ProjectDetailsPage = async ({ params }: ProjectDetailPageProps) => {

    // 3. FIX: Await the params to get the slug
    const { slug } = await params;

    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 py-6 font-space-grotesk">
            <h1 className="font-extrabold text-5xl">{project.title}</h1>
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">
                {project.short_description}
            </p>

            {/* Main Content Grid (70/30) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* Left Column: Image Slider (70%) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <ProjectImageSlider images={project.images} />

                    <div className="flex flex-row justify-between items-center flex-wrap">
                        {/* GitHub & Live Demo */}
                        <div className="flex flex-wrap lg:gap-4 items-center">
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-subtext transition-colors hover:bg-surface hover:dark:bg-Dark_surface p-2 rounded-lg"
                            >
                                <Github size={20} />
                                GitHub
                            </a>
                            {project.live_demo_url && (
                                <a
                                    href={project.live_demo_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-primary dark:text-Dark_primary transition-colors hover:dark:bg-Dark_surface p-2 rounded-lg"
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                        <StatusBadge status={project.status} />
                    </div>
                </div>

                {/* Right Column: Details (30%) (All Server-Side) */}
                <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-24 h-fit">

                    {/* Overview */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-4">Overview</h3>
                        <p className="text-subtext dark:text-Dark_subtext text-base">
                            {project.overview}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-4">Tech Stack</h3>
                        <ul className="list-none space-y-2">
                            {project.tech_stack_details.map((tech, index) => (
                                <DetailListItem key={index}>{tech}</DetailListItem>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-4">Features</h3>
                        <ul className="list-none space-y-2">
                            {project.features.map((feature, index) => (
                                <DetailListItem key={index}>{feature}</DetailListItem>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsPage;