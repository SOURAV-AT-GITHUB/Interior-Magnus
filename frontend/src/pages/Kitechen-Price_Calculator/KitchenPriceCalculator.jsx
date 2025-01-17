import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
// import { Button } from "@mui/material";
import logo from "/logo.png";
import { useState } from "react";

import KitchenLayout from "./Steps/KitchenLayout";
import Measurements from "./Steps/Measurements";
import Package from "./Steps/Package";

import LshapedLayout from "/kitchen-price-calculator/L-shaped-layout.png";
import StraightLayout from "/kitchen-price-calculator/straight-layout.png";
import UshapedLayout from "/kitchen-price-calculator/u-shaped-layout.png";
import ParallelLayout from "/kitchen-price-calculator/parallel-layout.png";

import essestialPackageImage from "/packages/essentials.png";
import permiumPackageImage from "/packages/premium.png";
import luxePackageImage from "/packages/luxe.png";

import GetQuote from "./Steps/GetQuote";
import { useNavigate } from "react-router-dom";

const darkBrownColor = "#5e465b";

const CustomStepIcon = (props) => {
  const { active, completed } = props;

  return (
    <div
      style={{
        width: 20,
        height: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "6px solid",
        borderColor: completed || active ? darkBrownColor : "darkgray",
        backgroundColor: completed ? darkBrownColor : "transparent",
        color: "white",
        fontWeight: "bold",
        position: "relative",
      }}
    >
      {completed ? <Check style={{ color: "white", fontSize: 14 }} /> : null}
      {!completed && !active && <span></span>}
      {active && !completed && <span></span>}
    </div>
  );
};
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  // Remove any top spacing or margin, and align the line tightly with the icons
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 9, // No extra top spacing, keep the connector flush with the icon
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: darkBrownColor, // Active step color
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: darkBrownColor, // Completed step color
    },
  },
  // Default style for the connector line
  [`& .${stepConnectorClasses.line}`]: {
    height: 1,
    border: 0,
    backgroundColor: "#ccc", // Default color for incomplete steps
    position: "absolute", // Ensure the connector line is positioned correctly
    left: -10,
    right: -10,
    zIndex: -1,
  },
}));
export default function KitchenPriceCalculator() {
  const navigate = useNavigate()
  const steps = ["KITCHEN LAUOUT", "MEASUREMENTS", "PACKAGE", "GET QUOTE"];
  const [activeStep, setActiveStep] = useState(0);
  const [layouts, setLayouts] = useState([
    {
      text: "L-shaped",
      image: LshapedLayout,
      isSelected: false,
    },
    {
      text: "Straight",
      image: StraightLayout,
      isSelected: false,
    },
    {
      text: "U-shaped",
      image: UshapedLayout,
      isSelected: false,
    },
    {
      text: "Parallel",
      image: ParallelLayout,
      isSelected: false,
    },
  ]);
  const [packages, setPackages] = useState([
    {
      title: "Essentials (₹₹)",
      description:
        "A range of basic units and acessories that are necessary for a comfortable modular kitchen.",
      image: essestialPackageImage,
      benefits: [
        "Affordable pricing",
        "Convenient designs",
        "Basic accessories",
      ],
      isSelected: false,
    },
    {
      title: "Premium (₹₹₹)",
      description:
        "An exquisite offering with sleek fixtures, hardware, cabinets and fittings for an elegant kitchen design.",
      image: permiumPackageImage,
      benefits: [
        "Mid-range pricing",
        "Premium designs",
        "Wide range of accessories",
      ],
      isSelected: false,
    },
    {
      title: "Luxe (₹₹₹₹)",
      description:
        "A swanky kitchen package that's a fine blend of aesthetics and high functionality with chic-looking units and accessories.",
      image: luxePackageImage,
      benefits: [
        "Elite pricing",
        "Lavish designs",
        "Extensive range of accessories",
      ],
      isSelected: false,
    },
    {
      title: "Build your own package",
      description:
        "A flexible, built-to-suit option that lets you pick and choose from a collection of well-crafted finishes and accessories.",
      image: null,
      benefits: [
        "Customised pricing",
        "Flexible designs",
        "Range of accessories to pick from",
      ],
      isSelected: false,
    },
  ]);
  const [selections, setSelections] = useState({
    layout: null,
    name: "",
    email: "",
    phone: "",
    propertyName: "",
  });
  const handleNext = () => {
    if (activeStep < 3) setActiveStep((prev) => prev + 1);
    else {
      const subject  = `Enquiry about ${selections.layout} kitchen`
      let body = `Hello, \n\n I want to know the estimate for ${selections.layout} kitchen for the following details : \n Layout : ${selections.layout} \nMeasurements : \n A=${selections.measurements["A"]}`
      if(selections.measurements["B"]) body +=`\n B=${selections.measurements["B"]}`
      if(selections.measurements["C"]) body +=`\n C=${selections.measurements["C"]}`
      body+=`\nPackage: ${selections.package}`
      body +=`\n\n${selections.name}`
      if(selections.email) body+=`\nEmail : ${selections.email}`
      body+=`\nContact : ${selections.phone}`

      const mailToLink = `mailto:hello@interiormagnus.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailToLink
    }
  };
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white  p-4 sm:px-8 grid grid-cols-2 gap-5   sm:flex sm:justify-between items-center shadow-lg">
        <a href="/">

        <img src={logo} alt="" className="order-1 h-12 " />
        </a>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<ColorlibConnector />}
          className="order-3 sm:order-2  col-span-2 min-w-[60vw]"
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon {...props} icon={index + 1} />
                )}
              >
                <p
                  className={`${
                    activeStep === index ? "block" : "hidden sm:block"
                  } text-[8px] text-nowrap  font-bold  sm:text-base`}
                >
                  {label}
                </p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="w-fit order-2 sm:order-3  justify-self-end">
          <p className="font-medium">{activeStep + 1}/4</p>
        </div>
      </nav>

      <main className="relative sm:w-[50vw] min-w-[300px] min-h-[75vh]  sm:min-h-[90vh] overflow-auto hide-scrollbar border m-auto mt-40  sm:mt-28 p-6 shadow-xl ">
        <div className="sm:mb-20">
          {activeStep === 0 ? (
            <KitchenLayout
              layouts={layouts}
              setLayouts={setLayouts}
              selections={selections}
              setSelections={setSelections}
            />
          ) : activeStep === 1 ? (
            <Measurements
              selections={selections}
              setSelections={setSelections}
            />
          ) : activeStep === 2 ? (
            <Package
              packages={packages}
              setPackages={setPackages}
              setSelections={setSelections}
            />
          ) : (
            <GetQuote selections={selections} setSelections={setSelections} />
          )}
        </div>
        <div className="fixed sm:w-[50vw] sm:min-w-[300px] bottom-0 left-0 right-0 m-auto  flex justify-between mt-4 p-4 bg-white shadow-inner ">
          <button
            color="error"
            className="w-24 text-secondary disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() =>activeStep ===0 ? navigate("/") : setActiveStep((prev) => prev - 1)}
            disabled={activeStep < 0}
          >
            BACK
          </button>
          <br />
          <br />
          <button
            color="error"
            className="w-fit px-6  rounded-full bg-secondary text-white disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-400"
            onClick={handleNext}
            disabled={
              activeStep >= steps.length ||
              (activeStep === 0 && !selections.layout) ||
              (activeStep === 2 && !selections.package) ||
              (activeStep ===3 && (!selections.name || !selections.email || !selections.propertyName)) ||
              activeStep > 3
            }
          >
            {activeStep === 3 ? "GET MY ESTIMATE" : "NEXT"}
          </button>
        </div>
      </main>
    </div>
  );
}
