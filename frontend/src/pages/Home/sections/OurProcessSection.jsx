import Button from "../../../components/Button";

export default function OurProcessSection() {
  const ourProcessData = [
    {
      number: "01",
      title: "Consultation",
      description:
        "An initial meeting to understand your vision, needs, and budget, followed by a detailed site assessment and measurements.",
    },
    {
      number: "02",
      title: "Design Development",
      description:
        "Development of mood boards and design concepts, followed by the selection of materials, finishes, and furnishings.",
    },
    {
      number: "03",
      title: "Consultatio & Implementation",
      description:
        "A comprehensive project plan and timeline, with regular updates and site visits to ensure quality and adherence to the design.",
    },
    {
      number: "04",
      title: "Final Touches",
      description:
        "Final styling and inspection, followed by a handover and client walkthrough to ensure every detail meets your expectations.",
    },
  ];
  return (
    <section
      id="home-process"
      className="bg-secondary py-10 px-6  lg:py-20 lg:px-28 flex flex-col gap-5 items-center text-center "
    >
      <div>
        <p className="text-primary lg:text-xl">Our Process</p>
        <p className="text-white text-2xl  lg:text-3xl">
          Bringing Your Vision to Life
        </p>
      </div>
      <p className="text-white   lg:w-4/6 m-auto">
        From the initial consultation to the final reveal, we focus on
        understanding your unique style, planning meticulously, and executing
        with precision. Our process ensures a smooth experience and a stunning
        result, tailored perfectly to your needs.
      </p>

      <div className="lg:flex justify-between gap-8 mb-6 text-left lg:text-center">
        {ourProcessData.map((ele, index) => (
          <div
            key={index}
            className="grid grid-cols-3 lg:flex lg:flex-col gap-4"
          >
            <div className="border-r  lg:border-b lg:border-r-0  overflow-hidden ">
              <p className="text-7xl  lg:text-[11.5rem] lg:-mb-16  leading-tight  lg:font-bold text-white ">
                {ele.number}
              </p>
            </div>
            <div className="flex flex-col lg:gap-5 lg:text-xl col-span-2 pb-2">
              <p className="text-primary font-medium">{ele.title}</p>
              <p className="text-white ">{ele.description}</p>
            </div>
          </div>
        ))}
      </div>
      <a href="mailto:hello@interiormagnus.com?subject=Request%20for%20Free%20Design%20Consultation&body=Hi%20there,%0A%0AI%27m%20interested%20in%20booking%20a%20free%20interior%20design%20session.%20Could%20you%20please%20let%20me%20know%20your%20availability%20and%20the%20next%20steps%20to%20schedule%20the%20session?%0ALooking%20forward%20to%20working%20with%20you%20and%20discussing%20how%20you%20can%20help%20transform%20my%20space!%0A%0ABest%20regards,%0A%5BYour%20Name%5D">
        <Button text="Book Free Design Session" color="primary" />
      </a>
    </section>
  );
}
