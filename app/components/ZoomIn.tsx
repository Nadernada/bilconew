'use client'

import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ZoomInProps {
  font: NextFontWithVariable
}

const ZoomIn: React.FC<ZoomInProps> = ({ font }) => {

  const brickRef = useRef(null);
  const brickSectionRef = useRef(null);
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);

  useGSAP(() => {
    gsap.to(brickRef.current, {
      width: '1300px',
      scrollTrigger: {
        trigger: brickSectionRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: 1.5,
        pin: true, // Pins the element in place during the animation
        pinSpacing: true, // Ensures space is maintained when pinned
        markers: true, // Debugging markers for ScrollTrigger
      },
    });
  });
  

  return (
    <div className="mt-40 lg:pt-24 flex flex-col items-center">
        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="mt-12 mb-20 lg:hidden scale-[2.5] md:scale-150" />
        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="my-16 lg:hidden" />
        <h2 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase text-center`} ref={textTopRef}>Weather Any Weather</h2>
        <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center w-4/5 lg:w-full" ref={textBottomRef}>Endure the wear and tear of typical fading and sun damage. Build it brighter. Build it to last.</p>
        <div className=" "  ref={brickSectionRef}>

        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="mt-0 mx-auto hidden lg:block !h-auto  w-[120vw] max-w-none" ref={brickRef}  />
        </div>


        <div className="mt-28 pt-28 lg:pt-0 flex flex-col lg:flex-row justify-between items-center lg:items-start w-full lg:w-[77%] bg-black lg:bg-transparent max-w-[1300px]">
          <h2 className={`${font.className} antialiased text-[#F3F3F6] text-center lg:text-left font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase fade-up-zoom`}>Custom<br /> Created</h2>
          <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem]  w-4/5 lg:w-1/2 text-center lg:text-left fade-up-zoom">Unlike mass produced clay bricks, every batch of the Bilco Professional Line is <span className="text-[#f3f3f6]">made to order.</span> <br/><br/>Through this personalized manufacturing process, the bricks are guaranteed to reflect your vision.</p>
          <Image src="/images/brick-pattern-mobile.png" alt="brick-img" width={1302} height={463} className="mt-24 w-full max-w-none aspect-auto object-cover flex sm:hidden fade-up-zoom" />
        </div>

        <Image src="/images/brick-pattern.png" alt="brick-img" width={1302} height={463} className="mt-24 w-auto lg:w-full max-w-none lg:max-w-full h-svh lg:h-auto hidden sm:flex fade-up-zoom" />
      </div>
  );
};

export default ZoomIn;