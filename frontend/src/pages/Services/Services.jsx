import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Skeleton } from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import {
  CONTACTUS_FORM_UPDATE,
} from "../../Store/actionTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function Services() {
  const services = useSelector((store) => store.allServices);
  const allServices = services.allServices.flat();
  const { isLoading, isError } = services;
  const slideNavRef = useRef(null);
  const { service } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [lineClamp, setLineClamp] = useState(true);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollLeft = () => {
    if (slideNavRef.current) {
      slideNavRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (slideNavRef.current) {
      slideNavRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  const checkScrollPosition = () => {
    if (slideNavRef.current) {
      const container = slideNavRef.current;
      const isAtStart = container.scrollLeft === 0;
      const isAtEnd =
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1;
      setIsAtStart(isAtStart);
      setIsAtEnd(isAtEnd);
    }
  };
  useEffect(() => {
    const container = slideNavRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/services/categories/${service}`
      );
      setData(response.data.data);
    } catch (error) {
      setData(null);
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      allServices[0] &&
      !allServices.some(
        (item) => item.service.toLowerCase().split(" ").join("-") === service
      )
    ) {
      navigate(
        `/services/${allServices[0].service.toLowerCase().split(" ").join("-")}`
      );
    } else {
      if (allServices[0] && slideNavRef.current) {
        const index = allServices.findIndex(
          (ele) => ele.service.toLowerCase().split(" ").join("-") === service
        );
        const listNode = slideNavRef.current;
        const node = listNode.querySelectorAll("a > p")[index];
        node.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
    getData();
  }, [service]);
  // const handleMailSending = (title, size = null) => {
  //   const subject = "Inquiry about your product";
  //   let body = `Hello,%0D%0AI%20want%20to%20know%20more%20about%20${title}%20poduct`;
  //   if (size) body += `%20with%20size%20${size}.`;
  //   const mailToLink = `mailto:hello@interiormagnus.com?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${body}`;
  //   window.location.href = mailToLink;
  // };

  const handleClick = (title) => {
    dispatch({
      type: CONTACTUS_FORM_UPDATE,
      payload: {
        message: `Hello,\nI would like to know more about ${title} product`,
      },
    });
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("home-contactus");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth", // Smooth scrolling
          block: "start", // Align to the start of the section
        });
      }
    }, 200); // Small delay to allow the page to update
  };
  return (
    <main className="min-h-screen p-2 pt-16 sm:pt-24 lg:p-4 lg:pt-28  xl:p-12 xl:pt-32 ">
      <div className="relative">
        <button
          onClick={scrollLeft}
          className={`${
            isAtStart && "hidden"
          } absolute top-0 left-0 rounded-full bg-white border-2 z-[1]`}
        >
          <KeyboardArrowLeftIcon />
        </button>

        <button
          onClick={scrollRight}
          className={`${
            isAtEnd && "hidden"
          } absolute top-0 right-0 rounded-full bg-white border-2 z-[1]`}
        >
          <KeyboardArrowRightIcon />
        </button>
        <div
          ref={slideNavRef}
          className="  px-10 py-1  w-full overflow-x-scroll flex gap-6 text-nowrap  hide-scrollbar"
        >
          {(isLoading || isError
            ? Array.from({ length: 15 })
            : allServices
          ).map((item, index) =>
            item ? (
              <NavLink
                key={index}
                to={`/services/${item.service
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
                id={`${item.service.toLowerCase().split(" ").join("-")}`}
              >
                <p
                  className={`font-medium  ${
                    item.service.toLowerCase().split(" ").join("-") === service
                      ? "text-secondary"
                      : "text-slate-600"
                  }`}
                >
                  {item.service}
                </p>
              </NavLink>
            ) : (
              <Skeleton key={index} className="min-w-28" />
            )
          )}
        </div>
      </div>
      {data && (
        <section className="flex flex-col gap-4 p-2">
          <div className="">
            {data.title && (
              <p className="text-5xl font-semibold">{data.title}</p>
            )}
            {data.description && (
              <Fragment>
                <p
                  className={`mt-2 sm:w-3/5  ${
                    lineClamp && "line-clamp-2"
                  } transition-transform duration-500 ease-linear`}
                >
                  {data.description}
                </p>
                <button
                  onClick={() => setLineClamp((prev) => !prev)}
                  className="flex items-center gap-1 text-secondary"
                >
                  <p>{lineClamp ? "Read More" : "Read Less"}</p>
                  <KeyboardArrowDownIcon
                    className={`${
                      lineClamp ? "rotate-0" : "rotate-180"
                    } transition-transform duration-300 ease-in-out`}
                  />
                </button>
              </Fragment>
            )}
          </div>
          <div className=" flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {data?.images[0] &&
              data.images.map((item, index) => (
                <div
                  key={index}
                  className="relative border-2 shadow-2xl  overflow-hidden max-h-fit sm:min-h-[400px] lg:min-h-[500px] xl:min-h-[300px] xl:max-h-[350px]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-4/6 max-h-[250px] lg:max-h-[300px] xl:max-h-[400px] w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="h-2/6 p-3 flex flex-col gap-1 justify-between">
                    <p className="text-sm font-medium">{item.title}</p>
                    {/* { item.size &&  <p className="text-lg text-slate-700">Size : {item.size}</p>} */}
                    <div className="justify-self-end  text-xs lg:text-sm flex flex-col xl:flex-row items-center justify-center gap-2">
                      {/* <a
                        href="mailto:hello@interiormagnus.com?subject=Request%20for%20Free%20Design%20Consultation&body=Hi%20there,%0A%0AI%27m%20interested%20in%20booking%20a%20free%20interior%20design%20session.%20Could%20you%20please%20let%20me%20know%20your%20availability%20and%20the%20next%20steps%20to%20schedule%20the%20session?%0ALooking%20forward%20to%20working%20with%20you%20and%20discussing%20how%20you%20can%20help%20transform%20my%20space!%0A%0ABest%20regards,%0A%5BYour%20Name%5D"
                        className="w-full xl:w-3/5"
                      >
                        <button className="p-2 w-full  rounded-full bg-white text-secondary border border-secondary">
                          Book Free Consultation
                        </button>
                      </a> */}
                      {/* <a href="/#home-contactus" className="w-full "></a> */}
                      {/* <HashLink smooth to="/#home-contactus">      */}
                      <button
                        // onClick={() => handleMailSending(item.title, item.size)}
                        onClick={() => handleClick(item.title)}
                        className="p-2 w-full  rounded-full bg-secondary text-white font-semibold"
                      >
                        Get Quote
                      </button>
                      {/* </HashLink> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      <p className="text-yellow-600 bg-slate-100 w-fit px-2 mt-6">
        * The products shown on the website are subject to availability. Prices
        are bound to change depending on the market conditions.
      </p>
    </main>
  );
}
