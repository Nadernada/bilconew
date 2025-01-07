'use client'

import Image from "next/image";
import NavBar from "./components/NavBar";
import ThreeScene from "./ThreeScene";
import 'swiper/css'
import { useRef, useState } from "react";
import Standards from "./components/Standards";
import ParallelBrick from "./components/ParallelBrick";
import ZoomIn from "./components/ZoomIn";
import Slider from "./components/Slider";
import Contact from "./components/Contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import Link from "next/link";



gsap.registerPlugin(useGSAP, ScrollTrigger);


const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playButtonRef = useRef<any | null | undefined>(null);
  // const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const lineRef = useRef(null);
  const footerRef = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);



  // useGSAP(
  //   () => {
  //     gsap.from(textTopRef.current, {
  //       y: 200,
  //       opacity: 0,
  //       start: 'top 60%',
  //       end: 'top 0%',
  //       scrub: true,
  //       ease: 'expo.out',
  //       duration: 2,
  //       delay: 1
  //     });
  //     gsap.from(textBottomRef.current, {
  //       y: 200,
  //       opacity: 0,
  //       start: 'top 60%',
  //       end: 'top 0%',
  //       scrub: true,
  //       ease: 'expo.out',
  //       duration: 2,
  //       delay: 1.5
  //     });
  //     gsap.from(lineTextRef.current, {
  //       y: 200,
  //       opacity: 0,
  //       start: 'top 60%',
  //       end: 'top 0%',
  //       scrub: true,
  //       ease: 'expo.out',
  //       duration: 1
  //     });
  //     gsap.from(lineRef.current, {
  //       scaleX: 0,
  //       start: 'top 60%',
  //       end: 'top 0%',
  //       scrub: true,
  //       ease: 'expo.out',
  //       duration: 1,
  //       delay: 0.5
  //     });
  //     gsap.from('.fade-up-footer', {
  //       y: 100,
  //       opacity: 0,
  //       scrollTrigger: {
  //         trigger: footerRef.current,
  //         start: 'top bottom',
  //         end: 'center bottom',
  //         scrub: true,
  //         // markers: true,
  //       },
  //     });
  //   }
  // );
  
  
  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (playButtonRef.current) {
  //       const buttonRect= playButtonRef.current.getBoundingClientRect();
  //       const buttonX = buttonRect.left + buttonRect.width / 2;
  //       const buttonY = buttonRect.top + buttonRect.height / 2;

  //       const deltaX = event.clientX - buttonX;
  //       const deltaY = event.clientY - buttonY;
  //       const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  //       // Adjusted distance checks
  //       if (distance < magneticStrength) {
  //         const angle = Math.atan2(deltaY, deltaX);
  //         const intensity = Math.max(0, (1 - distance / magneticStrength) * 10);
  //         const offsetX = Math.cos(angle) * intensity;
  //         const offsetY = Math.sin(angle) * intensity;

  //         // Smoothing the transition
  //         setButtonPosition((prev) => ({
  //           x: prev.x + (offsetX - prev.x) * 0.1,
  //           y: prev.y + (offsetY - prev.y) * 0.1,
  //         }));
  //       } else {
  //         setButtonPosition({ x: 0, y: 0 });
  //       }
  //     }
  //   };

  //   const optimizedMouseMove = (event: MouseEvent) => {
  //     requestAnimationFrame(() => handleMouseMove(event));
  //   };

  //   window.addEventListener('mousemove', optimizedMouseMove);
    
  //   return () => {
  //     window.removeEventListener('mousemove', optimizedMouseMove);
  //   };
  // }, [playButtonRef.current]);



  return (
    <div className="w-full bg-[#090A0A] relative overflow-x-hidden">

      <NavBar />

      <dialog className=" h-screen w-screen bg-[#000000cc] focus-visible:outline-none p-0 z-50 backdrop:bg-[#000000cc] sticky top-0" ref={dialogRef}>
          <div className="w-full absolute top-4 right-4 z-50 p-4 flex justify-end">
            <p className="text-black bg-[#f3f3f6] rounded-full w-12 h-12 flex justify-center items-center text-lg cursor-pointer hover:bg-transparent hover:text-[#f3f3f6] duration-300 border border-[#f3f3f6] transition-colors"
            onClick={() => dialogRef.current?.close()}
            >X</p>
          </div>
        <div className="w-full h-full overflow-hidden relative group items-center justify-center bg-transparent flex p-8 md:p-24">
          {/* <div
            className="absolute w-full h-full top-0 left-0 group-hover:opacity-100 opacity-0 transition-all duration-300 delay-200 bg-slate-950/30 flex justify-center items-center cursor-pointer z-30"
            onClick={() => {
              if(videoRef.current?.paused) {
                videoRef.current?.play();
                setIsPlaying(true);
              } else {
                videoRef.current?.pause();
                setIsPlaying(false);
              }
            }}
          >
            {
              !isPlaying ? (
                <Image src="/images/pause-svgrepo-com.svg" alt="pause-img" width={31} height={36} className="invert" />
              ): (
                <Image src="/images/play-icon.svg" alt="chevron-img" width={31} height={36} className="" />
              )
            }
          </div> */}
          <iframe src="https://player.vimeo.com/video/1038261096?h=d02c10dad5"  className="object-cover h-full !max-w-none w-full" allow="autoplay; fullscreen; nocontrols" ></iframe>
          {/* <video src="/images/hero-video.mp4" className="object-contain w-full !max-w-none" autoPlay muted loop playsInline ref={videoRef}></video> */}
        </div>
      </dialog>
      <div id="Hero" className="w-screen relative h-svh overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[110%] bg-gradient-to-t from-black to-transparent"></div>
        <div className="h-screen w-full z-0 overflow-hidden">
        {/* <iframe src="https://player.vimeo.com/video/1038261096/d02c10dad5?controls=0&autoplay=1"  className="object-cover h-full !max-w-none w-full" allow="autoplay; fullscreen; nocontrols"></iframe> */}

          <video src="/images/hero-video.mp4" className="object-cover !max-w-none 2xl:w-full" autoPlay muted loop playsInline controls={false}></video>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-24">
          <div className="w-full flex flex-col justify-center items-center gap-y-3 lg:gap-y-6 z-10 relative mt-0">
              <h1 className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[1.5rem] leading-[1.5rem] lg:leading-[2rem] lg:text-[2rem] uppercase">professional line</h1>
            <Image src="/images/hero-rainbow.png" alt="rainbow-img" width={400} height={2} ref={lineRef} className="w-1/2 lg:w-[400px] h-[2px]" />
            <div className="flex flex-col justify-center items-center mx-6 lg:mx-0">

                <h2
                  className="hero-header text-[#F3F3F6] font-bold text-[3.95rem] md:text-[6rem] lg:text-[8rem] leading-[3.95rem] md:leading-[6rem] lg:leading-[8rem] uppercase text-center text-shadow pt-[0.2rem]"
                  >
                  GO BOLD WITH
                </h2>
                <h2
                  className="hero-header text-[#F3F3F6] font-bold text-[3.95rem] md:text-[6rem] lg:text-[8rem] leading-[3.95rem] md:leading-[6rem] lg:leading-[8rem] uppercase text-center text-shadow pt-[0.2rem]"
                  >
                  BILCO BRICK
                </h2>
            </div>
          </div>

        </div>
          <div className=" absolute bottom-0 flex flex-col gap-y-6 justify-center items-center z-10 w-full pb-12">
            <div className="w-10 h-10 rounded-full border border-slate-100 flex justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors group duration-300" ref={playButtonRef}
              style={{ transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)` }}
              onClick={() => dialogRef.current?.show()}
            >
              <Image src="/images/play-icon.svg" alt="chevron-img" width={11} height={16} className="group-hover:invert transition-all duration-300 translate-x-[1px]" />
            </div>
            <p className="text-[#969696] text-base lg:text-[1.375rem] lg:leading-[1.75rem] lg:text-xl text-center px-16 lg:px-0">The only concrete brick that’s colored to the core.</p>
          </div>
      </div>

      <div className="mt-28 lg:mt-52">
        <div>
          <h2 className={`font-[Urdwin] antialiased text-[#F3F3F6] font-bold  text-[3rem] md:text-[5rem]  lg:text-[5.25rem] leading-[3rem] md:leading-[5rem]  lg:leading-[5.3rem] uppercase text-center`}><span className="text-bg">explore the</span><br/>full spectrum</h2>
        </div>

        <div>
          <ThreeScene />
        </div>
      </div>

      <Standards />


      <ParallelBrick />

      <ZoomIn />

      <Slider />


      <Contact />


      <div className="mt-16 lg:mt-32 footer p-6 lg:p-28 lg:pb-24 ps-6 lg:ps-8  slider-container bg-black lg:bg-[#010101] pt-24 lg:pt-24 fade-up-footer z-10 pb-96 md:pb-[70svh] relative"  ref={footerRef}>
        <div className="flex flex-col gap-y-10 justify-start  fade-up-footer max-w-[1300px] px-0 ">
          <Image src="/images/bilco-logo.svg" alt="bilco logo" width={175} height={28}/>

          <p className="font-[Gotham-book] text-[#969696] text-xl text-left fade-up-footer w-4/5 lg:w-2/5 xl:1/5 2xl:w-[52%]">If you’d like more information about our products or would like to place an order, please call, email or fax us:</p>

          <div className="flex flex-col gap-y-2 fade-up-footer">
            <p className="text-[#f3f3f6] text-xl text-left">Phone: (972) 227-3380</p>
            <p className="text-[#f3f3f6] text-xl text-left">Email: <span className="underline">info@BilcoBrick.com</span></p>
          </div>

          <a href="https://bilcobrick.com/" target="_blank" className="text-[#f3f3f6] text-xl text-left fade-up-footer underline">bilcobrick.com</a>

          <div className="flex flex-row justify-start items-center gap-x-3 fade-up-footer">
            <a href="https://www.instagram.com/bilco_brick/" target="_blank"><Image src="/images/ig-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/></a>
            <a href="https://www.facebook.com/BilcoBrick" target="_blank"><Image src="/images/fb-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/></a>
            <a href="https://www.linkedin.com/company/bilco-brick" target="_blank"><Image src="/images/linkedin-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/></a>

          </div>

          <p className="font-[Gotham-book] text-[#f3f3f6] font-normal text-xl text-left fade-up-footer hidden lg:flex">© 2024 Bilco Corporation  |  All Rights Reserved  | <span className="underline ms-2"><Link href={'https://bilcobrick.com/wp-content/uploads/2017/03/Bilco-TermsOfUse-201703.pdf'} target="_blank"> Terms of Use</Link></span></p>
          <p className="font-[Gotham-book] text-[#f3f3f6] text-xl leading-8 text-left fade-up-footer block  lg:hidden">© 2024 Bilco Corporation  <br />  All Rights Reserved  <br /> <span className="underline">Terms of Use</span></p>


        </div>
      </div>

      
    </div>
  );
};

export default Home;