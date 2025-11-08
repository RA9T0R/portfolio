import {
    House,
    FolderGit2,
    Briefcase,
    Newspaper,
    User,
    Mail,

} from "lucide-react";

// 1. Define the icon map
export const icons = {
    House,
    FolderGit2,
    Briefcase,
    Newspaper,
    User,
    Mail,

};

// 2. Define and export the type
export type SidebarItem = {
    name: string;
    path: string;
    icon: keyof typeof icons; // Uses the map above
    separator?: boolean;
};

// 3. Define and export the data *with the explicit type*
export const sidebar_content: SidebarItem[] = [
    {
        icon: "House",
        name: "Overview",
        path: "/",
    },
    {
        icon: "FolderGit2",
        name: "Projects",
        path: "/projects",
    },
    {
        icon: "Briefcase",
        name: "Experience",
        path: "/experience",
    },
    {
        icon: "Newspaper",
        name: "Blog",
        path: "/blogs",
        separator: true,
    },
    {
        icon: "User",
        name: "About",
        path: "/about",
    },
    {
        icon: "Mail",
        name: "Contact",
        path: "/contact",
    },
];

// ====================================================

// --- 1. Define the Type for a Project ---
export type Project = {
    slug: string; // For the URL, e.g., "quickbites"
    title: string;
    description: string;
    images: string[]; // An array of image paths
    github_url: string;
    live_demo_url: string;
    status: 'Completed' | 'In Progress' | 'Planning';
    technologies: string[];
};

// --- 2. Create the Array of Projects ---
export const projects_data: Project[] = [
    {
        slug: "quickbites", // The URL will be /projects/quickbites
        title: "QuickBites",
        description: "Built a full-stack real-time food ordering system. Include QR-base ordering, Dual interfaces for customers and admins.",
        // Now an array. Add all your preview images here.
        images: [
            "/images/projects/quickbites_preview.jpg",
            "/images/projects/quickbites_dashboard.png",
            "/images/projects/quickbites_qr.png"
        ],
        github_url: "https://github.com/RA9T0R/quickbites",
        live_demo_url: "https://quickbites-demo.com",
        status: "Completed",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io"]
    },
    {
        slug: "footprint-ecommerce",
        title: "Footprint",
        description: "An e-commerce platform deployment successful. This is a description for the second project.",
        // A project with just one image
        images: [
            "/images/projects/footprint_preview.jpg"
        ],
        github_url: "https://github.com/RA9T0R/footprint",
        live_demo_url: "https://footprint-demo.com",
        status: "In Progress",
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"]
    },
    {
        slug: "ai-ml-dashboard",
        title: "AI/ML Model",
        description: "A data analytics dashboard for visualizing complex data sets and machine learning model performance.",
        images: [
            "/images/projects/aimodel_preview.jpg"
        ],
        github_url: "https://github.com/RA9T0R/aimodel",
        live_demo_url: "",
        status: "Planning",
        technologies: ["Python", "TensorFlow", "Flask", "React"]
    }
];


