import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
    <html lang="en">
      <body
        className={`${SpaceGrotesk.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar/>
          <main className="flex-1 p-4 overflow-auto transition-all duration-300">
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}
