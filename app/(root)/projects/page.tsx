import React from 'react'
import { projects_data, type Project } from "@/lib/constants";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">
                A collection of my most impressive projects in my life. With each project, I put an emphasis on learning a new tool or skill, ensuring I can keep growing as a developer.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {projects_data.map((project: Project) => (
                    <ProjectCard
                        key={project.slug}
                        {...project}
                    />
                ))}
            </div>
        </div>
    )
}
export default Projects
