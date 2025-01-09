import { useEffect, useState } from "react";
import doorImage from "/door-image.png";
import doorBehindImage from '/door-behind.jfif'
import padlockHead from '/padlock-head.svg'
import padlockBody from '/padlock-body.svg'
import Button from "../../../components/Button";

export default function ContactUsSection() {
      const [isLeft,setIsLeft] = useState(false)
useEffect(()=>{
 let interval =  setInterval(()=>setIsLeft(prev=>!prev),1500)
 return ()=> clearInterval(interval)
},[])
const handleMailSending =(event)=>{
  event.preventDefault()
  const subject = "Inquiry about your product";
  const firstname = event.target[0].value
  const lastname = event.target[1].value
  const email = event.target[2].value
  const contact = event.target[3].value
  const message = event.target[4].value
  let body = `Hello,%0D%0A%0D%0A${message.split(' ').join("%20")}%0D%0A%0d%0A${firstname}%20${lastname}%0D%0AContact%20Number%20%3A%20${contact}`
  if(email) body += `%0D%0AEmail%20%3A%20${email}`
  const mailToLink =`mailto:hello@interiormagnus.com?subject=${encodeURIComponent(subject)}&body=${body}`
  window.location.href = mailToLink
}
  return (
      <section id="home-contactus" className=" relative bg-white py-10 lg:pb-0 lg:pt-20 px-5 lg:px-28 flex flex-col gap-6 lg:grid grid-cols-2 grid-rows-3 overflow-hidden "
      >
        <div className="lg:order-2 grid text-center lg:text-left">
          <div className="self-center">
          <p className="text-secondary">Contact Us</p>
          <p className="text-xl mt-3  lg:text-4xl">Let&apos;s Start Your Design Journey</p>
         </div>
          <p className="font-light text-sm  lg:text-xl  text-slate-400 self-center">
              Ready to bring your vision to life? Reach out to us today to start
              the conversation. We look forward to creating a space that’s
              uniquely yours!
          </p>
        </div>

        <div className="lg:order-1 col-span-1 row-span-3 h-full   relative z-0 flex flex-col justify-end   overflow-hidden ">
          <img src={doorImage} alt="door-image" className="w-[65%] h-full  z-[1] lg:-mb-1 "/>
          <img src={doorBehindImage} alt="dor-behind" 
          className={`${isLeft ? "right-[60%] -bottom-[30%] " : "right-[13%] rotate-[15deg] -bottom-[5%]"} w-[55%] h-[95%]  ease-in-out duration-1000  absolute border-4 border-black`}/>

            <div className="bg-secondary p-2 px-3   lg:max-h-max  lg:max-w-max   lg:p-4 lg:px-6  grid  absolute top-[60%] right-[37%] z-[1] rounded-full border border-black shadow-buttonShadow">
              <img src={padlockHead} alt="padlock-head" className={`m-auto w-10/12 lg:w-auto  h-4 lg:h-max  ${isLeft ? "" : "rotate-[45deg] "} -mb-1   ease-in-out duration-1000`}/>
              <img src={padlockBody} alt="padlock-body" className="m-auto  h-4 lg:h-max"/>
            </div>
        </div>  

        <div className="lg:order-3 row-span-2">
          <form onSubmit={handleMailSending}>
            <div className="grid grid-cols-2 gap-8">
            <div className="input-container"> 
              <input type="text" placeholder=" " name="first-name"  required/>
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="input-container"> 
              <input type="text" placeholder=" " name="last-name" required/>
              <label htmlFor="last-name">Last Name</label>
            </div>
            <div className="input-container col-span-2"> 
              <input type="text" placeholder=" " name="email" />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-container col-span-2"> 
              <input type="text" placeholder=" " name="contact-number" required/>
              <label htmlFor="contact-number">Contact Number</label>
            </div>
            <div className="input-container col-span-2"> 
              <input type="text" placeholder=" " name="your-message-here" className="h-20" required/>
              <label htmlFor="your-message-here">Your Message Here</label>
            </div>


            
            </div>
          <div className="w-fit m-auto mt-10">
            <Button text="Get Quote" color="primary"/>
          </div>
          </form>
        </div>
      </section>
  )
}
