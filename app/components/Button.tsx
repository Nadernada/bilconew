import React from "react";

interface ButtonProps {
  text: string
  link: string
}

const Button: React.FC<ButtonProps> = ({text, link}) => {
  return (
    <a href={link ? link : '#'} className="w-full lg:w-fit px-3 py-2 flex justify-center items-center text-black font-semibold bg-[#F3F3F6] rounded-full uppercase text-sm hover:bg-transparent hover:text-[#F3F3F6] border border-[#F3F3F6] transition-all">
      {text}
    </a>
  );
};

export default Button;