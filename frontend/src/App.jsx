import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import KitchenPriceCalculator from "./pages/Kitechen-Price_Calculator/KitchenPriceCalculator";
import AdminPanel from "./pages/Admin/AdminPanel";
import UpdatePortfolios from "./pages/Admin/UpdatePortfolios";
import UpdateServices from "./pages/Admin/UpdateServices";
import axios from "axios";
import Services from "./pages/Services/Services";
function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [activeRoute,setActiveRoute] = useState('/')
  
  const UpdateRoute = ()=>{
    const location = useLocation()
    useEffect(()=>{
      setActiveRoute(location.pathname)
    },[location])
  }

  const [services, setServices] = useState([
    [
      {
        column: 1,
        service: "Modular Kitchen Designs",
      },
      {
        column: 1,
        service: "Wardrobe Designs",
      },
      {
        column: 1,
        service: "Bathroom Designs",
      },
      {
        column: 1,
        service: "Master Bedroom Designs",
      },
      {
        column: 1,
        service: "Living Room Designs",
      },
      {
        column: 1,
        service: "Pooja Room Designs",
      },
      {
        column: 1,
        service: "TV Unit Designs",
      },
      {
        column: 1,
        service: "False Ceiling Designs",
      },
      {
        column: 1,
        service: "Kids Bedroom Designs",
      },
      {
        column: 1,
        service: "Balcony Designs",
      },
    ],
    [
      {
        column: 2,
        service: "Dining Room Designs",
      },
      {
        column: 2,
        service: "Foyer Designs",
      },
      {
        column: 2,
        service: "Homes by Livspace",
      },
      {
        column: 2,
        service: "Home Office Designs",
      },
      {
        column: 2,
        service: "Guest Bedroom Designs",
      },
      {
        column: 2,
        service: "Window Designs",
      },
      {
        column: 2,
        service: "Flooring Designs",
      },
      {
        column: 2,
        service: "Wall Decor Designs",
      },
      {
        column: 2,
        service: "Wall Paint Designs",
      },
      {
        column: 2,
        service: "Home Wallpaper Designs",
      },
    ],
    [
      {
        column: 3,
        service: "Tile Designs",
      },
      {
        column: 3,
        service: "Study Room Designs",
      },
      {
        column: 3,
        service: "Kitech Sinks",
      },
      {
        column: 3,
        service: "Space Saving Design",
      },
    ],
  ]);
  const getServices = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/services`);
      setServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  },[]);
  const HomeRedirect = ()=>{
    const navigate = useNavigate()
    useEffect(()=>{
      navigate("/")
    },[])
    return (<></>)
  }
  return (
    <>
     {activeRoute !== "/kitchen-price-calculator" && <Navbar services={services} />}
      <UpdateRoute/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kitchen-price-calculator" element={<KitchenPriceCalculator/>}/>
        <Route path="/admin" element={<AdminPanel />}>
             <Route path="update-portfolios" element={<UpdatePortfolios/>}/>
             <Route path="update-services" element={<UpdateServices services={services} setServices={setServices}/>}/>
        </Route>
        <Route path="/services/:service" element={<Services services={services}/>}/>
        <Route path="*" element={<HomeRedirect/>}/>
      </Routes>

     {activeRoute !== "/kitchen-price-calculator" && <Footer />}
    </>
  );
}

export default App;
