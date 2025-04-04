import {projectItems} from '@/data/index'
import { PinContainer } from '@/components/ui/3d-pin'
import MainText from './MainText'
const Projects = () => {
  return (
    <section id="Project" className="relative w-full flex flex-col items-center justify-center text-Main dark:text-white">
      <MainText text={'Projects'}/>

      <div className='flex flex-wrap items-center justify-center md:p-4 gap-x-24 gap-y-8'>
        {projectItems.map(({id,title,des,img,iconLists,link}) => (
          <div key={id} className='sm:h-[41rem] lg:min-h-[32.5rem] h-[32rem] flex items-center justify-center sm:w-[570px] w-[80vw]'>
            <PinContainer title={link} href={link}>
              <div className='relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10 border border-Main dark:border-white/[0.1] rounded-2xl'>
                <div className='relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#131632d]'>
                  <img src="/bg.png" alt="bg-img" />
                </div>
                <img src={img} alt={title} className='z-10 absolute bottom-0' />
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
                      <img src={icon} alt={icon} className='p-2' />
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
