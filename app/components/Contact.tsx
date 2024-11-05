'use client'

import Button from "./Button";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import Image from "next/image";


interface ContactProps {
  font: NextFontWithVariable
}


const Contact:React.FC<ContactProps> = ({ font }) => {
  return (
    <div className="mt-36 flex flex-col items-center">
        <div className="w-4/5 mb-10">
          <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="flex lg:hidden" />
        </div>

        <h3 id="contact" className={`${font.className} antialiased text-[#F3F3F6] font-bold text-[4rem] leading-[4rem] uppercase text-center`}>Let&apos;s Start Building</h3>
        <p className="text-[#969696] text-base text-center">Reach out to get ahold of our team or a sample</p>

 
        <div className="mt-12 flex flex-row justify-around bg-black rounded-3xl p-16 w-full lg:w-4/5">
          <form action="" className="w-full lg:w-1/2 flex flex-col gap-y-6">
            <input type="text" name="fullname" id="fullname" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Full Name" />
            <input type="text" name="business-name" id="business-name" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Name" />
            <input type="text" name="business-website" id="business-website" className="bg-transparent placeholder:text-white border-b border-white w-full lg:w-4/5 leading-7 py-2 colorInput" placeholder="Business Name" />
            <label htmlFor="description">Which best describes you?</label>
            <select name="description" id="description" className=" w-full lg:w-4/5 bg-transparent py-2 border-b border-white">
              <option value="builder" className="uppercase text-white text-base">Builder</option>
              <option value="builder" className="uppercase text-white text-base">Design firm</option>
              <option value="builder" className="uppercase text-white text-base">Architect</option>
              <option value="builder" className="uppercase text-white text-base">Contractor</option>
              <option value="builder" className="uppercase text-white text-base">Engineer</option>
              <option value="builder" className="uppercase text-white text-base">Distributor</option>
            </select>
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