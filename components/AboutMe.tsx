import { cn } from "@/lib/utils";
import Image from "next/image";
import Skills from "./Skills";

const AboutMe = () => {
  return (
    <section id="About Me" className='relative flex flex-col w-full items-center mb-10 pt-20 bg-white dark:bg-Main'>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-Main"></div>

      <p className="text-orange-500 text-xl text-center sm:text-4xl z-20">About Me</p>
      <div className="w-[90%] lg:w-[85%] flex flex-col lg:flex-row items-center py-8 text-4xl sm:text-7xl gap-6 z-20">
        <div className="flex flex-col items-center gap-8">
          <p className='w-full text-2xl'>I’m a second-year university student eager to gain hands-on experience during the school break. Passionate about web development, web design. I thrive on learning new technologies quickly and adapting to challenges. Additionally, I’m exploring 3D design and looking forward to experimenting with it in the future.</p>

          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 p-2 w-full">
            <div className="flex flex-col items-start text-2xl gap-6">
              <p className="text-6xl">Education</p>
              <div className="">
                <p>• King Mongkut’s University of Technology North Bangkok</p>
                <p>Applied Science : Computer Science</p>
                <p>2022 - Current , GPAX 3.69</p>
              </div>
              <div>
                <p>• Matthayom Watnairong English Program School</p>
                <p>Sci Math IEP</p>
                <p>2016 - 2022 , GPAX 3.30</p>
              </div>
            </div>
            <Image
              className="hidden lg:block rounded-lg"
              src='https://images.unsplash.com/photo-1741879080222-b9b5f20b3333?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt="logo"
              width={200}
              height={30}
            />
          </div>
        </div>

        <hr className="block lg:hidden w-full text-white z-20"/>

        <div className="flex flex-col items-center">
          <h1 className="text-6xl mb-8">My Skill</h1>
          <Skills/>
        </div>
      </div>

    </section>
  )
}

export default AboutMe
