'use client'

import Button from "./Button";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ContactProps {
  font: NextFontWithVariable
}


const Contact:React.FC<ContactProps> = ({ font }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ['Builder', 'Design firm', 'Architect', 'Contractor', 'Engineer', 'Distributor'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selecting
  };

  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.fade-up-contact', {
        y: 70,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center bottom',
          scrub: true,
          // markers: true,
        },
      });
    }, { scope: sectionRef }
  );


  return (
    <div className="mt-36 flex flex-col items-center" ref={sectionRef}>
        <div className="w-4/5 mb-10">
          <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="flex lg:hidden" />
        </div>

        <h3 id="contact" className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase text-center fade-up-contact`}>Let&apos;s Start Building</h3>
        <p className="text-[#969696] text-base text-center fade-up-contact">Reach out to get ahold of our team or a sample</p>

 
        <div className="mt-12 flex flex-row justify-around bg-black rounded-3xl p-16 w-full lg:w-4/5 fade-up-contact">
          <form action="" className="w-full lg:w-1/2 flex flex-col gap-y-6">
            <input type="text" name="fullname" id="fullname" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Full Name" />
            <input type="text" name="business-name" id="business-name" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Name" />
            <input type="text" name="business-website" id="business-website" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Name" />
            <div id="business-website" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput relative cursor-pointer">
              <div
                className="dropdown-header w-full flex justify-between items-center text-white uppercase"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedOption || 'Which best describes you?'}
                <span className={`arrow w-3 h-3 ${isOpen ? 'open' : ''}`}>
                  <Image src="/images/chevron-down.svg" alt="brick-img" width={16} height={16} />
                </span>
              </div>
              {isOpen && (
                <div className="dropdown-list absolute top-[110%] left-0 w-full flex flex-col gap-1 bg-black">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="dropdown-item uppercase text-white text-base hover:bg-white hover:text-black duration-200 p-2 cursor-pointer transition-colors"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <input type="phone" name="phone" id="phone" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Phone" />
            <input type="email" name="email" id="email" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Email" />

            <p className="text-white text-base text-left uppercase">Interested In:</p>

            <div className="flex flex-row flex-wrap items-start lg:items-center gap-3 mb-8">
              <div className="flex flex-row gap-1">
                <input type="radio" name="interests" value={'Business Inquiry'} id="inquiry" />
                <label htmlFor="inquiry" className="text-white text-base text-center uppercase ms-2 me-4">Business Inquiry</label>
              </div>
              <div className="flex flex-row gap-1">
                <input type="radio" name="interests" value={'Sample Kit'} />
                <label htmlFor="inquiry" className="text-white text-base text-center uppercase ms-2 me-4">Sample Kit</label>
              </div>
              <div className="flex flex-row gap-1">
                <input type="radio" name="interests" value={'other'} />
                <label htmlFor="inquiry" className="text-white text-base text-center uppercase ms-2 me-4">Other</label>
              </div>
            </div>

            <Button text="submit" link="#" />
          </form>

          <div className="relative w-1/2 hidden lg:flex">
            <div className="mt-24 absolute -right-24">
              <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="hidden lg:flex" />
            </div>
          </div>

        </div>

      </div>
  );
};


export default Contact;