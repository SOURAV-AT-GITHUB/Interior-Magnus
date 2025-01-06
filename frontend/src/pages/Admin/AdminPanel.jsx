import { Link, Outlet, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { useEffect } from "react";
export default function AdminPanel() {
  const location = useLocation();
useEffect(()=>{
window.scrollTo(0,0)
},[location])
  return (
    <div className="pt-16  sm:pt-40 pb-10">
      {location.pathname.split("/")[2] ? (
        <Link to="">
          <button className="ml-4  flex items-center gap-2 bg-secondary text-white p-2 rounded-md">
            <ArrowBackIcon />
            <p>Admin Panel</p>
          </button>
        </Link>
      ) : (
        <div className="grid w-fit m-auto gap-4 mb-4 px-2">
          <h3 className="text-center mb-8 text-5xl font-medium">Admin Panel</h3>
          <Link to="update-portfolios">
            <button className="flex gap-2 items-center justify-center  text-xl  bg-primary text-white p-2 rounded">
              <p>Add/Edit Portfolio Images</p>
              <AddToDriveIcon />
            </button>
          </Link>
          <Link to="update-services">
            <button className="w-full flex gap-2 items-center justify-center  text-xl  bg-secondary text-white p-2 rounded">
              <p>Add/Edit Services</p>
              <DesignServicesIcon />
            </button>
          </Link>
          <Link to="update-service-images">
            <button className="flex gap-2 items-center justify-center  text-xl  bg-primary text-white p-2 rounded">
              <p>Add/Edit Service Images</p>
              <AddToDriveIcon />
            </button>
          </Link>
        </div>
      )}

      <Outlet />
    </div>
  );
}
