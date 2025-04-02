'use client'
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";

const Hero = () => {
  const { theme } = useTheme();
  return (
    <div id="Hero" className="w-full bg-white dark:bg-Main flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
          />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <p className="text-orange-500 z-20 text-xl sm:text-4xl">Phongphat Bangkha</p>
      <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[15rem] font-bold text-center text-black dark:text-white relative z-20">
        PORTFOLIO
      </h1>
      <div className="sm:relative w-full h-40">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full z-10" // Lower z-index to keep it behind elements
            particleColor={theme === "dark" ? "#FFFFFF" : "#121212"} 
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-white dark:bg-Main [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>

      {/* Button with higher z-index to stay on top */}
      <Link href='https://github.com/RA9T0R' className="relative -top-25 z-30 bg-orange-500 text-white px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition-all duration-200" type="button">
        My Github
      </Link>

      <Image
        className="block lg:hidden rounded-lg z-10"
        src='https://images.unsplash.com/photo-1741879080222-b9b5f20b3333?q=80&w=1926&auto=format&fit=crop&ixlib=rb-43&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt="logo"
        width={200}
        height={30}
      />
    </div>
  )
}

export default Hero;
