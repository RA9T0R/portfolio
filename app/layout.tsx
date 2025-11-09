import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import {ThemeProvider} from "next-themes";

const SpaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phongphat Portfolio",
  description: "A Dashboard feel like portfolio and blog post.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${SpaceGrotesk.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <div className="flex min-h-screen bg-bg dark:bg-Dark_bg">
            <Sidebar/>
              <main className="flex-1 md:px-3 lg:px-6 xl:px-12 overflow-auto transition-all duration-300 text-text dark:text-Dark_text">
                {children}
              </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
