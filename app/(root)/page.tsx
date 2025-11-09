import React from 'react'
import {FolderGit2, Newspaper, CodeXml, Briefcase, type LucideProps, Loader, CheckCircle, Clock} from 'lucide-react'
import Image from "next/image";
import Link from 'next/link';
import {type Project } from '@/lib/constants';
import {blog_posts,type BlogPost} from '@/lib/constants';
import { LANGUAGES, WEBSITE, DEV_TOOLS, LIBRARIES } from "@/lib/constants";
import TechList from "@/components/TechList";
import {supabase} from "@/lib/supabaseClient";

// 2. Define types for StatCard props
interface StatCardProps {
    path: string;
    title: string;
    value: string | number;
    IconComponent: React.ComponentType<LucideProps>;
}

const StatCard = ({path, title, value, IconComponent }: StatCardProps) => (
    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl flex flex-col gap-4 hover:scale-105 transition-transform">
        <span className="text-subtext dark:text-Dark_subtext text-md xl:text-2xl">{title}</span>
        <Link href={path}  className="text-4xl lg:text-5xl xl:text-6xl font-bold flex justify-between items-center text-text dark:text-Dark_text ">
            {value}
            <IconComponent
                className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
            />
        </Link>
    </div>
);

interface MiniProfileProps {
    title:string;
    value:string | number;
}
const MiniProfile = ({title,value}:MiniProfileProps) => (
    <div className="flex justify-between items-center text-xs lg:text-sm 2xl:text-lg whitespace-nowrap">
        <p className="text-subtext dark:text-Dark_subtext">{title}</p>
        <p>{value}</p>
    </div>
)

const RecentsProject = ({slug,title, status, technologies}: {slug:string,title:string,status:string,technologies:string[]}) => {
    let color = "text-yellow-500";
    let bgColor = "bg-yellow-500/20";
    let Icon = Loader;

    if (status === 'Completed') {
        color = "text-green-500";
        bgColor = "bg-green-500/20";
        Icon = CheckCircle;
    } else if (status === 'In Progress') {
        color = "text-blue-500";
        bgColor = "bg-blue-500/20";
        Icon = Clock;
    }

    const displayedTech = technologies.slice(0, 3);
    return (
        <Link href={`/projects/${slug}`} className="w-full p-2 rounded-xl flex justify-between items-center bg-bg dark:bg-Dark_bg hover:scale-105 transition-transform">
            <div className="flex lg:flex-col xl:flex-row gap-4 items-center flex-1">
                {/* Status Icon */}
                <div className={`flex items-center p-2 rounded-lg ${color} ${bgColor} text-sm flex-shrink-0`}>
                    <Icon size={20} />
                </div>

                {/* Title and Technologies */}
                <div className="lg:text-center xl:text-start">
                    <h1 className="font-semibold">{title}</h1>
                    <div className="flex flex-wrap gap-2 text-xs text-subtext dark:text-Dark_subtext">
                        {displayedTech.map((tech: string) => (
                            <p key={tech} className="whitespace-nowrap">{tech}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Text (pushed to the right) */}
            <p className={`items-center font-medium ${color} text-sm flex lg:hidden xl:flex`}>
                {status}
            </p>
        </Link>
    )
}
const RecentBlog = ({slug,title, excerpt, date}: {slug:string,title:string,excerpt:string,date:string}) => {
    return (
        <Link href={`/blogs/${slug}`} className="flex flex-col p-3 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            {/* Blog Post Title */}
            <h4 className="font-semibold mb-1 truncate">{title}</h4>

            {/* Excerpt (Changed to one line) */}
            <p className="text-sm text-subtext dark:text-Dark_subtext line-clamp-1 truncate mb-2">
                {excerpt}
            </p>

            {/* Date */}
            <span className="text-xs text-subtext dark:text-Dark_subtext font-light">
                {date}
            </span>
        </Link>
    );
}

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
// --- Your Homepage Component ---
const Homepage = async () => {
    const projects_data = await getProjects()
    const recentProjects = projects_data.slice(0, 3);
    const recentBlogs = blog_posts.slice(0, );

    const total_projects = projects_data.length
    const total_blogs = blog_posts.length
    const technologies = LANGUAGES.length + WEBSITE.length + DEV_TOOLS.length + LIBRARIES.length;
    const experience = 0

    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            {/* 1. TOP STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard path="/projects" title="Total Projects" value={total_projects} IconComponent={FolderGit2} />
                <StatCard path="/blogs" title="Total Blogs" value={total_blogs} IconComponent={Newspaper} />
                <StatCard path="/about" title="Technologies" value={technologies} IconComponent={CodeXml} />
                <StatCard path="/experience" title="Experience" value={experience} IconComponent={Briefcase} />
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/*Profile Mini*/}
                <div className={`flex flex-col gap-4 bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex lg:flex-col xl:flex-row gap-4 items-center">
                        {/*Image*/}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                            <Image
                                src="/images/my_picture.jpg"
                                alt="Profile Picture"
                                fill={true}
                                className="rounded-full object-cover"
                                sizes="(max-width: 640px) 16vw, (max-width: 1024px) 20vw, 24vw"
                            />
                        </div>
                        {/* Text */}
                        <div className="whitespace-nowrap">
                            <h1 className="text-md lg:text-lg 2xl:text-2xl font-bold">Phongphat Bangkha</h1>
                            <p className="text-xs lg:text-sm 2xl:text-lg text-primary font-light">● Available for work</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <MiniProfile title="Location" value="Bangkok, Thailand"/>
                        <MiniProfile title="Phone" value="094-417-8866"/>
                        <MiniProfile title="Education" value="KMUTNB Unversity"/>
                    </div>
                </div>

                <div className={`bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex flex-col gap-4">
                        {/* Text */}
                        <div className="whitespace-nowrap">
                            <h1 className="text-md lg:text-lg 2xl:text-2xl font-bold">Recent Projects</h1>
                        </div>
                        {recentProjects.map((project: Project) => (
                            <RecentsProject key={project.slug} slug={project.slug} title={project.title} status={project.status} technologies={project.technologies} />
                        ))}
                    </div>
                </div>
                <div className={`bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex flex-col gap-4">
                        {/* Text */}
                        <div className="whitespace-nowrap">
                            <h1 className="text-md lg:text-lg 2xl:text-2xl font-bold">Last Update</h1>
                        </div>
                        {recentBlogs.map((blogpost:BlogPost) => (
                            <RecentBlog key={blogpost.slug} slug={blogpost.slug} title={blogpost.title} excerpt={blogpost.excerpt} date={blogpost.date} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. SKILLS SECTION */}
            <div className="grid grid-cols-1 gap-4">
                <div className={`bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex gap-4 items-center text-md lg:text-lg 2xl:text-2xl font-bold">
                        <CodeXml/>
                        <h1>Skills</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">

                        {/* Left Column (takes 1 of 2 columns) */}
                        <div className="flex flex-col gap-6">

                            {/* 2. Use flex-col to stack the heading on top of the icons */}
                            <div className="flex flex-col gap-3">
                                <h1 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Languages </h1>
                                <TechList technologies={LANGUAGES} showName={false} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h1 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Frameworks </h1>
                                <TechList technologies={WEBSITE} showName={false} />
                            </div>
                        </div>

                        {/* Right Column (takes 1 of 2 columns) */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <h1 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Developer Tools </h1>
                                <TechList technologies={DEV_TOOLS} showName={false} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <h1 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Libraries </h1>
                                <TechList technologies={LIBRARIES} showName={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Homepage