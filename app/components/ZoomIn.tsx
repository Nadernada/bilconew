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

  useGSAP(
    () => {
      gsap.from(brickRef.current, {
        width: '120vw',
        pin: true,
        // y: 300,
        // opacity: 0,
        scrollTrigger: {
          trigger: brickSectionRef.current,
          start: '15% bottom',
          end: '30% bottom',
          scrub: true,
          // markers: true,
        },
      });
      // gsap.from(textTopRef.current, {
      //   y: 100,
      //   opacity: 0, 
      //   scrollTrigger: {
      //     trigger: brickSectionRef.current,
      //     start: 'top bottom',
      //     end: 'center bottom',
      //     scrub: true,
      //     // markers: true,
      //   },
      // });
      // gsap.from(textBottomRef.current, {
      //   y: 100,
      //   opacity: 0,
      //   scrollTrigger: {
      //     trigger: brickSectionRef.current,
      //     start: 'top bottom',
      //     end: 'center bottom',
      //     scrub: true,
      //     // markers: true,
      //   },
      // });
      // gsap.from('.fade-up-zoom', {
      //   y: 100,
      //   opacity: 0,
      //   scrollTrigger: {
      //     trigger: brickSectionRef.current,
      //     start: 'top bottom',
      //     end: 'center bottom',
      //     // scrub: true,
      //     // markers: true,
      //   },
      // });
    }
  );

  return (
    <div className="mt-40 lg:pt-24 flex flex-col items-center" ref={brickSectionRef}>
        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="mt-12 mb-20 lg:hidden scale-[2.5] md:scale-150" ref={brickRef} />
        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="my-16 lg:hidden" ref={brickRef} />
        <h2 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase text-center`} ref={textTopRef}>Weather Any Weather</h2>
        <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center w-4/5 lg:w-full" ref={textBottomRef}>Endure the wear and tear of typical fading and sun damage. Build it brighter. Build it to last.</p>
        <Image src="/images/gray-brick.webp" alt="brick-img" width={1300} height={356} className="mt-0 hidden lg:block  w-[1300px] max-w-none origin-top" ref={brickRef} />


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