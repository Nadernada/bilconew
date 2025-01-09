'use client'

import Image from "next/image";
import { useRef, useState } from "react";


const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', business_name: '', business_website: '', interest: '', phone: '', description: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(formData);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);
        setResponseMessage(errorData.message || 'Failed to send email');
      } else {
        setIsLoading(false);
        setResponseMessage('Thank you for contacting us!');
        setFormData({
          fullname: '',
          email: '',
          business_name: '',
          business_website: '',
          phone: '',
          description: '',
          interest: '',
        });
        setSelectedOption('');

        setTimeout(() => {
          setResponseMessage('')
        }, 10000)
      }
    } catch (error: unknown) {
      console.log(error);
      setIsLoading(false);
      setResponseMessage('An error occurred. Please try again.');
    }
  };
  

  const options = ['Builder', 'Design firm', 'Architect', 'Contractor', 'Engineer', 'Distributor'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setFormData({ ...formData, description: option });
    setIsOpen(false); // Close dropdown after selecting
  };
  

  const sectionRef = useRef(null);


  return (
    <div className="mt-36 flex flex-col items-center bg-contact-gradient-mobile mx-6 lg:mx-0 rounded-3xl px-8 xl:px-0" ref={sectionRef}>
        <div className="w-4/5 mb-10  -translate-y-14">
          <Image src="/images/form-img.png" alt="brick-img" width={863} height={468} className="flex lg:hidden" />
        </div>

        <h2 id="contact" className="font-[Urdwin] antialiased text-[#F3F3F6] font-bold text-[3rem] leading-[3rem] lg:text-[5.25rem] lg:leading-[5.3rem] uppercase text-center fade-up-contact  -translate-y-14 lg:translate-y-0">Let&apos;s Start Building</h2>
        <p className="text-[#969696]  text-base lg:text-[1.375rem] lg:leading-[1.75rem] text-center fade-up-contact -translate-y-14 lg:translate-y-0 w-4/5 lg:w-full">Reach out to get ahold of our team or a sample</p>

 
        <div className="mt-12 flex flex-col justify-around bg-contact-gradient rounded-3xl p-3 md:p-12 lg:py-20 w-fit fade-up-contact  -translate-y-14 lg:translate-y-0 max-w-[1300px]">
          {responseMessage !== 'Thank you for contacting us!' && <form className="w-full flex flex-col gap-y-6"  onSubmit={handleSubmit}>
            <input type="text" name="fullname" id="fullname" value={formData.fullname} onChange={handleChange} className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput" placeholder="Full Name*" required />
            <input type="text" name="business_name" id="business_name" value={formData.business_name} onChange={handleChange} className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput" placeholder="Business Name*" required />
            <input type="text" name="business_website" id="business_website" value={formData.business_website} onChange={handleChange} className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput" placeholder="Business Website*" required />
            <div id="business-website" className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput relative cursor-pointer">
              <div
                className="dropdown-header w-full flex justify-between items-center text-[#f3f3f6] uppercase"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedOption || 'Which best describes you?*'}
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
            <input type="tel" name="phone" pattern="[0-9]{10}" id="phone" value={formData.phone} onChange={handleChange} className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput" placeholder="Phone*" required />
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-transparent placeholder:text-[#f3f3f6] rounded-none text-[#f3f3f6] placeholder:uppercase border-b text-[1rem] lg:text-sm border-[#969696] w-full leading-7 py-2 colorInput" placeholder="Email*" required />

            <p className="text-[#f3f3f6] text-base text-left uppercase">Interested In: *</p>

            <div className="flex flex-row flex-wrap items-start lg:items-center gap-3 mb-8 ms-0">
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interest" value="Business Inquiry" onChange={handleChange} id="inquiry" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#969696] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Business Inquiry</label>
              </div>
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interest" value="Sample Kit" onChange={handleChange} id="sample" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#969696] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Sample Kit</label>
              </div>
              <div className="flex flex-row  relative checkmark-container cursor-pointer">
                <input type="radio" name="interest" value="Other" onChange={handleChange} id="other" className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-pointer" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-transparent border text-[1rem] lg:text-sm border-[#f3f3f6] w-4 h-4 rounded-full checkmark"/>
                <label htmlFor="inquiry" className="text-[#f3f3f6] text-base text-center uppercase ms-1 me-4 ps-5">Other</label>
              </div>
            </div>
            {responseMessage && <p className="text-red-600">* {responseMessage}</p>}
            
            <button type="submit" disabled={isLoading} className="w-full lg:w-fit px-[18.5px] py-[13px] flex justify-center items-center text-black font-semibold bg-[#F3F3F6] rounded-full uppercase text-sm leading-[14.5px] border border-[#F3F3F6] transition-all">{isLoading ? 'Submitting...' : 'Submit'}</button>
          </form>}

            {responseMessage === 'Thank you for contacting us!' && <p>{responseMessage}</p>}


        </div>

      </div>
  );
};


export default Contact;