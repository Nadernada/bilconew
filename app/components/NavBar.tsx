import Image from "next/image";
import Button from "./Button";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex flex-row justify-between px-4 lg:px-14 py-8 lg:py-11 bg-transparent z-10">
      <Image src="/images/bilco-logo.png" alt="bilco logo" width={243} height={38} className="scale-75 lg:scale-100"/>

      <div className="hidden lg:flex">
        <Button text="Get Started" link="#contact" />
      </div>
    </div>
  );
};

export default NavBar;