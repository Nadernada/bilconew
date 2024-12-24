'use client'

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useRef, useState } from "react";



gsap.registerPlugin(useGSAP, ScrollTrigger);

const ZoomIn = () => {

  const brickRef = useRef(null);
  const brickSectionRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Handle image load event to ensure the image is fully loaded before animating
  const handleImageLoad = () => {
    setIsImageLoaded(true);
    ScrollTrigger.refresh()
  };

  useGSAP(() => {
    gsap.to(brickRef.current, {
      // width: '120vw',
      scale: 1,
      scrollTrigger: {
        trigger: brickSectionRef.current,
        start: 'top center',
        end: '80% 60%',
        scrub: 1,
        // pin: true, // Pins the element in place during the animation
        // pinSpacing: true, // Ensures space is maintained when pinned
        // markers: true, // Debugging markers for ScrollTrigger
      },
    });
  }, [isImageLoaded]);

  
  

  return (
    <div className="mt-40 lg:pt-24 flex flex-col items-center overflow-hidden">
        {/* <Image src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="mt-12 mb-20 lg:hidden scale-[2.5] md:scale-150" />
        <Image src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="my-16 lg:hidden" /> */}
        <h2 className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase text-center mx-6 lg:mx-0">Weather Any Weather</h2>
        <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center w-4/5 2xl:w-[35%] mx-6 lg:mx-0  lg:px-8 xl:px-0" >Endure the wear and tear of typical fading and sun damage. Build it brighter. Build it to last.</p>
        <div className="flex flex-col items-center max-w-[1300px] mt-12 lg:px-8 xl:px-0"  ref={brickSectionRef}>

        <Image src="/images/yellow-brick.png" alt="brick-img" width={1300} height={356} className="mt-0 mx-auto block w-full lg:w-full xl:w-[90%] 2xl:w-[1300px] scale-[2] h-auto max-w-none" ref={brickRef} onLoad={handleImageLoad} style={{ transformOrigin: 'top center'}} />
        </div>


        <div className="mt-28 pt-28 lg:pt-0 sm:pb-24 lg:pb-0 flex flex-col lg:flex-row justify-between items-center lg:items-start w-full lg:px-8 xl:px-0 xl:w-[80%] bg-black lg:bg-transparent max-w-[1300px]">
          <h2 className="font-[Urdwin] antialiased text-[#F3F3F6] text-center lg:text-left font-bold text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase fade-up-zoom">Custom<br /> Created</h2>
          <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem]  w-4/5 lg:w-1/2 text-center lg:text-left fade-up-zoom">Unlike mass produced clay bricks, every batch of the Bilco Professional Line is <span className="text-[#f3f3f6]">made to order.</span> <br/><br/>Through this personalized manufacturing process, the bricks are guaranteed to reflect your vision.</p>
          <Image src="/images/brick-pattern-mobile.png" alt="brick-img" width={1302} height={463} className="mt-24 w-full max-w-none aspect-auto object-cover flex md:hidden fade-up-zoom" />
        </div>

        <Image src="/images/brick-pattern.png" alt="brick-img" width={1302} height={463} className="mt-0 lg:mt-24 w-auto lg:w-full max-w-none lg:max-w-full h-svh lg:h-auto hidden md:flex fade-up-zoom" />
      </div>
  );
};

export default ZoomIn;