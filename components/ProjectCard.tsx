'use client'

import React from 'react'
import Link from 'next/link'

interface Props {
    slug: string;
    title: string;
    description: string;
    images: string[];
    github_url: string;
    live_demo_url: string;
    status: 'Completed' | 'In Progress' | 'Planning';
    technologies: string[];
}

const ProjectCard = ({slug,title,description,images,github_url,live_demo_url,status,technologies}:Props) => {
    return (
        <Link href=''>

        </Link>
    )
}
export default ProjectCard
