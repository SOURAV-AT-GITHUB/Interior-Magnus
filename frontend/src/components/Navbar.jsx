import logo from "/logo.png";
import hamburgerIcon from "/hamburger-icon.svg";
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react'
export default function Navbar(props) {
  const {services} = props
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const openDrawer = ()=> setIsOpen(true)
  const closeDrawer = ()=> setIsOpen(false)
  const handleNaviagte=(id)=>{

    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' })
    closeDrawer()
  }
  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight; // 100vh height

      // Check if the scroll position is around 90-100vh
      if (scrollY >= heroSectionHeight * 0.9) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className="relative flex justify-center h-fit">
      <div className={`h-auto fixed ${scrolled ? "w-full" : "md:w-11/12 md:mt-10 md:rounded-lg"}  px-4  md:px-10  flex justify-between bg-white md:border border-black z-10 `}>
        <div onClick={()=>navigate('/')}  className="w-2/5  md:w-1/5 flex flex-col bg-white text-black cursor-pointer">
          <img src={logo} alt="" className="h-full" />
          <p className="self-end -mt-1  md:-mt-2  text-[0.40rem] md:text-[.6rem]  text-nowrap">
            Interior | Furniture | Design
          </p>
        </div>

        <img
          src={hamburgerIcon}
          alt="menu"
          className="md:hidden self-center h-6"
          onClick={openDrawer}
        />

        <ul className="hidden md:flex justify-between gap-4  lg:gap-8 ">
          <li className="flex items-center">
            <a href="/#home-about" className="hover:text-gray-400 ">
              About Us
            </a>
          </li>

          <li className="relative group flex items-center">
            <p>
              <a href="#services" className="hover:text-gray-400 h-full">
                Services
              </a>
            </p>
            <ul className="absolute left-[-450%] top-10  mt-9 hidden group-hover:grid grid-cols-3 justify-between gap-5  min-w-max  bg-white border border-slate-300 rounded-b-lg  p-3 pr-0  text-nowrap">
              {services.map((column, index) => (
                <ul key={index} className="space-y-2">
                  {column.map((service) => (
                    <li key={service.service}>
                      <NavLink to={`/services/${service.service.toLowerCase().split(' ').join('-')}`} className="hover:text-gray-400  my-4">
                        {service.service}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ))}
            </ul>
          </li>

          <li className="relative group flex items-center">
            <a href="/#home-portfolio" className="hover:text-gray-400">
              Portfolio
            </a>
            <ul className="absolute -left-8 top-10 hidden group-hover:flex flex-col gap-2  mt-9 bg-white border  rounded-lg  p-4 text-nowrap">
              <li>
                <a href="" className="hover:text-gray-400">
                  End-to-End Offerings
                </a>
              </li>
              <li>
                <a href="" className="hover:text-gray-400">
                  Modular Kitchen
                </a>
              </li>
              <li>
                <a href="" className="hover:text-gray-400">
                  Living Room
                </a>
              </li>
              <li>
                <a href="" className="hover:text-gray-400">
                  Wardrob
                </a>
              </li>
            </ul>
          </li>

          <li className="flex items-center">
            <a href="/#home-testimonials" className="hover:text-gray-400">
              Testimonials
            </a>
          </li>

          <li className="flex items-center">
            <a href="/#home-faq" className="hover:text-gray-400">
              FAQ
            </a>
          </li>

          <li className="flex items-center">
            <a href="/#home-contactus" className="hover:text-gray-400">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <Drawer open={isOpen} onClose={closeDrawer} anchor="right"  >
        <div className="max-w-[70vw] h-full  bg-secondary text-white font-medium text-lg">
          <button onClick={closeDrawer}><CloseIcon fontSize="large"/></button>
          <img src={logo} alt="" />
          <ul className="flex flex-col gap-4 p-6">
            <li onClick={()=>handleNaviagte('home-about')}>
              About Us
            </li>
            <li > 
            <a href="/services/modular-kitchen-designs">
              Services
            </a>
            </li>
            <li onClick={()=>handleNaviagte('home-portfolio')}> 
             Portfolio
            </li>
            <li onClick={()=>handleNaviagte('home-testimonials')}> 
             Testimonials
            </li>
            <li onClick={()=>handleNaviagte('home-faq')}> 
             FAQ
            </li>
            <li onClick={()=>handleNaviagte('home-contactus')}> 
             Contact Us
            </li>
          </ul>
        </div>
      </Drawer>
    </nav>
  );
}
