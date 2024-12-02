'use client'

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger);


const ParallelBrick = () => {
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
    }
  );


  return (
    <div className="mt-0 lg:my-48 xl:my-72 flex flex-col lg:flex-row justify-start items-center" ref={brickSectionRef}>
      <div className="w-full lg:w-1/2 relative">
        <Image src="/images/brick-cut2.png" alt="brick-img" width={500} height={200} className="absolute bottom-[10px] lg:bottom-[53px] xl:bottom-[10px] left-0 w-[65vw] md:w-[50vw] lg:w-[32vw]" />
        <Image src="/images/brick-cut2.png" alt="brick-img" width={500} height={300} className="opacity-0" />
        <Image src="/images/brick-cut.png" alt="brick-img" width={500} height={200} className="absolute bottom-[-1.5vw] lg:bottom-[3rem] xl:bottom-[-1.5vw] left-[33%] w-[51vw] md:w-[38vw] lg:w-[25vw]" ref={brickCutRef} />
      </div>

      <div className="w-4/5 lg:w-1/2 xl:w-1/3  text-center lg:text-left flex flex-col items-center lg:items-start mt-24 lg:mt-0 fade-up mx-auto lg:me-0 xl:me-auto ">
        <h2 className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase"><span className="text-bg">Colored</span><br/>to the core</h2>
        <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] w-full lg:w-4/5">Get unparalleled, deep color seamlessly mixed <span className="text-[#f3f3f6]">throughout every millimeter of concrete</span>, from the inside out. Full spectrum. Full coverage.</p>
      </div>
    </div>
  );
};

export default ParallelBrick;