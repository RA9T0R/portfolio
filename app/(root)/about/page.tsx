import React from 'react';
import {GraduationCap, CodeXml} from 'lucide-react';
import { LANGUAGES, WEBSITE, DEV_TOOLS, LIBRARIES } from "@/lib/constants";
import Image from 'next/image';
import Link from 'next/link';
import {FacebookIcon, GitHubIcon, GmailIcon} from "@/components/Icon";
import TechList from "@/components/TechList";

const About = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 py-3 font-space-grotesk">
            {/* Header */}
            <p className="lg:w-1/2 text-subtext dark:text-Dark_subtext">This is what a detail  about Phongphat Bangkha</p>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                {/* 1. LEFT COLUMN: Profile Card (Takes 1/2 width on large screens) */}
                <div className="flex flex-col gap-6 lg:col-span-3">
                    {/* Profile Picture & Info Card */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20 flex flex-col items-center text-center h-full">
                        <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
                            <Image
                                src="/images/my_picture.jpg"
                                alt="Profile Picture"
                                fill={true}
                                className="rounded-full object-cover"
                                sizes="(max-width: 640px) 16vw, (max-width: 1024px) 20vw, 24vw"
                            />
                        </div>

                        <div className="flex flex-col items-start w-full max-w-md mt-5">
                            <h1 className="text-lg lg:text-xl 2xl:text-3xl font-bold">Phongphat Bangkha</h1>
                            <p className="text-xs lg:text-sm 2xl:text-lg text-primary font-light">● Available for work</p>
                        </div>

                        <p className="text-text dark:text-Dark_text w-full max-w-md mb-6 text-sm mt-5 text-start">
                            I&#39;m a third-year university student eager to gain hands-on experience during the school break. Passionate about web development, web design.
                            I thrive on learning new technologies quickly and adapting to challenges. Additionally, I’m exploring 3D design and looking forward to experimenting
                            with it in the future.
                        </p>

                        {/* Social Icons (Placeholder) */}
                        <div className="flex gap-4 mb-8 mt-auto">
                            {/* Replace these with your GitHubIcon, FacebookIcon, etc. */}
                            <a href="https://github.com/RA9T0R" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                                <GitHubIcon width={40} height={40} className="text-gray-700 dark:text-white"/>
                            </a>
                            <a href="mailto:phongphatbangkha@gmail.com" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                                <GmailIcon width={40} height={40}/>
                            </a>
                            <a href="https://www.facebook.com/RA9T0R" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                                <FacebookIcon width={40} height={40} className="text-gray-700 dark:text-white"/>
                            </a>
                        </div>

                        {/* Contact Button */}
                        <Link href="/contact" className="bg-primary hover:bg-primary/90 transition-colors text-white font-bold py-3 px-8 rounded-xl uppercase tracking-wider w-full max-w-md">
                            Contact Me
                        </Link>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: Education & Skills (Takes 1/2 width on large screens) */}
                <div className="flex flex-col gap-4 lg:col-span-7">
                    {/* Education Card */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="text-md lg:text-lg 2xl:text-2xl font-bold mb-6 flex items-center gap-3"><GraduationCap /> Education</h3>

                        <div className="mb-4 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between items-start">
                                <p className="font-semibold">King MongoKit&#39;s University of Technology North Bangkok</p>
                                <span className="text-xs text-subtext dark:text-Dark_subtext font-light hidden lg:block">2020 - Current , GPAX : 3.68</span>
                            </div>
                            <span className="text-xs text-subtext dark:text-Dark_subtext font-light block lg:hidden">2020 - Current , GPAX : 3.68</span>
                            <p className="text-sm text-subtext dark:text-Dark_subtext">Applied Science / Computer Science</p>
                        </div>

                        <div>
                            <div className="flex justify-between items-start">
                                <p className="font-semibold">Matthayom Watnairong English Program School</p>
                                <span className="text-xs text-subtext dark:text-Dark_subtext font-light hidden lg:block">2016 - 2022</span>
                            </div>
                            <span className="text-xs text-subtext dark:text-Dark_subtext font-light block lg:hidden">2016 - 2022</span>
                            <p className="text-sm text-subtext dark:text-Dark_subtext">Science-Math IEP</p>
                        </div>
                    </div>

                    {/* Skills Card */}
                    <div className="bg-surface dark:bg-Dark_surface p-6 rounded-2xl border border-subtext/20">
                        <h3 className="text-md lg:text-lg 2xl:text-2xl font-bold mb-6 flex items-center gap-3">
                            <CodeXml/>
                            Skills
                        </h3>

                        <div className="flex flex-col gap-4">
                            {/* Languages */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    <TechList technologies={LANGUAGES} />
                                </div>
                            </div>

                            {/* Frameworks */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Frameworks</h4>
                                <div className="flex flex-wrap gap-2">
                                    <TechList technologies={WEBSITE} />
                                </div>
                            </div>

                            {/* Developer Tools */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Developer Tools</h4>
                                <div className="flex flex-wrap gap-2">
                                    <TechList technologies={DEV_TOOLS} />
                                </div>
                            </div>

                            {/* Libraries */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-lg text-subtext dark:text-Dark_subtext">Libraries</h4>
                                <div className="flex flex-wrap gap-2">
                                    <TechList technologies={LIBRARIES} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;