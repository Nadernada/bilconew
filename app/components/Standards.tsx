'use client'

import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";

interface StandardsProps {
  font: NextFontWithVariable
}


const Standards: React.FC<StandardsProps> = ({ font }) => {
  return (
    <div className="mt-24 flex flex-col justify-center items-center w-full p-12 lg:p-24 gap-y-16 standards-bg">
    <div className="w-2/3 lg:w-1/2">
      <h3 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[4rem] leading-[3rem] lg:leading-[4rem] uppercase text-center`}>Setting a<br/> Stronger Standard</h3>
      <p className="text-[#969696] text-lg lg:text-base text-center"><span className="text-white">Create with color</span> that can outlive the building.</p>

    </div>

    <div className="flex flex-col lg:flex-row gap-8 justify-around w-full">
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group hover:bg-white transition-all duration-400">
        <Image src="/images/standards-1.svg" alt="chevron-img" width={36} height={36} className="group-hover:invert" />
        <h4 className={`${font.className} text-3xl lg:text-2xl text-white uppercase w-full lg:w-2/3 group-hover:text-black transition-colors duration-300`}>Utilizes 30% less mortar than clay bricks</h4>
      </div> 
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group hover:bg-white transition-all duration-400">
        <Image src="/images/standards-2.svg" alt="chevron-img" width={36} height={36} className="group-hover:invert" />
        <h4 className={`${font.className} text-3xl lg:text-2xl text-white uppercase w-full lg:w-2/3 group-hover:text-black transition-colors duration-300`}>Structural integrity lasts 5X longer than clay</h4>
      </div> 
      <div className="flex flex-col justify-center items-start gap-y-6 p-8 bg-black rounded-2xl group hover:bg-white transition-all duration-400">
        <Image src="/images/standards-3.svg" alt="chevron-img" width={36} height={36} className="group-hover:invert" />
        <h4 className={`${font.className} text-3xl lg:text-2xl text-white uppercase w-full lg:w-2/3 group-hover:text-black transition-colors duration-300`}>110 year warranty comes standard</h4>
      </div> 
    </div>
  </div>
  )
}

export default Standards;