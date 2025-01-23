import { useState, useEffect } from "react";
import portfolioImage1 from "/portfolio-images/portfolio-image-1.jfif";
import portfolioImage2 from "/portfolio-images/portfolio-image-2.jfif";
import portfolioImage3 from "/portfolio-images/portfolio-image-3.jfif";
import portfolioImage4 from "/portfolio-images/portfolio-image-4.jfif";
import {
  // CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Skeleton from "@mui/material/Skeleton";
export default function PortfolioSection() {
  //_____________Constants__________
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const defaultPortfolioButtons = [
    { text: "End-to-End Offerings", isActive: false },
    { text: "Modular Kitchen", isActive: false },
    { text: "Living Room", isActive: false },
    { text: "Wardrobe", isActive: false },
  ];
  const defaultPortfolioImages = [
    portfolioImage1,
    portfolioImage2,
    portfolioImage3,
    portfolioImage4,
  ];
  //____________State hooks__________
  const [portfolioImages, setPortfolioImages] = useState([
    ...defaultPortfolioImages,
  ]);
  const [portfolioButtons, setPortfolioButtons] = useState([
    ...defaultPortfolioButtons,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const isMinWidth500 = useMediaQuery("(min-width:500px)");
//_____________Functions______________
  const openSnackbar = (message, severity) => {
    setSnackbarState({ open: true, severity, message });
  };

  const closeSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  const setActivePortfolioAndUpdatePortfolioImages = async (
    index = 0,
    category = "end-to-end-offerings"
  ) => {
    if (portfolioButtons[index].isActive) return;
    const currentPortfolioButton = [...portfolioButtons];
    setIsLoading(true);
    setPortfolioButtons(
      portfolioButtons.map((ele, i) =>
        index === i ? { ...ele, isActive: true } : { ...ele, isActive: false }
      )
    );
    try {
      const response = await axios.get(`https://lyumonic-330af-default-rtdb.firebaseio.com/Interior_Magnus/portfolio/${category}.json`);
      const data = Object.entries(response.data).map(([id,rest])=>({id,...rest}))
      data.sort((a, b) => a.date - b.date);
      setPortfolioImages(data.map((ele) => ele.image));
      openSnackbar("Portfolio updated!!", "success");
    } catch ( error) {
      setPortfolioButtons([...currentPortfolioButton]);
      openSnackbar( error.response?.data.message||error.message,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  const nextIndex = () => {
    setActiveIndex((prev) => {
      if (prev >= portfolioImages.length - 1) return 0;
      return prev + 1;
    });
  };
  const previousIndex = () => {
    setActiveIndex((prev) => {
      if (prev < 1) return portfolioImages.length - 1;
      else return prev - 1;
    });
  };

  //___________useEffects_________
  useEffect(() => {
    setActivePortfolioAndUpdatePortfolioImages(0, "end-to-end-offerings");
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="home-portfolio"
      className="min-h-[86.5vh] flex flex-col justify-between  bg-primary py-10 px-5 lg:py-20  lg:pl-28 "
    >
      <div className="lg:w-2/4 flex flex-col text-center lg:text-left">
        <p className="text-secondary text-xl">Portfolio</p>
        <h4 className="text-3xl">Our Work, Your Inspiration</h4>
        <p className="mt-2">
          Explore a showcase of our diverse projects, from elegant residential
          spaces to innovative commercial designs. Discover how we transform
          spaces into exceptional environments tailored to individual style and
          purpose.
        </p>
      </div>

      <div className="grid gap-4 md:flex grid-cols-2  mt-3 overflow-x-auto pr-2 ">
        {portfolioButtons.map((ele, index) => (
          <button
            key={index}
            onClick={() =>
              setActivePortfolioAndUpdatePortfolioImages(
                index,
                ele.text.toLowerCase().split(" ").join("-")
              )
            }
            className={`mb-4  bg-secondary text-white text-sm  md:text-xl rounded-full p-2 md:px-4 border text-nowrap  ${
              ele.isActive
                ? "animate-shadow-appear border-black"
                : "border-transparent"
            }`}
          >
            {ele.text}
          </button>
        ))}
      </div>

      <div className=" relative min-h-[250px]   mt-5 overflow-hidden min-[500px]: ">
        <div
          style={{
            width: isMinWidth500 ? "100%" :`${portfolioImages.length * 100}%`,
            transform: isMinWidth500 ? "none" :`translateX(-${activeIndex*(100/portfolioImages.length)}%)`,
            transition:"transform .5s ease-in-out",
          }}
          className=" flex gap-4 portfolio-images overflow-x-auto"
        >
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className={`w-full ${ !isMinWidth500 ?  index === activeIndex ? 'scale-100':"scale-0" : ''} transition-all duration-700 ease-in-out`}
            >
              {isLoading ? (
                <div className="div flex flex-col gap-1 mb-6 min-w-full min-[500px]:min-w-[350px]"
                width={ isMinWidth500 ? '100%'   : `${100/portfolioImages.length}%`}
                >
                  {/* <Skeleton
                    variant="rectangular"
                    height={isMinWidth500 ? 400 : 250}
                    // animation='wave'
                    sx={{ backgroundColor: "#44aab6" }}
                  /> */}
                  <Skeleton
                    variant="rectangular"
                    height={isMinWidth500 ? 400 : 250}
                    // animation='wave'
                    // sx={{ backgroundColor: "gray" }}
                  />

                </div>
              ) : (
                <div className="overflow-hidden h-full   lg:h-[450px]  mb-6 border border-transparent hover:border-x-black hover:shadow-buttonShadow"
                width={ isMinWidth500 ? '100%'   : `${100/portfolioImages.length}%`}
                >
                  <img
                    src={image}
                    alt={`portfolio-image-${index + 1}`}
                    className="h-full w-full object-cover object-center  lg:min-w-[435px] hover:scale-125 ease-in duration-300 "
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}{" "}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4 min-[500px]:hidden">
        <button
          onClick={previousIndex}
          className="min-w-16  border-2 border-secondary text-secondary p-2 disabled:opacity-50 disabled:cursor-progress"
          disabled={isLoading}
        >
          <WestIcon />
        </button>
        <button
          onClick={nextIndex}
          className="min-w-16 bg-secondary text-white p-2 disabled:opacity-50 disabled:cursor-progress"
          disabled={isLoading}
        >
          <EastIcon />
        </button>
      </div>

        <Snackbar
          open={snackbarState.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbarState.severity}
            sx={{ width: "100%" }}
          >
            {snackbarState.message}
          </Alert>
        </Snackbar>

    </section>
  );
}
