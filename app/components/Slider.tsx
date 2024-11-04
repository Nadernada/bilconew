'use client'

import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';



interface SliderProps {
  font: NextFontWithVariable
}

const Slider: React.FC<SliderProps> = ({ font }) => {
  const swiperRef = useRef<SwiperType | null>(null);  const [flipCardIndex, setFlipCardIndex] = useState(-1);

  useEffect(() => {
    console.log(flipCardIndex);
    
  }, [flipCardIndex])


  return (
    <div className="mt-24 flex flex-col items-center ps-6 lg:ps-36">

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="w-4/5 lg:w-1/3 text-center lg:text-left flex flex-col items-center lg:items-start">
            <h3 className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase`}><span className="text-bg">Color</span><br/>that inspires</h3>
            <p className="text-[#969696] text-base">If you aspire to create stunning structures that are a reflection of your life’s work, consider how the Bilco Professional Line of concrete bricks can <span className="text-white">brighten your next project.</span></p>
          </div>

          <div className="lg:flex flex-row gap-x-4 justify-center self-end hidden">
            <button 
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center"
              onClick={() => swiperRef?.current?.slidePrev()}
            >
              <Image src="/images/left-chevron.svg" alt="brick-img" width={8} height={16} />
            </button>
            <button
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <Image src="/images/right-chevron.svg" alt="brick-img" width={8} height={16} />
            </button>
          </div>
        </div>

        <div className="w-full mt-6" >
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={3.3}
            autoplay={true}
            navigation={false}
            className="w-full"
            breakpoints={{
              428: {
                slidesPerView: 1.5
              },
              768: {
                slidesPerView: 2.5
              },
            }}
          >
            {
              Array(6).fill("card").map((card, i) => (

                <SwiperSlide key={i}>
                  <div className="rounded-3xl p-6 flex flex-col gap-y-3 relative">
                    <div className="absolute top-0 right-0 flex flex-row gap-x-3 justify-center items-center m-12 z-40">
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
                      <Image src="/images/slide-1.png" alt="brick-img" width={480} height={525} className="w-full opacity-0" />

                      <div className="w-full card absolute h-full top-0 left-0" style={{ perspective: '5000px' }}>
                        <div className="relative card-inner w-full h-full" style={ flipCardIndex === i ? { transform: 'rotateY(180deg)' } : {  }}>
                          <Image src="/images/slide-1.png" alt="brick-img" width={480} height={525} className="w-full h-full absolute front-face" />
                          <Image src="/images/flip-1.png" alt="brick-img" width={480} height={525} className="w-full h-full absolute back-face" style={{ transform: 'rotateY(180deg)'}} />
                        </div>

                      </div>
                    </div>
                    <p className="text-white text-base">pms 17-9843</p>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className="lg:hidden flex-row gap-x-4 justify-center lg:self-end flex">
            <button 
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center"
              onClick={() => swiperRef?.current?.slidePrev()}
            >
              <Image src="/images/left-chevron.svg" alt="brick-img" width={8} height={16} />
            </button>
            <button
              className="rounded-full w-12 h-12 bg-[#2D2D2F] flex justify-center items-center"
              onClick={() => swiperRef?.current?.slideNext()}
            >
              <Image src="/images/right-chevron.svg" alt="brick-img" width={8} height={16} />
            </button>
          </div>
      </div>
  );
};

export default Slider;