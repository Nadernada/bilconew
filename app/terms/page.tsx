'use client'

import Link from "next/link";
import NavBar from "../components/NavBar";
import { gothamMonoBook } from "../gothamFont";
import Image from "next/image";


const Terms = () => {
  return (
    <div>
      <NavBar />
      <div className="w-screen relative h-svh overflow-hidden mt-48">
        <p>terms of use</p>

      </div>


      <div className="mt-16 lg:mt-32 footer p-6 lg:p-28 lg:pb-24 ps-6 2xl:ps-52 bg-[#000000] pt-24 lg:pt-24 fade-up-footer z-10 pb-10 relative h-svh" >
        <div className="flex flex-col gap-y-10 justify-start  fade-up-footer max-w-[1300px] px-0 lg:px-28">
          <Image src="/images/bilco-logo.svg" alt="bilco logo" width={175} height={28}/>

          <p className={`${gothamMonoBook.className} text-[#969696] text-xl text-left fade-up-footer w-4/5 lg:w-2/5 xl:1/5`}>If you’d like more information about our products or would like to place an order, please call, email or fax us:</p>

          <div className="flex flex-col gap-y-2 fade-up-footer">
            <p className="text-[#f3f3f6] text-xl text-left">Phone: (972) 227-3380</p>
            <p className="text-[#f3f3f6] text-xl text-left">Email: <span className="underline">info@BilcoBrick.com</span></p>
          </div>

          <p className="text-[#f3f3f6] text-xl text-left fade-up-footer">bilcobrick.com</p>

          <div className="flex flex-row justify-start items-center gap-x-3 fade-up-footer">
            <Image src="/images/ig-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>
            <Image src="/images/fb-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>
            <Image src="/images/linkedin-bilco.svg" alt="bilco logo" width={34} height={34} className="hover:scale-105 transition-all cursor-pointer hover:invert"/>

          </div>

          <p className={`${gothamMonoBook.className} text-[#f3f3f6] font-normal text-xl text-left fade-up-footer hidden lg:flex`}>© 2024 Bilco Corporation  |  All Rights Reserved  | <span className="underline ms-2"><Link href={'https://bilcobrick.com/wp-content/uploads/2017/03/Bilco-TermsOfUse-201703.pdf'}> Terms of Use</Link></span></p>
          <p className={`${gothamMonoBook.className} text-[#f3f3f6] text-xl leading-8 text-left fade-up-footer block  lg:hidden`}>© 2024 Bilco Corporation  <br />  All Rights Reserved  <br /> <span className="underline">Terms of Use</span></p>


        </div>
      </div>
    </div>
  )
}

export default Terms;