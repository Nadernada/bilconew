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
        y: 60,
        x: 80,
        scrollTrigger: {
          trigger: brickSectionRef.current,
          start: 'top bottom',
          end: '90% top',
          scrub: true,
          // markers: true,
        },
      });
      // gsap.from('.fade-up', {
      //   y: 70,
      //   opacity: 0,
      //   scrollTrigger: {
      //     trigger: brickSectionRef.current,
      //     start: 'top bottom',
      //     end: 'center bottom',
      //     scrub: true,
      //     // markers: true,
      //   },
      // });
    }
  );


  return (
    <div className="mt-0 lg:my-48 flex flex-col lg:flex-row justify-start items-center" ref={brickSectionRef}>
      <div className="w-full lg:w-1/2 relative">
        <Image src="/images/brick-cut2.png" alt="brick-img" width={500} height={200} className="absolute bottom-[10px] left-0 w-[65vw] lg:w-[32vw]" />
        <Image src="/images/brick-cut2.png" alt="brick-img" width={500} height={300} className="opacity-0" />
        <Image src="/images/brick-cut.png" alt="brick-img" width={500} height={200} className="absolute bottom-[-1.5vw] left-[33%] w-[51vw] lg:w-[25vw]" ref={brickCutRef} />
      </div>

      <div className="w-4/5 lg:w-1/3  text-center lg:text-left flex flex-col items-center lg:items-start mt-24 lg:mt-0 fade-up">
        <h2 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase`}><span className="text-bg">Colored</span><br/>to the core</h2>
        <p className="text-[#969696] text-base w-full">Get unparalleled, deep color seamlessly mixed <span className="text-[#f3f3f6]">throughout every millimeter of concrete</span>, from the inside out. Full spectrum. Full coverage.</p>
      </div>
    </div>
  );
};

export default ParallelBrick;