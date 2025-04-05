import {projectItems} from '@/data/index'
import { PinContainer } from '@/components/ui/3d-pin'
import MainText from './MainText'
import Image from "next/image";

const Projects = () => {
  return (
    <section id="Project" className="relative w-full flex flex-col items-center justify-center text-Main dark:text-white">
      <MainText text={'Projects'}/>

      <div className='flex flex-wrap items-center justify-center md:p-4 gap-x-24'>
        {projectItems.map(({id,title,des,img,iconLists,link}) => (
          <div key={id} className='h-[30rem] sm:h-[41rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[80vw]'>
            <PinContainer title={link} href={link}>
              <div className='relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden mb-10 border border-Main dark:border-white/[0.1] rounded-2xl'>
                <div className='relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#131632d]'>
                  <Image src="/bg.png" alt="bg-img" width={1920} height={1080} priority />
                </div>
                <Image src={img} alt={title} className='w-[95%] z-10 absolute bottom-0' width={1920} height={1080} priority />
              </div>
              <h1 className='font-bold lg:text-2xl md:text-xl text-base line-clamp-1'>
                {title}
              </h1>
              <p className='lg:text-xl lg:font-normal font-light text-sm line-clamp-2'>
                {des}
              </p>
              <div className='flex items-center justify-between mt-7 mb-3'>
                <div className='flex items-center'>
                  {iconLists.map((icon, index) => (
                    <div key={index} className='border border-white/[0.2] rounded-full bg-Main lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center' style={{transform:`translateX(-${5*index*2}px)`}}>
                      <Image src={icon} alt={icon} width={1920} height={1080} className='p-2' priority  />
                    </div>
                  ))}
                </div>
                <div className='flex justify-center items-center'>
                  <p className='flex lg:text-xl md:text-xs text-sm text-purple'>Check It Out</p>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
