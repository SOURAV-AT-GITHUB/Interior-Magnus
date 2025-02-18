import twitterIcon from "/footer-icons/twitter.svg";
import facebookIcon from "/footer-icons/facebook.svg";
import linkedinIcon from "/footer-icons/linkedin.svg";
import instagramIcon from "/footer-icons/instagram.svg";
import { useSelector } from "react-redux";
import { NavHashLink } from "react-router-hash-link";
export default function Footer() {
  const { allServices } = useSelector((store) => store.allServices);
  return (
    <footer
      id="footer"
      className="bg-secondary py-10 px-5  lg:py-20 lg:px-28 text-white font-light text-lg"
    >
      <div className="grid grid-cols-4   justify-between ">
        <div className="col-span-4 sm:col-span-2  grid gap-4 sm:w-4/5">
          <p className="text-sm sm:text-lg text-center sm:text-left">
            <span className="font-normal">Interior Magnus</span> specializes in
            creating tailored interior spaces that blend style, functionality,
            and innovation. With a dedicated team of experts, we bring your
            vision to life, transforming spaces into inspiring environments.{" "}
            <span className="hidden sm:inline-block">
              Discover design that feels like home.
            </span>
          </p>
          <div className="flex gap-4 w-fit m-auto mb-4  sm:m-0 ">
            <a
              href="https://x.com/interiormagnus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitterIcon} alt="twitter-icon" className="h-4/6" />
            </a>
            <a
              href="https://m.facebook.com/61571571950857/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookIcon} alt="facebookIcon" className="h-4/6" />
            </a>
            <a
              href="https://www.linkedin.com/in/interior-magnus-05a100347/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedinIcon} alt="linkedin-icon" className="h-4/6" />
            </a>
            <a
              href="https://www.instagram.com/interiormagnus/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-fit sm:h-4/6 p-[2px] sm:p-1 border-[1.6px] rounded-full"
            >
              <img
                src={instagramIcon}
                alt="linkedin-icon"
                className="max-h-[25px] sm:max-h-full  scale-75"
              />
            </a>
          </div>
        </div>

        <ul className="col-span-2 sm:col-span-1 text-sm sm:text-lg justify-self-center">
          <p className="mb-4 text-base  sm:text-xl text-nowrap">Company</p>

          <li className="flex items-center">
            <NavHashLink
              to="/#home-about"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              About Us
            </NavHashLink>
          </li>
          <li>
            <a
              href={
                allServices[0][0]
                  ? `/services/${allServices[0][0].service
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`
                  : "/"
              }
            >
              <p>Services</p>
            </a>
          </li>
          <li>
            <NavHashLink
              to="/#home-whyus"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              <p>Why Us</p>
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to="/#home-portfolio"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              <p>Portfolio</p>
            </NavHashLink>
          </li>
          <li>
            <NavHashLink
              to="/#home-testimonials"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              <p>Testimonials</p>
            </NavHashLink>
          </li>
          {/* <NavLink to={"/admin"}>
            <p>Admin</p>
          </NavLink> */}
        </ul>

        <ul className="col-span-2 sm:col-span-1 text-sm sm:text-lg">
          <li>
            {" "}
            <p className="mb-4 text-base  sm:text-xl text-nowrap">
              Customer Support
            </p>
          </li>

          <li>
            {" "}
            <p>Privacy Policy</p>
          </li>
          <li>
            <p>Terms & Conditions</p>
          </li>
          <li className="flex items-center">
            <NavHashLink
              to="/#home-faq"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              FAQ
            </NavHashLink>
          </li>

          <li className="flex items-center">
            <NavHashLink
              to="/#home-contactus"
              scroll={(el) =>
                el.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Contact Us
            </NavHashLink>
          </li>
        </ul>
      </div>

      <hr className="border border-white mt-12 mb-6" />

      <div className="w-fit m-auto h-fit ">
        <p className="text-sm sm:text-lg">
          2024 © All rights reserved by Subroman Decor And Tech Pvt. Ltd.
        </p>
      </div>
    </footer>
  );
}
