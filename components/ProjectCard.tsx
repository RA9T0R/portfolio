import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, CheckCircle, Clock, Loader } from 'lucide-react';
import { type ProjectImage } from '@/lib/constants';
import {GitHubIcon} from "@/components/Icon";
import TechList from "@/components/TechList";

// Props Interface
interface Props {
    slug: string;
    title: string;
    short_description: string;
    images: ProjectImage[];
    github_url: string;
    live_demo_url?: string;
    status: 'Completed' | 'In Progress' | 'Planning';
    technologies: string[];
}

// Status Badge Helper (no change)
export const StatusBadge = ({ status }: { status: Props['status'] }) => {
    let icon = <Loader size={16} className="animate-spin" />;
    const text = status;
    let color = "text-yellow-500";

    if (status === 'Completed') {
        icon = <CheckCircle size={16} />;
        color = "text-green-500";
    } else if (status === 'In Progress') {
        icon = <Clock size={16} />;
        color = "text-blue-500";
    }

    return (
        <span className={`flex items-center p-2 gap-2 font-medium ${color} text-sm`}>
            {icon}
            {text}
        </span>
    );
};

// --- Project Card Component (Fixed) ---
const ProjectCard = ({slug, title, short_description, images, github_url, live_demo_url, status, technologies}: Props) => {

    const coverImage = images[0]?.src

    return (
        <div className="flex flex-col bg-surface dark:bg-Dark_surface rounded-2xl
                       transition-all duration-300 group"
        >
            {/* 2. Wrap the Image in the <Link> */}
            <Link href={`/projects/${slug}`}>
                <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={`${title} preview`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex flex-row lg:flex-col xl:flex-row justify-between">
                    <Link href={`/projects/${slug}`}>
                        <h3 className="font-bold text-md xl:text-2xl mb-2 hover:text-primary transition-colors">{title}</h3>
                    </Link>
                    <TechList technologies={technologies} showName={false} />
                </div>
                {/* 3. Wrap the Title in the <Link> */}

                {/* Description */}
                <p className="text-sm text-subtext dark:text-Dark_subtext mb-4 line-clamp-3">
                    {short_description}
                </p>

                {/* Footer (pushes to bottom) */}
                <div className="mt-auto flex flex-row lg:flex-col xl:flex-row justify-between ">
                    {/* Links */}
                    <div className="flex flex-row lg:flex-col xl:flex-row gap-4 lg:gap-1 xl:gap-4 text-sm">
                        {/* 4. These are now plain <a> tags without stopPropagation */}
                        <a
                            href={github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-subtext transition-colors hover:bg-bg hover:dark:bg-Dark_bg p-2 rounded-lg"
                        >
                            <GitHubIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
                            GitHub
                        </a>

                        {live_demo_url && (
                            <a
                                href={live_demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary dark:text-Dark_primary transition-colors hover:bg-bg hover:dark:bg-Dark_bg p-2 rounded-lg"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </a>
                        )}

                    </div>
                    {/* Status */}
                    <StatusBadge status={status} />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;