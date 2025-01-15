import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import { getAllServices } from "./Store/allServices.action";
import { useEffect, useState } from "react";
import KitchenPriceCalculator from "./pages/Kitechen-Price_Calculator/KitchenPriceCalculator";
import AdminPanel from "./pages/Admin/AdminPanel";
import UpdatePortfolios from "./pages/Admin/UpdatePortfolios";
import UpdateServices from "./pages/Admin/UpdateServices";
import Services from "./pages/Services/Services";
import { useDispatch } from "react-redux";
import UpdateServiceImages from "./pages/Admin/UpdateServiceImages";
function App() {
  const dispatch = useDispatch();
  const [activeRoute, setActiveRoute] = useState("/");

  const UpdateRoute = () => {
    const location = useLocation();
    useEffect(() => {
      setActiveRoute(location.pathname);
    }, [location]);
  };

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);
  const HomeRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/");
    }, [navigate]);
    return <></>;
  };
  return (
    <>
      {activeRoute !== "/kitchen-price-calculator" && <Navbar />}
      <UpdateRoute />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/kitchen-price-calculator"
          element={<KitchenPriceCalculator />}
        />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="update-portfolios" element={<UpdatePortfolios />} />
          <Route path="update-services" element={<UpdateServices />} />
          <Route
            path="update-service-images"
            element={<UpdateServiceImages />}
          />
        </Route>
        <Route path="/services/:service" element={<Services />} />
        <Route path="*" element={<HomeRedirect />} />
      </Routes>

      {activeRoute !== "/kitchen-price-calculator" && <Footer />}
    </>
  );
}

export default App;
