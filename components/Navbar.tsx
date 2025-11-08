import ThemeToggle from "@/components/theme-toggle";
import React from "react";
import NavbarHeader from "./NavbarHeader";
import { Menu } from "lucide-react"; // 1. Import the Menu icon

// 2. Add 'onMenuClick' to the props
interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <nav className="w-full p-4 flex justify-between items-center gap-4">

            <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 md:hidden cursor-pointer ">
                <Menu size={24} />
            </button>

            <div className="flex-1">
                <NavbarHeader />
            </div>

            <ThemeToggle/>
        </nav>
    );
};

export default Navbar;