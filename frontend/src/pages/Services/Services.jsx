import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Skeleton } from "@mui/material";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector } from "react-redux";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export default function Services() {
  const services= useSelector(store=>store.allServices)
const allServices = services.allServices.flat()
const {isLoading,isError} = services
  const slideNavRef = useRef(null);
  const { service } = useParams();
  const navigate = useNavigate();
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
  const handleMailSending = (title,size=null)=>{
    const subject = "Inquiry about your product";
    let body = `Hello,%0D%0AI%20want%20to%20know%20more%20about%20${title}%20poduct`
    if(size) body+=`%20with%20size%20${size}.`
    const mailToLink = `mailto:yash.techtitude@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    window.location.href = mailToLink
  }
  return (
    <main className="min-h-screen p-8 pt-16 sm:p-16 sm:pt-40 ">
      <div className="relative ">
        <button
          onClick={scrollLeft}
          className={`${isAtStart && "hidden"} absolute top-0 left-0 rounded-full bg-white border-2 z-[1]`}
        >
          <KeyboardArrowLeftIcon />
        </button>

        <button
          onClick={scrollRight}
          className={`${isAtEnd && "hidden"} absolute top-0 right-0 rounded-full bg-white border-2 z-[1]`}
        >
          <KeyboardArrowRightIcon />
        </button>
        <div
          ref={slideNavRef}
          className="  px-10 py-1  w-full overflow-x-scroll flex gap-6 text-nowrap  hide-scrollbar"
        >
          {((isLoading || isError) ? Array.from({ length: 15 }) : allServices).map(
            (item, index) =>
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
                      item.service.toLowerCase().split(" ").join("-") ===
                      service
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
        <section className="flex flex-col gap-4">
          <div className="mt-6">
            <p className="text-5xl font-semibold">{data.title}</p>
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
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {data?.images[0] &&
              data.images.map((item, index) => (
                <div key={index} className="border-2 shadow-2xl max-h-[450px] pb-4 sm:pb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-3/5 w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="p-3 pb-5 flex flex-col gap-1">
                    <p className="text-lg font-medium">{item.title}</p>
                 { item.size &&  <p className="text-lg text-slate-700">Size : {item.size}</p>}
                    <div className="text-sm flex items-center justify-center gap-2 mt-3">
                      <button className="p-3 w-2/3 rounded-full bg-white text-secondary border border-secondary">
                        Book Free Consultation
                      </button>
                      <button onClick={()=>handleMailSending(item.title,item.size)} className="p-3 w-1/3 rounded-full bg-secondary text-white font-semibold">
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      <p className="text-yellow-600 bg-slate-100 w-fit px-2 mt-4">* The products shown on the website are subject to availability. Prices are bound to change depending on the market conditions.</p>
    </main>
  );
}
