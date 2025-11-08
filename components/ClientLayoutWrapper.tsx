'use client'

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";

export default function ClientLayoutWrapper({children,}: { children: React.ReactNode; }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>

            <Navbar onMenuClick={() => setIsMobileMenuOpen(true)}/>

            <div className="flex-1 px-4">
                {children}
            </div>
        </>
    );
}