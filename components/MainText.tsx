
const MainText = ({text}:{text: string}) => {
  return (
    <div className="font-bold flex text-center justify-center text-[#C62300] dark:text-[#ff5d38] relative z-20">
      <div className='inline-flex gap-5 items-center mb-3 text-3xl sm:text-4xl md:text-5xl '>
        <p className='w-20 sm:w-44 md:w-64 lg:w-80 xl:w-96 h-[1px] sm:h-[2px] bg-[#ff5d38] dark:bg-[#C62300]'></p>
        <p>{text}</p>
        <p className='w-20 sm:w-44 md:w-64 lg:w-80 xl:w-96 h-[1px] sm:h-[2px] bg-[#ff5d38] dark:bg-[#C62300]'></p>
      </div>
    </div>
  )
}
export default MainText