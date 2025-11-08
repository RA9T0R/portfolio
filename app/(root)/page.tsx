import React from 'react'
import { FolderGit2, Newspaper,CodeXml, Briefcase, type LucideProps } from 'lucide-react'
import Image from "next/image";

// 2. Define types for StatCard props
interface StatCardProps {
    title: string;
    value: string | number;
    IconComponent: React.ComponentType<LucideProps>;
}

const StatCard = ({ title, value, IconComponent }: StatCardProps) => (
    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl flex flex-col gap-4">
        <span className="text-subtext dark:text-Dark_subtext text-md xl:text-2xl">{title}</span>
        <div className="text-4xl lg:text-5xl xl:text-6xl font-bold flex justify-between items-center text-text dark:text-Dark_text">
            {value}
            <IconComponent
                className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14"
            />
        </div>
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


// --- Your Homepage Component ---
const Homepage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            {/* 1. TOP STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Projects" value="5" IconComponent={FolderGit2} />
                <StatCard title="Total Blogs" value="4" IconComponent={Newspaper} />
                <StatCard title="Technologies" value="15" IconComponent={CodeXml} />
                <StatCard title="Experience" value="<0" IconComponent={Briefcase} />
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/*Profile Mini*/}
                <div className={`flex flex-col gap-4 bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex gap-4 items-center">
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
                    <div className="flex gap-4 items-center">
                        {/* Text */}
                        <div className="whitespace-nowrap">
                            <h1 className="text-md lg:text-lg 2xl:text-2xl font-bold">Recent Projects</h1>
                        </div>
                    </div>
                </div>
                <div className={`bg-surface dark:bg-Dark_surface p-6 rounded-2xl`}>
                    <div className="flex gap-4 items-center">
                        {/* Text */}
                        <div className="whitespace-nowrap">
                            <h1 className="text-md lg:text-lg 2xl:text-2xl font-bold">Last Update</h1>
                        </div>
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
                </div>
            </div>
        </div>
    )
}
export default Homepage