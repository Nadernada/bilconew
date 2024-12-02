'use client'

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import Button from "./Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);


const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Builder', 'Design firm', 'Architect', 'Contractor', 'Engineer', 'Distributor'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting
  };

  const sectionRef = useRef(null);

  // useGSAP(
  //   () => {
  //     gsap.from('.fade-up-contact', {
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
    <div className="mt-36 flex flex-col items-center bg-contact-gradient-mobile mx-6 lg:mx-0 rounded-3xl px-8 xl:px-0" ref={sectionRef}>
        <div className="w-4/5 mb-10  -translate-y-14">
          <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="flex lg:hidden" />
        </div>

        <h2 id="contact" className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] leading-[3rem] lg:text-[5.25rem] lg:leading-[5.3rem] uppercase text-center fade-up-contact  -translate-y-14 lg:translate-y-0">Let&apos;s Start Building</h2>
        <p className="text-[#969696]  text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center fade-up-contact -translate-y-14 lg:translate-y-0 w-4/5 lg:w-full">Reach out to get ahold of our team or a sample</p>

 
        <div className="mt-12 flex flex-row justify-around bg-contact-gradient rounded-3xl p-6 lg:px-12 xl:px-28 lg:py-20 w-full xl:w-4/5 fade-up-contact  -translate-y-14 lg:translate-y-0 max-w-[1300px]">
          <form action="" className="w-full lg:w-1/2 flex flex-col gap-y-6">
            <input type="text" name="fullname" id="fullname" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Full Name" />
            <input type="text" name="business-name" id="business-name" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Name" />
            <input type="text" name="business-website" id="business-website" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Website" />
            <div id="business-website" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput relative cursor-pointer">
              <div
                className="dropdown-header w-full flex justify-between items-center text-[#f3f3f6] uppercase"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedOption || 'Which best describes you?'}
                <span className={`arrow w-3 h-3 ${isOpen ? 'open' : ''}`}>
                  <Image src="/images/chevron-down.svg" alt="brick-img" width={16} height={16} />
                </span>
              </div>
              {isOpen && (
                <div className="dropdown-list absolute top-[120%] left-0 w-full z-20 flex flex-col gap-1 bg-[#5B5B5B] py-2">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="dropdown-item uppercase text-[#f3f3f6] text-sm hover:bg-[#404040] hover:text-[#f3f3f6] duration-200 py-2 px-5 cursor-pointer transition-colors"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="phone" name="phone" id="phone" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Phone" />
            <input type="email" name="email" id="email" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Email" />

            <p className="text-[#f3f3f6] text-base text-left uppercase">Interested In:</p>

            <div className="flex flex-row flex-wrap items-start lg:items-center gap-3 mb-8 ms-0">
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interests" value={'Business Inquiry'} id="inquiry" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#969696] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Business Inquiry</label>
              </div>
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interests" value={'Business Inquiry'} id="inquiry" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#969696] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Sample Kit</label>
              </div>
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interests" value={'Business Inquiry'} id="inquiry" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#f3f3f6] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Other</label>
              </div>
            </div>

            <Button link="#" text="Submit" />
          </form>

          <div className="relative w-1/2 hidden lg:flex">
            <div className="mt-24 absolute -top-[15%] -right-48">
              <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="hidden lg:flex" />
            </div>
          </div>

        </div>

      </div>
  );
};


export default Contact;