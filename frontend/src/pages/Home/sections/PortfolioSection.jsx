import { useState, useEffect } from "react";
import portfolioImage1 from "/portfolio-image-1.jfif";
import portfolioImage2 from "/portfolio-image-2.jfif";
import portfolioImage3 from "/portfolio-image-3.jfif";
import portfolioImage4 from "/portfolio-image-4.jfif";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import axios from "axios";

export default function PortfolioSection() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const defaultPortfolioButtons = [
    { text: "End-to-End Offerings", isActive: false },
    { text: "Modular Kitchen", isActive: false },
    { text: "Living Room", isActive: false },
    { text: "Wardrob", isActive: false },
  ];
  const defaultPortfolioImages = [
    portfolioImage1,
    portfolioImage2,
    portfolioImage3,
    portfolioImage4,
  ]
  const [portfolioImages,setPortfolioImages] = useState([...defaultPortfolioImages ]);
  const [portfolioButtons, setPortfolioButtons] = useState([...defaultPortfolioButtons]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarState,setSnackbarState] = useState({open:false,severity:"",message:""})
  const openSnackbar = (message, severity) => {
    setSnackbarState({open:true,severity,message})
  };

  const closeSnackbar = () => {
    setSnackbarState({...snackbarState,open:false})
  };

  const setActivePortfolioAndUpdatePortfolioImages =  async (index=0,category="end-to-end-offerings") => {
    if (portfolioButtons[index].isActive===true) return;
    const currentPortfolioButton = [...portfolioButtons]
    setIsLoading(true)
    setPortfolioButtons(portfolioButtons.map((ele, i) =>
      index === i ? { ...ele, isActive: true } : { ...ele, isActive: false }
    ));
    try {
      const response = await axios.get(`${BACKEND_URL}/portfolio/${category}`);
      const data = response.data.data
      data.sort((a,b)=>a.date - b.date)
      setPortfolioImages(data.map(ele=>ele.image))
      openSnackbar("Portfolio updated!!","success")
    } catch (error) {
      console.log(error);
      setPortfolioButtons([...currentPortfolioButton])
      openSnackbar("Failed to update portfolio, please check you network.","error")
    }finally{
      setIsLoading(false)
    }
    
  };

  useEffect(() => {
    setActivePortfolioAndUpdatePortfolioImages(0,"end-to-end-offerings")
  }, []);
  return (
    <section
      id="home-portfolio"
      className="bg-primary py-10 px-5 lg:py-20  lg:pl-28"
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

      <div className="flex justify-between gap-4  lg:w-3/5 mt-3 overflow-x-auto pr-2">
        {portfolioButtons.map((ele, index) => (

            <button
            key={index}
              onClick={() => setActivePortfolioAndUpdatePortfolioImages(index,ele.text.toLowerCase().split(" ").join("-"))}
              className={`mb-4  bg-secondary text-white text-xl rounded-full p-2 px-4 border text-nowrap  ${
                ele.isActive
                  ? "animate-shadow-appear border-black"
                  : "border-transparent"
              }`}
            >
              {ele.text}
            </button>

        ))}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center gap-5  my-6 ">
          <h4 className="text-4xl">Loading...</h4>
          <CircularProgress
            size={"4rem"}
            className="text-secondary"
            sx={{ color: "#44AAB6" }}
          />
        </div>
      ) : (
        <div className="portfolio-images relative  flex gap-4 mt-5 overflow-x-scroll">
          {portfolioImages.map((image, index) => (
            <div key={index} className={`${index === 3 && "mr-8"}`}>
              <div className="overflow-hidden h-[175px]  lg:h-[450px]  mb-6 border border-transparent hover:border-x-black hover:shadow-buttonShadow">
                <img
                  src={image}
                  alt={`portfolio-image-${index + 1}`}
                  className="h-full  min-w-[175px]  lg:min-w-[435px] hover:scale-125 ease-in duration-300 "
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
      >
        <Alert onClose={closeSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
    </section>
  );
}
