import Image from "next/image";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={`fixed top-0 left-0 w-full flex flex-row justify-between px-4 lg:px-14 py-4 z-30 transition-all duration-300 ${isScrolled ? "bg-black lg:py-6" : "bg-transparent lg:py-11"}`}
    >
      <Link href="https://bilcobrick.com/">
        <Image src="/images/bilco-logo.svg" alt="bilco logo" width={243} height={38} className={`scale-75 transition-all duration-300 origin-left ${isScrolled ? 'lg:scale-80' : 'lg:scale-100'}`} />
      </Link>
      <div className="hidden lg:flex">
        <Button text="Get Started" link="#contact" />
      </div>
    </div>
  );
};

export default NavBar;
