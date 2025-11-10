import React from "react";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// This file remains a Server Component (no "use client")
export default function AppPagesLayout({children,}: { children: React.ReactNode; }) {
    return (
        <ClientLayoutWrapper>
            {children}
        </ClientLayoutWrapper>
    );
}