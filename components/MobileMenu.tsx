'use client'

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebar_content, type SidebarItem, icons } from '@/lib/constants';
import { type LucideProps, X } from 'lucide-react';
import Image from "next/image";
import {useTheme} from "next-themes";

// Re-using the same Icon helper from Sidebar.tsx
type IconHelperProps = LucideProps & {
    name: keyof typeof icons;
};
const Icon = ({ name, ...props }: IconHelperProps) => {
    const LucideIcon = icons[name];
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
    const { theme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    const handleLinkClick = () => {setIsOpen(false);};

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out md:hidden
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)}/>

            {/* Menu Panel */}
            <aside className={`absolute top-0 left-0 h-full w-72 flex-shrink-0 bg-surface dark:bg-Dark_surface flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-subtext/20 dark:border-Dark_subtext/20">
                    <div className="flex w-10 h-10 bg-bg dark:bg-Dark_bg rounded-lg items-center justify-center flex-shrink-0 select-none">
                        {/* Hydration-safe logo render */}
                        {mounted && (theme === "dark"
                                ? <Image src="/images/Logo_B.png" alt="Logo" width={30} height={30}/>
                                : <Image src="/images/Logo_W.png" alt="Logo" width={30} height={30}/>
                        )}
                        {!mounted && <div className="w-[30px] h-[30px]" />}
                    </div>
                    <div className="flex flex-col overflow-hidden whitespace-nowrap">
                        <h1 className="font-extrabold truncate">Phongphat Bangkha</h1>
                        <p className="font-extralight text-[10px] text-subtext dark:text-Dark_subtext truncate">phongphatbangkha@gmail.com</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10">
                        <X size={24} />
                    </button>
                </div>

                {/* Menu List */}
                <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
                    {sidebar_content.map((item: SidebarItem) => (
                        <React.Fragment key={item.name}>
                            <Link
                                href={item.path}
                                onClick={handleLinkClick}
                                className={`
                                    flex items-center py-2 px-3 font-medium rounded-xl transition-colors gap-3
                                    ${pathname === item.path ? 'bg-bg dark:bg-Dark_bg' : 'text-Text hover:bg-black/5 dark:hover:bg-white/5'}
                                `}
                            >
                                <Icon name={item.icon} size={20} strokeWidth={1.5} className="flex-shrink-0"/>
                                <span className="whitespace-nowrap overflow-hidden">{item.name}</span>
                            </Link>

                            {item.separator && (
                                <hr className="w-[90%] mx-auto my-2 border-t border-subtext/20 dark:border-Dark_subtext/20" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default MobileMenu;