'use client'

import Image from "next/image";
import NavBar from "./components/NavBar";
import localFont from "next/font/local";
import ThreeScene from "./ThreeScene";
import 'swiper/css'
import { useEffect, useRef, useState } from "react";
import Standards from "./components/Standards";
import ParallelBrick from "./components/ParallelBrick";
import ZoomIn from "./components/ZoomIn";
import Slider from "./components/Slider";
import Contact from "./components/Contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';



gsap.registerPlugin(useGSAP, ScrollTrigger);


const urdwinBoldMono = localFont({
  src: "./fonts/URWDINCond-Bold.ttf",
  variable: "--font-geist-mono",
  weight: "700",
});

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playButtonRef = useRef<any | null | undefined>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const magneticStrength = 300; // Adjust for magnetic range
  const textTopRef = useRef(null);
  const textBottomRef = useRef(null);
  const lineTextRef = useRef(null);
  const lineRef = useRef(null);
  const footerRef = useRef(null);


  useGSAP(
    () => {
      gsap.from(textTopRef.current, {
        y: 200,
        opacity: 0,
        start: 'top 60%',
        end: 'top 0%',
        scrub: true,
        ease: 'expo.out',
        duration: 2,
        delay: 1
      });
      gsap.from(textBottomRef.current, {
        y: 200,
        opacity: 0,
        start: 'top 60%',
        end: 'top 0%',
        scrub: true,
        ease: 'expo.out',
        duration: 2,
        delay: 1.5
      });
      gsap.from(lineTextRef.current, {
        y: 200,
        opacity: 0,
        start: 'top 60%',
        end: 'top 0%',
        scrub: true,
        ease: 'expo.out',
        duration: 1
      });
      gsap.from(lineRef.current, {
        scaleX: 0,
        start: 'top 60%',
        end: 'top 0%',
        scrub: true,
        ease: 'expo.out',
        duration: 1,
        delay: 0.5
      });
      gsap.from('.fade-up-footer', {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'center bottom',
          scrub: true,
          // markers: true,
        },
      });
    }
  );
  
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (playButtonRef.current) {
        const buttonRect= playButtonRef.current.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;

        const deltaX = event.clientX - buttonX;
        const deltaY = event.clientY - buttonY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Adjusted distance checks
        if (distance < magneticStrength) {
          const angle = Math.atan2(deltaY, deltaX);
          const intensity = Math.max(0, (1 - distance / magneticStrength) * 10);
          const offsetX = Math.cos(angle) * intensity;
          const offsetY = Math.sin(angle) * intensity;

          // Smoothing the transition
          setButtonPosition((prev) => ({
            x: prev.x + (offsetX - prev.x) * 0.1,
            y: prev.y + (offsetY - prev.y) * 0.1,
          }));
        } else {
          setButtonPosition({ x: 0, y: 0 });
        }
      }
    };

    const optimizedMouseMove = (event: MouseEvent) => {
      requestAnimationFrame(() => handleMouseMove(event));
    };

    window.addEventListener('mousemove', optimizedMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', optimizedMouseMove);
    };
  }, [playButtonRef.current]);



  return (
    <div className="w-full bg-[#090A0A] relative overflow-x-hidden">

      <NavBar />

      <dialog className=" h-screen w-screen bg-[#000000cc] focus-visible:outline-none p-14 z-50 backdrop:bg-[#000000cc]" ref={dialogRef}>
          <div className="w-full p-4 flex justify-end">
            <p className="text-black bg-white rounded-full w-12 h-12 flex justify-center items-center text-lg cursor-pointer hover:bg-transparent hover:text-white duration-300 border border-white transition-colors"
            onClick={() => dialogRef.current?.close()}
            >X</p>
          </div>
        <div className="w-full h-[90%] rounded-2xl overflow-hidden relative group">
          <div
            className="absolute w-full h-full top-0 left-0 group-hover:opacity-100 opacity-0 transition-all duration-300 delay-200 bg-slate-950/30 flex justify-center items-center cursor-pointer z-30"
            onClick={() => {
              if(videoRef.current?.paused) {
                videoRef.current?.play();
              } else {
                videoRef.current?.pause();
              }
            }}
          >
            {
              !videoRef.current?.paused ? (
                <Image src="/images/pause-svgrepo-com.svg" alt="pause-img" width={31} height={36} className="invert" />
              ): (
                <Image src="/images/chevron-right.svg" alt="chevron-img" width={31} height={36} className="" />
              )
            }
          </div>
          <video src="/images/hero-video.mp4" className="object-cover !max-w-none" autoPlay muted loop ref={videoRef}></video>
        </div>
      </dialog>
      <div className="w-screen relative h-fit overflow-hidden">
        <div className="h-screen lg:h-fit w-auto lg:w-full z-0 overflow-hidden">
          <video src="/images/hero-video.mp4" className="object-cover !max-w-none"></video>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-24">
          <div className="w-full flex flex-col justify-center items-center gap-y-6 z-10 relative mt-48 lg:mt-0">
            <div className="overflow-hidden">
              <h1 className={`${urdwinBoldMono.className} antialiased text-[#F3F3F6] font-bold text-[2rem] uppercase`} ref={lineTextRef}>professional line</h1>
            </div>
            <Image src="/images/hero-rainbow.png" alt="rainbow-img" width={400} height={2} ref={lineRef} />
            <div className="flex flex-col justify-center items-center">

              <div className="overflow-hidden">
                <h2
                  className={`${urdwinBoldMono.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[8rem] leading-[3rem] lg:leading-[8rem] uppercase text-center text-shadow`}
                  ref={textTopRef}
                  >
                  GO BOLD WITH
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2
                  className={`${urdwinBoldMono.className} antialiased text-[#F3F3F6] font-bold text-[3rem] lg:text-[8rem] leading-[3rem] lg:leading-[8rem] uppercase text-center text-shadow`}
                  ref={textBottomRef}
                  >
                  BILCO BRICK
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-6 justify-center items-center z-10 relative w-full pb-24">
            <div className="w-12 h-12 rounded-full border border-slate-100 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors group duration-300" ref={playButtonRef}
              style={{ transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)` }}
              onClick={() => dialogRef.current?.showModal()}
            >
              <Image src="/images/chevron-right.svg" alt="chevron-img" width={11} height={16} className="group-hover:invert transition-all duration-300" />
            </div>
            <p className="text-[#969696] text-lg lg:text-xl text-center">The only concrete brick that’s colored to the core.</p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div>
          <h3 className={`${urdwinBoldMono.className} antialiased text-[#F3F3F6] font-bold  text-[3rem] lg:text-[4rem] leading-[3rem] lg:leading-[4rem] uppercase text-center`}><span className="text-bg">explore the</span><br/>full spectrum</h3>
        </div>

        <div>
          <ThreeScene />
        </div>
      </div>

      <Standards font={urdwinBoldMono} />


      <ParallelBrick font={urdwinBoldMono} />

      <ZoomIn font={urdwinBoldMono} />

      <Slider font={urdwinBoldMono} />


      <Contact font={urdwinBoldMono} />


      <div className="mt-0 footer p-12 lg:p-28 lg:pb-12 ps-12 2xl:ps-80 bg-black  fade-up-footer"  ref={footerRef}>
        <div className="flex flex-col gap-y-12 justify-start  fade-up-footer">
          <Image src="/images/bilco-logo.png" alt="bilco logo" width={175} height={28}/>

          <p className="text-[#969696] text-sm text-left fade-up-footer">If you’d like more information about our products or <br />would like to place an order, please call, email or fax us:</p>

          <div className="flex flex-col gap-y-4 fade-up-footer">
            <p className="text-white text-sm text-left">Phone: (972) 227-3380</p>
            <p className="text-white text-sm text-left">Email: info@BilcoBrick.com</p>
          </div>

          <p className="text-white text-sm text-left fade-up-footer">bilcobrick.com</p>

          <div className="flex flex-row justify-start items-center gap-x-3 fade-up-footer">
            <Image src="/images/ig-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>
            <Image src="/images/fb-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>
            <Image src="/images/linkedin-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>

          </div>

          <p className="text-[#969696] text-sm text-left fade-up-footer">© 2024 Bilco Corporation  |  All Rights Reserved  | Terms of Use</p>


        </div>
      </div>
          <Image src="/images/footer-bricks.png" alt="bilco logo" width={175} height={28} className="flex lg:hidden w-full fade-up-footer"/>
      
    </div>
  );
};

export default Home;