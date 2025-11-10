"use client";

import { usePathname } from "next/navigation";

const NavbarHeader = () => {
    const pathname = usePathname();

    let headerText = "Portfolio";
    let subtext = "Page";

    if (pathname.startsWith('/projects/') && pathname.length > '/projects/'.length) {
        headerText = "Projects Details";
        subtext = pathname.substring(1);
    } else if (pathname.startsWith('/blogs/') && pathname.length > '/blogs/'.length) {
        headerText = "Blog Details";
        subtext = pathname.substring(1);
    }else if (pathname === "/") {
        headerText = "Portfolio Overview";
        subtext = "Overview";
    } else if (pathname === "/projects") {
        headerText = "Projects";
        subtext = "projects";
    } else if (pathname === "/experience") {
        headerText = "Experience";
        subtext = "experience";
    } else if (pathname === "/blogs") {
        headerText = "Blog Post";
        subtext = "blogs";
    } else if (pathname === "/about") {
        headerText = "About Me";
        subtext = "about";
    } else if (pathname === "/contact") {
        headerText = "Contact";
        subtext = "contact";
    } else if (pathname === "/login") {
        headerText = "Admin";
        subtext = "adminlogin";
    }else if (pathname === "/dashboard") {
        headerText = "Dashboard";
        subtext = "admindashboard";
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-xl md:text-4xl font-bold">{headerText}</h1>
            <p className="text-xs md:text-sm font-extralight text-subtext dark:text-Dark_subtext">
                /{subtext}
            </p>
        </div>
    );
};

export default NavbarHeader;