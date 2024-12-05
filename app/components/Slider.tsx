'use client'

import Image from "next/image";
import { useRef, useState } from "react";
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


const Slider = () => {
  const swiperRef = useRef<SwiperType | null>(null);  const [flipCardIndex, setFlipCardIndex] = useState(-1);

  const sectionRef = useRef(null);


  return (
    <div className="mt-24 flex flex-col items-center lg:items-start ps-0 lg:ps-8 xl:ps-36 2xl:ps-['calc((100vw - 1300px) / 2)']" ref={sectionRef}>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start max-w-[1330px]">
          <div className="w-4/5 lg:w-[55%] text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase fade-up-slider"><span className="text-bg">Color</span><br/>that inspires</h2>
            <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] fade-up-slider">If you aspire to create stunning structures that are a reflection of your life’s work, consider how the Bilco Professional Line of concrete bricks can <span className="text-[#f3f3f6]">brighten your next project.</span></p>
          </div>

          <div className="lg:flex flex-row gap-x-4 justify-center self-end hidden me-0 ">
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

        <div className="w-full mt-6 fade-up-slider p-6 lg:p-6 lg:ps-0" >
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
              328: {
                slidesPerView: 1.25,
              },
              428: {
                slidesPerView: 1.25,
              },
              768: {
                slidesPerView: 1.25,
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
                  <div className="rounded-3xl p-3 lg:p-6 ps-0 lg:ps-0 flex flex-col gap-y-3 relative">
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