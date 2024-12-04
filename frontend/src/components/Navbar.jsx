import logo from "/logo.png";
import hamburgerIcon from "/hamburger-icon.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const {services} = props
  const navigate = useNavigate()
  return (
    <nav className="relative flex justify-center h-fit">
      <div className="h-auto  fixed  md:w-11/12 md:mt-10 px-4  md:px-10  flex justify-between bg-white md:border border-black z-10 md:rounded-lg">
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
        />

        <ul className="hidden md:flex justify-between gap-4  lg:gap-8 ">
          <li className="flex items-center">
            <a href="#home-about" className="hover:text-gray-400 ">
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
                      <a href="" className="hover:text-gray-400  my-4">
                        {service.service}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </ul>
          </li>

          <li className="relative group flex items-center">
            <a href="#home-portfolio" className="hover:text-gray-400">
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
            <a href="#home-testimonials" className="hover:text-gray-400">
              Testimonials
            </a>
          </li>

          <li className="flex items-center">
            <a href="#home-faq" className="hover:text-gray-400">
              FAQ
            </a>
          </li>

          <li className="flex items-center">
            <a href="#home-contactus" className="hover:text-gray-400">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
