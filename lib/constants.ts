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

// FILE: lib/constants.ts

// --- 1. Define the Type for an Image with Description ---
export type ProjectImage = {
    src: string; // Path to the image
    caption?: string; // Optional description for this specific image
};

// --- 2. Define the Type for a Project ---
export type Project = {
    id: number;           // 🌟 ADD THIS (matches the 'bigint' primary key)
    created_at: string;   // 🌟 ADD THIS (matches the 'timestamp')
    slug: string; // For the URL, e.g., "quickbites"
    title: string;
    short_description: string; // Brief description for the project card

    // New: Detailed sections for the project page
    overview: string;
    tech_stack_details: string[]; // List of detailed tech stack points
    features: string[]; // List of detailed features

    images: ProjectImage[]; // Now an array of ProjectImage objects
    github_url: string;
    live_demo_url?: string; // Optional: Some projects might not have a live demo
    status: 'Completed' | 'In Progress' | 'Planning';
    technologies: string[]; // Array of technology names (for badges/filters)
};

// --- 3. Create the Array of Projects ---
export const projects_data: Project[] = [
    {
        id:1,
        created_at:"1/2/3",
        slug: "quickbites",
        title: "QuickBites",
        short_description: "Built a full-stack real-time food ordering system. Include QR-base ordering, Dual interfaces for customers and admins.",

        // NEW DETAILED SECTIONS
        overview: "QuickBites is a Web Application that provides a full-stack, real-time food ordering system. It features QR-based ordering, a dual interface for customers and admins, and is designed for seamless user experience. The admin dashboard provides comprehensive analytics and order management.",
        tech_stack_details: [
            "Front-end: React.js, Tailwind CSS",
            "Back-end: Node.js, Express.js",
            "Database: MongoDB",
            "Real-time: Socket.io",
            "Deployment: Netlify (for client), Vercel (for server)"
        ],
        features: [
            "Full-stack Project: Both client and admin interfaces.",
            "QR-based ordering system for easy access.",
            "Real-time order updates for kitchen and customers.",
            "Comprehensive admin dashboard for order management and analytics.",
            "User authentication and authorization.",
            "Fully responsive design for all devices."
        ],

        images: [
            { src: "/images/projects/quickbites_preview.jpg", caption: "This Picture is UI of admin dashboard" },
            { src: "/images/projects/quickbites_dashboard.png", caption: "Admin Dashboard with order statistics" },
            { src: "/images/projects/quickbites_qr.png", caption: "QR-code for table ordering" }
        ],
        github_url: "https://github.com/RA9T0R/quickbites",
        live_demo_url: "https://quickbites-demo.com",
        status: "Completed",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "TailwindCSS"]
    },
    {
        id:2,
        created_at:"1/2/3",
        slug: "footprint-ecommerce",
        title: "Footprint",
        short_description: "An e-commerce platform deployment successful with modern features.",

        // NEW DETAILED SECTIONS
        overview: "Footprint is a modern e-commerce platform built with Next.js and Supabase. It offers product listings, a shopping cart, secure checkout, and user account management. The platform emphasizes performance, SEO, and a great user experience.",
        tech_stack_details: [
            "Front-end: Next.js, TypeScript, Tailwind CSS",
            "Back-end & Database: Supabase (PostgreSQL, Authentication, Storage)",
            "Deployment: Vercel"
        ],
        features: [
            "Server-side rendered pages for SEO and performance.",
            "Robust user authentication powered by Supabase.",
            "Shopping cart functionality with local storage persistence.",
            "Secure payment gateway integration (e.g., Stripe - placeholder).",
            "Product search and filtering.",
            "Responsive design for all devices."
        ],

        images: [
            { src: "/images/projects/footprint_preview.jpg", caption: "Main landing page of Footprint e-commerce" }
        ],
        github_url: "https://github.com/RA9T0R/footprint",
        live_demo_url: "https://footprint-demo.com",
        status: "In Progress",
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"]
    },
    {
        id:3,
        created_at:"1/2/3",
        slug: "ai-ml-dashboard",
        title: "AI/ML Model",
        short_description: "A data analytics dashboard for visualizing complex data sets and machine learning model performance.",

        // NEW DETAILED SECTIONS
        overview: "This project provides an interactive dashboard for visualizing data and monitoring the performance of AI/ML models. It supports various data inputs and offers customizable charts and graphs to gain insights into model predictions and metrics.",
        tech_stack_details: [
            "Front-end: React, Chart.js",
            "Back-end: Flask (Python), Pandas",
            "Database: SQLite (local for demo)",
            "Machine Learning: TensorFlow/Keras"
        ],
        features: [
            "Interactive data visualization with customizable charts.",
            "Real-time monitoring of AI/ML model metrics.",
            "Ability to upload and process different datasets.",
            "User-friendly interface for non-technical users.",
            "Export data and report generation."
        ],

        images: [
            { src: "/images/projects/aimodel_preview.jpg", caption: "Dashboard overview with example data" }
        ],
        github_url: "https://github.com/RA9T0R/aimodel",
        status: "Planning", // No live demo yet
        technologies: ["Python", "TensorFlow", "Flask", "React", "Chart.js"]
    },
    {
        id:4,
        created_at:"1/2/3",
        slug: "2",
        title: "AI/ML Model",
        short_description: "A data analytics dashboard for visualizing complex data sets and machine learning model performance.",

        // NEW DETAILED SECTIONS
        overview: "This project provides an interactive dashboard for visualizing data and monitoring the performance of AI/ML models. It supports various data inputs and offers customizable charts and graphs to gain insights into model predictions and metrics.",
        tech_stack_details: [
            "Front-end: React, Chart.js",
            "Back-end: Flask (Python), Pandas",
            "Database: SQLite (local for demo)",
            "Machine Learning: TensorFlow/Keras"
        ],
        features: [
            "Interactive data visualization with customizable charts.",
            "Real-time monitoring of AI/ML model metrics.",
            "Ability to upload and process different datasets.",
            "User-friendly interface for non-technical users.",
            "Export data and report generation."
        ],

        images: [
            { src: "/images/projects/aimodel_preview.jpg", caption: "Dashboard overview with example data" }
        ],
        github_url: "https://github.com/RA9T0R/aimodel",
        status: "Planning", // No live demo yet
        technologies: ["Python", "TensorFlow", "Flask", "React", "Chart.js"]
    },
];
// ==================================================================================
// FILE: lib/constants.ts (Add these exports)

// --- Type for Blog Post Images ---
export type BlogPostImage = {
    src: string; // Path to the image
    caption?: string; // Description for the image/figure
};

// --- Type for a Blog Post ---
export type BlogPost = {
    slug: string; // For the URL, e.g., "switching-to-webstorm"
    title: string;
    date: string; // Use ISO format later, but string for now (e.g., "Oct 5th, 2025")
    excerpt: string; // Short summary for the blog card

    // Detailed content for the blog post page
    content: string; // The full body content (can be markdown)

    images: BlogPostImage[]; // Array of images for the post
    tags: string[]; // e.g., ["IDE", "Productivity", "WebDev"]
};

// --- Array of Blog Posts ---
export const blog_posts: BlogPost[] = [
    {
        slug: "webstorm-as-my-main-ide",
        title: "🎉 WebStrom as my main IDE!",
        date: "5th October 2025",
        excerpt: "This blog will explain why I switch from VSCode to WebStorm and how it improved my coding workflow and project navigation.",
        // FIXED content (in constants.ts)
        content: `
            <h2 class="Topic_blog">The Switch to WebStorm</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>Why Not VS Code?</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <h3>Key Features I Love</h3>
            <ul>
                <li>Intelligent Code Completion</li>
                <li>Powerful Refactoring Tools</li>
                <li>Built-in Database Tools</li>
            </ul>
        `,
        images: [
            { src: "/images/blogs/webstorm_main.jpg", caption: "This picture is UI in Webstorm" },
            { src: "/images/blogs/webstorm_main.jpg", caption: "This picture is UI in Webstorm" },
            { src: "/images/blogs/webstorm_main.jpg", caption: "This picture is UI in Webstorm" },
            { src: "/images/blogs/webstorm_main.jpg", caption: "This picture is UI in Webstorm" },
        ],
        tags: ["IDE", "WebDev", "Productivity"],
    },
    {
        slug: "welcome-to-the-new-site",
        title: "Welcome to the new site!",
        date: "5th October 2025",
        excerpt: "This first blog post contains my thoughts, process, and intentions of the new website redesign, outlining the goals for better performance and usability.",
        content: "...", // Add detailed content
        images: [], // No images for this one
        tags: ["Website", "Redesign", "Next.js"],
    },
];

// --- Supabase Table Structure ---
/*
| Column Name | Data Type | Notes |
| :--- | :--- | :--- |
| slug | text | UNIQUE. For the URL. |
| title | text | |
| author | text | |
| date | timestamp with time zone | Use this for easy sorting. |
| excerpt | text | |
| content | text | Markdown content. |
| images | jsonb | Stores the array of objects (src, caption). |
| tags | text[] (Array) | |
*/

// --- Skill Arrays for About Page ---

export const LANGUAGES: string[] = [
    "Python",
    "JavaScript",
    "TypeScript",
    "C++",
    "Java",

    // Add more languages
];

export const WEBSITE: string[] = [
    "HTML5",
    "CSS",
    "React",
    "Next.js",
    "TailwindCSS",
    "Express.js",
    "Node.js",
    "FastAPI",
    "Vite",
    // Add more frameworks
];

export const DEV_TOOLS: string[] = [
    "Git",
    "Vercel",
    "WebStorm",
    "VS Code",
    "Postman",
    "Supabase",
    "MongoDB",
    "Postgresql"
    // Add "WebStorm", "VS Code", "Figma", etc.
];

export const LIBRARIES: string[] = [
    "TensorFlow",
    "Pandas",
    "Numpy",
    "Chart.js",
    "Socket.io",
    // Add "Mongoose", "Prisma", etc.
];
