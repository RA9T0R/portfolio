"use client";

import React from 'react';
// Import the icons you need
import {FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt} from 'react-icons/fa';
import { IoLogoJavascript } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";
import {
    SiMongodb,
    SiTailwindcss,
    SiNextdotjs,
    SiTypescript,
    SiVercel,
    SiSocketdotio,
    SiExpress,
    SiFlask,
    SiTensorflow,
    SiChartdotjs,SiCplusplus,
    SiSupabase, SiFigma, SiWebstorm, SiPostman
} from 'react-icons/si';

const iconMap: { [key: string]: React.ReactNode } = {
    // --- Frameworks / Libraries ---
    "React": <FaReact className="text-primary size-6 lg:size-4 xl:size-6" />,
    "Node.js": <FaNodeJs className="text-green-500 size-6 lg:size-4 xl:size-6" />,
    "MongoDB": <SiMongodb className="text-green-600 size-6 lg:size-4 xl:size-6" />,
    "Socket.io": <SiSocketdotio className="text-gray-400 size-6 lg:size-4 xl:size-6" />,
    "TailwindCSS": <SiTailwindcss className="text-cyan-400 size-6 lg:size-4 xl:size-6" />,
    "Next.js": <SiNextdotjs className="size-6 lg:size-4 xl:size-6"/>,
    "TypeScript": <SiTypescript className="text-blue-600 size-6 lg:size-4 xl:size-6" />,
    "JavaScript":<IoLogoJavascript className="text-yellow-400 size-6 lg:size-4 xl:size-6"/>,
    "Express.js": <SiExpress className="size-6 lg:size-4 xl:size-6"/>,
    "Python": <FaPython className="text-yellow-400 size-6 lg:size-4 xl:size-6" />,
    "C++": <SiCplusplus  className="text-blue-400 size-6 lg:size-4 xl:size-6" />,
    "Flask": <SiFlask className="size-6 lg:size-4 xl:size-6"/>,
    "TensorFlow": <SiTensorflow className="text-orange-500 size-6 lg:size-4 xl:size-6" />,
    "Chart.js": <SiChartdotjs className="text-red-500 size-6 lg:size-4 xl:size-6" />,
    "Supabase": <SiSupabase className="text-green-400 size-6 lg:size-4 xl:size-6" />,

    // --- Tools & Platforms ---
    "Figma": <SiFigma className="text-pink-500 size-6 lg:size-4 xl:size-6" />,
    "VS Code": <VscVscode className="text-blue-500 size-6 lg:size-4 xl:size-6" />,
    "WebStorm": <SiWebstorm className="text-cyan-500 size-6 lg:size-4 xl:size-6" />,
    "Git": <FaGitAlt className="text-orange-600 size-6 lg:size-4 xl:size-6" />,
    "Docker": <FaDocker className="text-blue-600 size-6 lg:size-4 xl:size-6" />,
    "Postman": <SiPostman className="text-orange-500 size-6 lg:size-4 xl:size-6" />,
    "Vercel": <SiVercel className="size-6 lg:size-4 xl:size-6"/>,
};

const DefaultIcon = ({ name }: { name: string }) => (
    <span className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
        {name}
    </span>
);

// 3. The TechList component props
interface TechListProps {
    technologies: string[];
    showName?: boolean;
}

const TechList = ({ technologies, showName = true }: TechListProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {technologies.map((techName: string) => {
                const icon = iconMap[techName];

                if (icon) {
                    return (
                        <div
                            key={techName}
                            // 🌟 Conditionally apply styles here
                            className={`flex items-center
                                ${showName
                                ? 'gap-2 bg-bg dark:bg-Dark_bg rounded-lg border border-subtext/20 px-3 py-2'
                                : ''
                            }
                            `}
                        >
                            <span className="flex items-center justify-center">
                                {icon}
                            </span>
                            {/* This will be hidden when showName is false */}
                            {showName && <span className="font-medium text-sm">{techName}</span>}
                        </div>
                    );
                } else if (showName) {
                    // Fallback for icons you haven't added
                    return <DefaultIcon key={techName} name={techName} />;
                }
                return null;
            })}
        </div>
    );
};

export default TechList;