import BulbIcon from "../../../icons/BulbIcon";
import BadgeIcon from "../../../icons/BadgeIcon";
import GearHandIcon from "../../../icons/GearHandIcon";
import LikeTickIcon from "../../../icons/LikeTickIcon";
import { useEffect, useRef, useState } from "react";

export default function WhyUsSection() {
  const defaultWhyUsData = [
    {
      image: BulbIcon,
      title: "Unique Design Approach",
      description:
        "Our team listens to your ideas and tailors each design to fit your unique style and vision.",
      isActive: false,
    },
    {
      image: BadgeIcon,
      title: "Experienced Professionals",
      description:
        "Our team combines knowledge with creativity to deliver high-quality results in every project.",
      isActive: false,
    },
    {
      image: GearHandIcon,
      title: "Project Completion",
      description:
        "From concept to completion, we handle every detail for a stress-free experience.",
      isActive: false,
    },
    {
      image: LikeTickIcon,
      title: "Commitment to Quality",
      description:
        "We create spaces that are not only beautiful but also built to last and blending elegance.",
      isActive: false,
    },
  ];
  const [whyUsData, setWhyUsData] = useState([...defaultWhyUsData]);
  const onMouseEnter = (index) => {
    const updatedWhyUsData = whyUsData.map((ele, i) =>
      i === index ? { ...ele, isActive: true } : { ...ele, isActive: false }
    );
    setWhyUsData([...updatedWhyUsData]);
  };
  const onMouseLeave = () => setWhyUsData([...defaultWhyUsData]);

  const [reverse, setReverse] = useState(true);
  const sliderContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Check if screen width is <= 640px
    };

    window.addEventListener("resize", handleResize); // Add resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on component unmount
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setReverse((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);
  useEffect(() => {
    if (isMobile && sliderContainerRef.current) {
      sliderContainerRef.current.style.transform = reverse
        ? "translateX(-60%)"
        : "translateX(0%)";
    }
  }, [reverse, isMobile]);
  return (
    <section
      id="home-whyus"
      className="bg-white py-10 px-5  lg:py-20 lg:px-28  text-center"
    >
      <div>
        <p className="text-secondary text-lg font-medium">Why Us</p>
        <p className="text-2xl  lg:text-4xl">Our Promise to You</p>
      </div>
      <p className="lg:hidden text-xs my-5">
        At Interior Magnus, we craft spaces that reflect your personality with
        quality, creativity, and personalized service.
      </p>
      <p className="hidden lg:block  lg:w-4/6  lg:mx-auto  my-5  text-xl font-light">
        {" "}
        At <span className="font-normal">Interior Magnus,</span> we’re more than
        just designers—we’re partners in crafting spaces that reflect your
        personality and lifestyle. With a commitment to quality, creativity, and
        personalized service, we bring your vision to life.
      </p>
      <div className="wrapper overflow-x-hidden">
        <div
          ref={sliderContainerRef}
          className="slider-container flex lg:justify-between lg:gap-4 overflow-x-hidden w-fit"
        >
          {whyUsData.map((ele, index) => (
            <div
              key={index}
              onMouseEnter={() => onMouseEnter(index, "whyus")}
              onMouseLeave={() => onMouseLeave("whyus")}
              className={`min-w-[200px] md:min-w-[170px]  text-center flex flex-col items-center gap-4 p-5 m-2  border rounded-3xl  ease-in duration-200 ${
                ele.isActive
                  ? "border-black bg-primary  shadow-buttonShadow"
                  : "border-transparent"
              }`}
            >
              <ele.image isActive={ele.isActive} />
              <p className="text-xl font-medium">{ele.title}</p>
              <p>{ele.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
