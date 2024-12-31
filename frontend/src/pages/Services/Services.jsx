import { useEffect, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
export default function Services({ services }) {
  const allServices = services.flat() || [[]];
  const slideNavRef = useRef(null);
  const { service } = useParams();
  const navigate = useNavigate();
  //   console.log(service)
  //   const [isAtStart, setIsAtStart] = useState(true);
  //   const [isAtEnd, setIsAtEnd] = useState(false);
  useEffect(() => {
    if (
      !allServices.some(
        (item) => item.service.toLowerCase().split(" ").join("-") === service
      )
    ) {
      navigate(
        `/services/${allServices[0].service.toLowerCase().split(" ").join("-")}`
      );
    }
  }, [service]);
  const scrollLeft = () => {
    if (slideNavRef.current) {
      slideNavRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = ()=>{
    if(slideNavRef.current){
      slideNavRef.current.scrollBy({
        left:200,
        behavior:"smooth"
      })
    }
  }
  return (
    <main className="min-h-screen p-8 pt-16  sm:pt-40 ">
      <div className="relative ">
        <button onClick={scrollLeft} className="absolute top-0 left-0 rounded-full bg-white border-2">
          <KeyboardArrowLeftIcon />
        </button>

        <button onClick={scrollRight} className="absolute top-0 right-0 rounded-full bg-white border-2">
          <KeyboardArrowRightIcon />
        </button>
        <div
          ref={slideNavRef}
          className="  px-10 py-1  w-full overflow-x-scroll flex gap-6 text-nowrap  hide-scrollbar"
        >
          {allServices.map((item) => (
            <NavLink
              key={item.service}
              to={`/services/${item.service
                .toLowerCase()
                .split(" ")
                .join("-")}`}
            >
              <p
                className={`font-medium text-slate-600 ${
                  item.service.toLowerCase().split(" ").join("-") === service &&
                  "text-red-700"
                }`}
              >
                {item.service}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </main>
  );
}
