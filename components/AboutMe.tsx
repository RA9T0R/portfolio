import { cn } from "@/lib/utils";
import Image from "next/image";
import Skills from "./Skills";
import MainText from "./MainText";

const AboutMe = () => {

  return (
    <section id="About_Me" className='relative flex flex-col w-full items-center mb-10 pt-20 p-3 bg-white dark:bg-Main'>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-Main"></div>

      <MainText text={'About Me'}/>
      <div className="w-[90%] lg:w-[85%] flex flex-col lg:flex-row py-8 text-4xl sm:text-7xl gap-6 z-20">
        <div className="flex flex-col items-center gap-8">
          <p className='w-full text-xl md:text-2xl'>I’m a second-year university student eager to gain hands-on experience during the school break. Passionate about web development, web design. I thrive on learning new technologies quickly and adapting to challenges. Additionally, I’m exploring 3D design and looking forward to experimenting with it in the future.</p>

          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 w-full ">
            <div className="flex flex-col text-xl md:text-2xl gap-3 md:gap-6">
              <p className="text-3xl md:text-6xl">Education</p>
              <div>
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
              className="hidden lg:block rounded-lg border-4 border-Main dark:border-white"
              src='/Golf.jpg'
              alt="logo"
              width={350}
              height={70}
            />
          </div>
        </div>

        <hr className="block lg:hidden w-full text-white z-20"/>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-6xl mb-4 md:mb-8">My Skill</h1>
          <Skills/>
        </div>
      </div>

    </section>
  )
}

export default AboutMe
