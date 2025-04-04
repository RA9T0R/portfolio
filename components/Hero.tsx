'use client'
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import { Spotlight } from "./ui/Spotlight";
import Image from "next/image";

const Hero = () => {
  const { theme } = useTheme();
  return (
    <div id="Hero" className="w-full h-screen bg-white dark:bg-Main flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
          />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#C62300] dark:text-[#ff5d38] font-bold">Phongphat Bangkha</h1>
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
      <Link href='https://github.com/RA9T0R' className="relative -top-30 sm:-top-25 z-30 bg-[#ff5d38] text-white px-4 py-2 rounded-md cursor-pointer hover:scale-110 transition-all duration-200" type="button">
        My Github
      </Link>

      <Image
        className="relative -top-15 block lg:hidden rounded-lg z-10"
        src='/Golf.jpg'
        alt="logo"
        width={350}
        height={70}
      />
    </div>
  )
}

export default Hero;
