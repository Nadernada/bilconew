'use client'

import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ParallelBrickProps {
  font: NextFontWithVariable
}

const ParallelBrick: React.FC<ParallelBrickProps> = ({ font }) => {
  const brickCutRef = useRef(null);
  const brickSectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(brickCutRef.current, {
        y: 30,
        x: 50,
        scrollTrigger: {
          trigger: brickSectionRef.current,
          start: 'top bottom',
          end: 'center 80%',
          scrub: true,
          // markers: true,
        },
      });
    }
  );


  return (
    <div className="mt-24 flex flex-col lg:flex-row justify-start items-center" ref={brickSectionRef}>
      <div className="w-1/2 relative">
        <Image src="/images/Blue-Brick.png" alt="brick-img" width={500} height={200} className="absolute bottom-[10px] left-0 w-[32vw]" />
        <Image src="/images/Blue-Brick.png" alt="brick-img" width={500} height={200} className="opacity-0" />
        <Image src="/images/Blue-Brick-cut.png" alt="brick-img" width={500} height={200} className="absolute bottom-[1.5vw] left-[42%] w-[19vw]" ref={brickCutRef} />
      </div>

      <div className="w-2/3 lg:w-1/3  text-center lg:text-left flex flex-col items-center lg:items-start mt-12 lg:mt-0">
        <h3 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase`}><span className="text-bg">Colored</span><br/>to the core</h3>
        <p className="text-[#969696] text-base">Get unparalleled, deep color seamlessly mixed <span className="text-white">throughout every millimeter of concrete</span>, from the inside out. Full spectrum. Full coverage.</p>
      </div>
    </div>
  );
};

export default ParallelBrick;