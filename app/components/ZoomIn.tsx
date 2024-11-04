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

  useGSAP(
    () => {
      gsap.from(brickRef.current, {
        scale: 2,
        y: 100,
        // opacity: 0,
        scrollTrigger: {
          trigger: brickSectionRef.current,
          start: 'top 80%',
          end: 'center 30%',
          scrub: true,
          // markers: true,
        },
      });
    }
  );

  return (
    <div className="mt-48 flex flex-col items-center" ref={brickSectionRef}>
        <h3 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase text-center`}>Weather Any Weather</h3>
        <p className="text-[#969696] text-base text-center">Endure the wear and tear of typical fading and sun damage. Build it brighter. Build it to last.</p>
        <Image src="/images/gray-brick.png" alt="brick-img" width={1302} height={463} className="mt-24" ref={brickRef} />


        <div className="mt-28 flex flex-col lg:flex-row justify-around items-center lg:items-start">
          <h3 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase`}>Custom<br /> Created</h3>
          <p className="text-[#969696] text-base w-4/5 lg:w-1/2 text-center lg:text-left">Unlike mass produced clay bricks, every batch of the Bilco Professional Line is <span className="text-white">made to order.</span> <br/><br/>Through this personalized manufacturing process, the bricks are guaranteed to match your vision.</p>
        </div>

        <Image src="/images/brick-pattern.png" alt="brick-img" width={1302} height={463} className="mt-24 w-auto lg:w-full max-w-none lg:max-w-full h-svh lg:h-auto hidden sm:flex" />
        <Image src="/images/brick-pattern-mobile.png" alt="brick-img" width={1302} height={463} className="mt-24 w-full max-w-none aspect-auto object-cover flex sm:hidden" />
      </div>
  );
};

export default ZoomIn;