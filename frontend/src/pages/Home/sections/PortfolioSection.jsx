import { useState, useEffect, Fragment } from "react";
import portfolioImage1 from "/portfolio-image-1.jfif";
import portfolioImage2 from "/portfolio-image-2.jfif";
import portfolioImage3 from "/portfolio-image-3.jfif";
import portfolioImage4 from "/portfolio-image-4.jfif";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import axios from "axios";
// import useMediaQuery from '@mui/material/useMediaQuery';

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
  // const isMaxWidth500 = useMediaQuery('(min-width:500px)')

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
  const [activeIndex,setActiveIndex]= useState(0)
  const nextIndex = ()=>{
    setActiveIndex(prev=>{
      if(prev>= portfolioImages.length-1) return 0
      return prev+1
    })
  }
  const  previousIndex = ()=>{
    setActiveIndex(prev=>{
      if(prev<1) return (portfolioImages.length-1)
      else return prev-1
    })
  }
  return (
    <section
      id="home-portfolio"
      className="min-h-[88.5vh]  bg-primary py-10 px-5 lg:py-20  lg:pl-28"
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

      <div className="grid gap-4 md:flex grid-cols-2  mt-3 overflow-x-auto pr-2">
        {portfolioButtons.map((ele, index) => (

            <button
            key={index}
              onClick={() => setActivePortfolioAndUpdatePortfolioImages(index,ele.text.toLowerCase().split(" ").join("-"))}
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
          <Fragment>
        <div className="portfolio-images relative min-h-[250px] flex gap-4 mt-5 overflow-hidden  min-[500px]:overflow-x-scroll">

          {portfolioImages.map((image, index) => (
            <div key={index} className={`transition-all duration-700  ${activeIndex === index ? 'scal-100' :'max-[500px]:scale-0'}  max-[500px]:absolute   max-[500px]:h-[250px] w-full   `}>
              <div className="overflow-hidden h-full max-[500px]:w-full  lg:h-[450px]  mb-6 border border-transparent hover:border-x-black hover:shadow-buttonShadow">
                <img
                  src={image}
                  alt={`portfolio-image-${index + 1}`}
                  className="h-full w-full   lg:min-w-[435px] hover:scale-125 ease-in duration-300 "
                  loading="lazy"
                  />
              </div>
            </div>
          ))}
        </div>
          <div className="flex justify-between mt-4 min-[500px]:hidden">
            <button onClick={previousIndex} className="bg-secondary text-white p-2">Previous</button>
            <button onClick={nextIndex} className="bg-secondary text-white p-2">Next</button>
          </div>
          </Fragment>
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
