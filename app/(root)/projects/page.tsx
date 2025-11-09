import React from 'react'
import ProjectCard from "@/components/ProjectCard";
import { supabase } from '@/lib/supabaseClient'; // Import supabase
import { type Project } from '@/lib/constants'; // Import the type

// Define the async data fetching function
async function getProjects() {
    // Select all projects, ordered by creation date
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
    // Cast the data to your Project type array
    return data as Project[];
}

// Make the page component async
const Projects = async () => {
    const projects = await getProjects();

    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            <p className="px-4 lg:hidden text-subtext dark:text-Dark_subtext">
                A collection of my impressive projects, each one a new skill learned.
            </p>
            <p className="hidden lg:block lg:w-1/2 text-subtext dark:text-Dark_subtext">
                A collection of my most impressive projects in my life. With each project, I put an emphasis on learning a new tool or skill, ensuring I can keep growing as a developer.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {projects.map((project: Project) => (
                    <ProjectCard
                        key={project.slug}
                        {...project}
                    />
                ))}
                {projects.length === 0 && (
                    <p className="text-subtext">No projects found yet. Check the admin panel.</p>
                )}
            </div>
        </div>
    )
}
export default Projects