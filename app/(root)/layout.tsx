import React from "react";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="flex-1 p-4">
                {children}
            </div>
        </>
    );
};

export default Layout;
