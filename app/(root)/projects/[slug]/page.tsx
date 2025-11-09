// FILE: app/(root)/projects/[slug]/page.tsx
// NO "use client" - This is a Server Component

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {ExternalLink, Dot, ArrowLeftToLine} from 'lucide-react';

// Import the data and types
import { projects_data, type Project } from '@/lib/constants';

// 1. Import your new Client Component
import ProjectImageSlider from '@/components/ProjectImageSlider';
import {GitHubIcon} from "@/components/Icon";
import {StatusBadge} from "@/components/ProjectCard";

// Define the props interface
interface ProjectDetailPageProps {
    params: Promise<{ slug: string }>; // Keeping your async/await fix
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

    const { slug } = await params;
    const project = projects_data.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 py-6 font-space-grotesk">

            <div className="font-extrabold text-6xl flex gap-5 items-center">
                {project.title}
            </div>

            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">
                {project.short_description}
            </p>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <ProjectImageSlider images={project.images} />

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-wrap lg:gap-4 items-center">
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-subtext transition-colors hover:bg-surface hover:dark:bg-Dark_surface p-2 rounded-lg"
                            >
                                <GitHubIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
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
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-4">Overview</h3>
                        <p className="text-subtext dark:text-Dark_subtext text-base">
                            {project.overview}
                        </p>
                    </div>
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="font-bold text-2xl mb-4">Tech Stack</h3>
                        <ul className="list-none space-y-2">
                            {project.tech_stack_details.map((tech, index) => (
                                <DetailListItem key={index}>{tech}</DetailListItem>
                            ))}
                        </ul>
                    </div>
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