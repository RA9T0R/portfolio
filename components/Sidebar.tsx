// FILE: app/components/Sidebar.tsx
'use client'
import React,{ useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { GitHubIcon, FacebookIcon, GmailIcon } from "@/components/Icon";
import {
    ArrowLeftFromLine,
    ArrowRightToLine,
    ChevronDown,
    LogIn,
    ChevronUp,
    SquareArrowOutUpRight,
    type LucideProps,
} from "lucide-react";
import { sidebar_content, type SidebarItem, icons } from "@/lib/constants";

// Helper component to render Lucide icons by name
type IconHelperProps = LucideProps & {
    name: keyof typeof icons;
};

const Icon = ({ name, ...props }: IconHelperProps) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};


const Sidebar = () => {
    const { theme } = useTheme();
    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpenlink, setIsOpenlink] = useState(false);

    const sidebarWidth = isCollapsed ? 'w-20' : 'w-72';

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        if (!isCollapsed) setIsOpenlink(false);
    };

    const handleLink = () => {
        if(!isCollapsed) setIsOpenlink(!isOpenlink);
    }

    return (
        <aside className={`font-space-grotesk h-screen flex-shrink-0 transition-all duration-300 ease-in-out 
                bg-surface dark:bg-Dark_surface hidden md:flex flex-col flex-grow-0  rounded-r-4xl
                ${sidebarWidth}`}>

            {/* Top Section */}
            <div className={`flex p-4 gap-4 items-center ${isCollapsed && 'justify-center'}`}>
                <div className="flex w-10 h-10 bg-bg dark:bg-Dark_bg rounded-lg items-center justify-center flex-shrink-0 select-none">
                    {/* Hydration-safe logo render */}
                    {mounted && (theme === "dark"
                            ? <Image src="/images/Logo_B.png" alt="Logo" width={30} height={30}/>
                            : <Image src="/images/Logo_W.png" alt="Logo" width={30} height={30}/>
                    )}
                    {!mounted && <div className="w-[30px] h-[30px]" />}
                </div>

                {!isCollapsed && (
                    <div className="flex flex-col overflow-hidden whitespace-nowrap">
                        <h1 className="font-extrabold truncate">Phongphat Bangkha</h1>
                        <p className="font-extralight text-[10px] text-subtext dark:text-Dark_subtext truncate">phongphatbangkha@gmail.com</p>
                    </div>
                )}

                {/* Open-state Collapse Button (pushed to the right) */}
                <div className={`flex items-center cursor-pointer ${isCollapsed ? 'hidden' : 'ml-auto'}`} onClick={handleCollapse}>
                    <ArrowLeftFromLine size={24} strokeWidth={1} className="hover:text-primary transition-colors" />
                </div>
            </div>

            {/* Collapsed-state Collapse Button (centered) */}
            <div className={`flex items-center cursor-pointer justify-center mb-2 ${isCollapsed ? '' : 'hidden'}`} onClick={handleCollapse}>
                <ArrowRightToLine size={24} strokeWidth={1} className="hover:text-primary transition-colors" />
            </div>

            {/* Link Integrations */}
            <div className={`flex flex-col items-center ${!isCollapsed && 'cursor-pointer'} justify-center`}>
                <div className="flex overflow-hidden whitespace-nowrap p-4 gap-2 items-center" onClick={handleLink}>
                    <h2 className={`${isCollapsed && 'hidden'}`}>Link Integrations</h2>
                    <div className={`rounded-md flex ${isCollapsed ? 'flex-col' : 'flex-row'} gap-1 p-2 border border-subtext/20 dark:border-Dark_subtext/20`}>
                        <GitHubIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
                        <GmailIcon width={20} height={20}/>
                        <FacebookIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
                    </div>
                    <div className={`${isCollapsed && 'hidden'}`}>
                        {isOpenlink ? <ChevronUp strokeWidth={2} size={25}/> : <ChevronDown strokeWidth={2} size={25}/> }
                    </div>
                </div>
                {isOpenlink && !isCollapsed && (
                    <div className="flex flex-col gap-2 text-xs mb-4 w-[85%]">
                        <a href="https://github.com/RA9T0R" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                            <GitHubIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
                            RA9T0R
                            <SquareArrowOutUpRight strokeWidth={1} className="ml-auto"/>
                        </a>
                        <a href="mailto:phongphatbangkha@gmail.com" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                            <GmailIcon width={20} height={20}/>
                            <span className="truncate">phongphatbangkha@gmail.com</span>
                            <SquareArrowOutUpRight strokeWidth={1} className="ml-auto"/>
                        </a>
                        <a href="https://www.facebook.com/RA9T0R" target="_blank" className="flex gap-2 items-center p-2 hover:bg-bg dark:hover:bg-Dark_bg rounded-md">
                            <FacebookIcon width={20} height={20} className="text-gray-700 dark:text-white"/>
                            <span className="truncate">Phongphat Bangkha (Raptor)</span>
                            <SquareArrowOutUpRight strokeWidth={1} className="ml-auto"/>
                        </a>
                    </div>
                )}
            </div>

            {/* Menu - Implemented dynamic list */}
            <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
                <hr className="w-[90%] mx-auto mb-2 border-t border-subtext/20 dark:border-Dark_subtext/20" />
                {sidebar_content.map((item: SidebarItem) => (
                    <React.Fragment key={item.name}>
                        <Link href={item.path} className={`flex items-center py-2 px-3 font-light rounded-xl transition-colors
                                ${isCollapsed ? 'justify-center' : 'gap-3'}
                                ${pathname === item.path ? 'bg-bg dark:bg-Dark_bg' : 'text-Text hover:bg-black/5 dark:hover:bg-white/5'}`}>
                            <Icon name={item.icon} size={20} strokeWidth={1.5} className="flex-shrink-0"/>
                            {!isCollapsed && (<span className="whitespace-nowrap overflow-hidden">{item.name}</span>)}
                        </Link>
                        {item.separator && (<hr className="w-[90%] mx-auto my-2 border-t border-subtext/20 dark:border-Dark_subtext/20" />)}
                    </React.Fragment>
                ))}
            </div>

            {/* Log Out Button */}
            <div className={`cursor-pointer flex items-center gap-4 m-3 font-light mt-auto rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="p-3">
                    <LogIn size={24} strokeWidth={1.5} />
                </div>
                {!isCollapsed && (
                    <div className="whitespace-nowrap">
                        Phongphat LOGIN
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;