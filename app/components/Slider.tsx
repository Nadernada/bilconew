'use client'

import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);


SwiperCore.use([FreeMode, Mousewheel]);


const sliderSlides = [
  {
    front: "/images/slider-2.png",
    back: "/images/slider-q.png",
    text: "Augusta Green",
    color: "#006341"
  },
  {
    front: "/images/slider-4.png",
    back: "/images/slider-3.png",
    text: "Glamour Pink",
    color: "#F2CDD4"
  },
  {
    front: "/images/slider-6.png",
    back: "/images/slider-5.png",
    text: "Lone Star Orange",
    color: "#B84001"
  },
  {
    front: "/images/slider-8.png",
    back: "/images/slider-7.png",
    text: "desert DUNE",
    color: "#CFBA9C"
  },
  {
    front: "/images/slider-10.png",
    back: "/images/slider-9.png",
    text: "Iceberg Blue",
    color: "#ABBCCC"
  }
]



interface SliderProps {
  font: NextFontWithVariable
}

const Slider: React.FC<SliderProps> = ({ font }) => {
  const swiperRef = useRef<SwiperType | null>(null);  const [flipCardIndex, setFlipCardIndex] = useState(-1);

  useEffect(() => {
    console.log(flipCardIndex);
    
  }, [flipCardIndex])

  const sectionRef = useRef(null);

  // useGSAP(
  //   () => {
  //     gsap.from('.fade-up-slider', {
  //       y: 70,
  //       opacity: 0,
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: 'top bottom',
  //         end: 'center bottom',
  //         scrub: true,
  //         // markers: true,
  //       },
  //     });
  //   }, { scope: sectionRef }
  // );


  return (
    <div className="mt-24 flex flex-col items-center ps-0 lg:ps-52" ref={sectionRef}>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="w-4/5 lg:w-1/3 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[5.25rem] leading-[3rem] lg:leading-[5.3rem] uppercase fade-up-slider`}><span className="text-bg">Color</span><br/>that inspires</h2>
            <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] fade-up-slider">If you aspire to create stunning structures that are a reflection of your life’s work, consider how the Bilco Professional Line of concrete bricks can <span className="text-[#f3f3f6]">brighten your next project.</span></p>
          </div>

          <div className="lg:flex flex-row gap-x-4 justify-center self-end hidden me-56">
            <button 
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center fade-up-slider"
              onClick={() => swiperRef?.current?.slidePrev()}
            >
              <Image src="/images/chevron-left.svg" alt="brick-img" width={12} height={32} />
            </button>
            <button
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center fade-up-slider"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image src="/images/chevron-right.svg" alt="brick-img" width={12} height={32} />
            </button>
          </div>
        </div>

        <div className="w-full mt-6 fade-up-slider p-6 lg:p-6" >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            // slidesPerView={3.25}
            autoplay={false}
            navigation={false}
            freeMode={true}               // Enable free mode for smooth transitions
            mousewheel={{ forceToAxis: true }}  // Enable mousewheel and set to axis for horizontal scrolling
            grabCursor={true}      
            resizeObserver={true}
            updateOnWindowResize={true}
            breakpoints={{
              428: {
                slidesPerView: 1
              },
              768: {
                slidesPerView: 1.25
              },
              926: {
                slidesPerView: 2.25
              },
              1023: {
                slidesPerView: 3.25
              },
            }}
          >
            {
              sliderSlides.map((card, i) => (

                <SwiperSlide key={i}>
                  <div className="rounded-3xl p-3 lg:p-6 px-0 lg:ps-0 flex flex-col gap-y-3 relative">
                    <div className="absolute top-0 right-0 flex flex-row gap-x-3 justify-center items-center m-6 lg:m-12 z-40">
                      <p className="text-slate-800 text-sm">FLIP</p>
                      <div 
                        className="flex justify-center p-3 rounded-full bg-slate-800 cursor-pointer" 
                        onClick={() => { 
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          flipCardIndex === i ? setFlipCardIndex(-1) : setFlipCardIndex(i);
                        }}
                      >
                        <Image src="/images/flip-icon.svg" alt="flip-icon-img" width={20} height={19} className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="w-full relative">
                      <Image src={card.front} alt="brick-img" width={480} height={525} className="w-full opacity-0" />

                      <div className="w-full card absolute h-full top-0 left-0" style={{ perspective: '5000px' }}>
                        <div className="relative card-inner w-full h-full" style={ flipCardIndex === i ? { transform: 'rotateY(180deg)' } : {  }}>
                          <Image src={card.front} alt="brick-img" width={480} height={525} className="w-full h-full absolute front-face" />
                          <Image src={card.back} alt="brick-img" width={480} height={525} className="w-full h-full absolute back-face" style={{ transform: 'rotateY(180deg)'}} />
                        </div>

                      </div>
                    </div>
                    <div className="flex flex-row gap-x-3 justify-start items-center">
                      <div className="w-6 h-6 rounded-md" style={{ backgroundColor: card.color }}></div>
                      <p className="text-[#f3f3f6] text-base uppercase">{card.text}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className="lg:hidden flex-row gap-x-4 justify-center lg:self-end flex">
            <button 
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center fade-up-slider"
              onClick={() => swiperRef?.current?.slidePrev()}
            >
              <Image src="/images/chevron-left.svg" alt="brick-img" width={12} height={32} />
            </button>
            <button
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center fade-up-slider"
              onClick={() => swiperRef?.current?.slideNext()}
            >
              <Image src="/images/chevron-right.svg" alt="brick-img" width={12} height={32} />
            </button>
          </div>
      </div>
  );
};

export default Slider;