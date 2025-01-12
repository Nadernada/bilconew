'use client'

import Image from "next/image";
import { useRef } from "react";



const Standards = () => {
  const sectionRef = useRef(null);

  return (
    <div className="mt-28 lg:mt-52 flex flex-col justify-center items-center w-full p-6 lg:px-8 xl:px-24 lg:py-36 gap-y-16 standards-bg" ref={sectionRef}>
    <div className="w-4/5 lg:w-1/2 mt-12 lg:mt-0">
      <h2 className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase text-center fade-up-standards">Setting a<br/> Stronger Standard</h2>
      <p className="text-[#f3f3f6] text-base lg:text-[1.375rem] lg:leading-[1.75rem] lg:text-xl text-center fade-up-standards">Create with color that can outlive the building.</p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[30px] justify-around w-full max-w-[1300px]">
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group transition-all duration-400 fade-up-standards">
        <Image src="/images/standards-1.svg" alt="chevron-img" width={36} height={36} />
        <h3 className="font-[Urdwin] text-3xl lg:text-3xl text-[#f3f3f6] uppercase transition-colors duration-300 lg:w-2/3">Utilizes 30% less mortar than clay bricks</h3>
      </div> 
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group transition-all duration-400 fade-up-standards">
        <Image src="/images/standards-2.svg" alt="chevron-img" width={36} height={36} />
        <h3 className="font-[Urdwin] text-3xl lg:text-3xl text-[#f3f3f6] uppercase transition-colors duration-300 lg:w-4/5">Requires virtually no maintenance</h3>
      </div> 
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group transition-all duration-400 fade-up-standards">
        <Image src="/images/standards-3.svg" alt="chevron-img" width={36} height={36} />
        <h3 className="font-[Urdwin] text-3xl lg:text-3xl text-[#f3f3f6] uppercase transition-colors duration-300 lg:w-3/5">110 year warranty comes standard</h3>
      </div> 
    </div>
  </div>
  )
}

export default Standards;