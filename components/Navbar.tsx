"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    let headerText = "Portfolio"; // Default text

    if (pathname === "/") {
        headerText = "Dashboard";
    } else if (pathname === "/Projects") {
        headerText = "My Projects";
    } else if (pathname === "/contact") {
        headerText = "Contact Me";
    }

    return (
        <nav className="w-full p-4 border-b border-white/10 bg-BG ">
            <h1 className="text-xl font-bold text-Text ">{headerText}</h1>

        </nav>
    );
};

export default Navbar;