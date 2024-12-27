import HomeIcon from "../../../icons/HomeIcon";
import SofaIcon from "../../../icons/SofaIcon";
import RulerIcon from "../../../icons/RulerIcon";
import PenIcon from "../../../icons/PenIcon";
import { useState } from "react";

export default function SolutionsSection() {
  const defaultSolutionsData = [
    {
      image: SofaIcon,
      title: "Furniture & Decor Sourcing",
      description:
        "Our team creates efficient, functional layouts that enhance flow, maximize usability, and bring balance to any room. By carefully analyzing each space, we ensure that every square foot is utilized to its fullest potential, making your home or office not only beautiful but also highly practical.",
      isActive: false,
    },
    {
      image: HomeIcon,
      title: "Residential & Commercial Interior Design",
      description:
        "Our team tailors each design to suit the unique requirements of homes, offices, and hospitality spaces, transforming environments into stylish and comfortable areas that inspire. From elegant living spaces to productive work environments, we bring expertise, innovation.",
      isActive: true,
    },
    {
      image: RulerIcon,
      title: "Consultation and Design Advice",
      description:
        "Whether you’re looking for inspiration, professional feedback, or assistance in making design decisions, our team is here to help. From selecting color schemes and materials to layout planning, we provide personalized advice that aligns with your vision.",
      isActive: false,
    },
    {
      image: PenIcon,
      title: "Remodeling and Renovation",
      description:
        "We bring new life to existing spaces, enhancing functionality, style, and comfort while preserving what makes each space unique. Our team handles everything from layout adjustments to material upgrades, ensuring a seamless transformation that aligns with your vision.",
      isActive: false,
    },
  ];
  const [solutionsData, setSolutionsData] = useState([...defaultSolutionsData]);
  const onMouseEnter = (index) => {
    if (index === 1) return;

    const updatedSolutionsData = solutionsData.map((ele, i) =>
      i === index ? { ...ele, isActive: true } : { ...ele, isActive: false }
    );
    setSolutionsData([...updatedSolutionsData]);
  };
  const onMouseLeave = () => setSolutionsData([...defaultSolutionsData]);
  const [activeIndex, setActiveIndex] = useState(1);
  const nextIndex = () => {
    setActiveIndex((prev) => {
      if (prev >= solutionsData.length - 1) return 0;
      return prev + 1;
    });
  };
  const previousIndex = () => {
    setActiveIndex((prev) => {
      if (prev < 1) return solutionsData.length - 1;
      else return prev - 1;
    });
  };
  return (
    <section
      id="home-solutions"
      className="relative min-h-[88.5vh]  bg-white py-10 px-5  lg:py-20 lg:px-28 flex flex-col justify-between  lg:grid lg:grid-cols-2 gap-4"
    >
      <div className=" row-span-3 lg:order-none">
        <p className="text-secondary text-xl">Solutions</p>
        <h4 className="text-3xl  min-[500px]:text-4xl">
          Design Solutions for Every Space
        </h4>
        <p className="mt-4 pr-5 text-lg  min-[500px]:text-xl font-light">
          At <span className="font-normal">Interior Magnus,</span> we offer a
          full range of interior design solutions tailored to meet the unique
          needs of every client. From concept development to final touches, our
          services cover every aspect of design and execution to bring your
          vision to life.
        </p>
      </div>
      <div className="row-span-1 hidden lg:block">&nbsp;</div>
      <div className="row-span-1 hidden lg:block">&nbsp;</div>
      {solutionsData.map((solution, index) => (
        <div
          key={index}
          className={`max-[500px]:absolute left-4 right-4  max-[500px]:bottom-28 ${
            activeIndex === index
              ? "scale-100 max-[500px]:bg-secondary max-[500px]:shadow-buttonShadow "
              : "max-[500px]:scale-0"
          }  row-span-2 border rounded-xl cursor-default flex flex-col gap-2 p-3  min-[500px]:py-8   ease-in duration-300 ${
            solution.isActive
              ? " min-[500px]:bg-secondary border-black shadow-buttonShadow  text-white"
              : "border-transparent max-[500px]:text-white"
          } min-h-[36vh]`}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
        >
          <solution.image isActive={solution.isActive} />
          <p className="text-xl">{solution.title}</p>
          <p className="leading-relaxed ">
            {solution.description}
          </p>
        </div>
      ))}
      <div className="absolute bottom-2 left-0 px-4  w-full   flex justify-between  min-[500px]:hidden">
        <button onClick={previousIndex} className="bg-secondary text-white p-2">
          Previous
        </button>
        <button onClick={nextIndex} className="bg-secondary text-white p-2">
          Next
        </button>
      </div>
    </section>
  );
}
