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
              title: "ConsultatioImplementation",
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
      <section id="home-process"  className="bg-secondary py-10 px-6  lg:py-20 lg:px-28 flex flex-col gap-5 items-center text-center "
      >
        <div>
          <p className="text-primary lg:text-xl">Our Process</p>
          <p className="text-white text-2xl  lg:text-3xl">Bringing Your Vision to Life</p>
        </div>
        <p className="text-white text-xl font-light  lg:w-4/6 m-auto">
          From the initial consultation to the final reveal, we focus on
          understanding your unique style, planning meticulously, and executing
          with precision. Our process ensures a smooth experience and a stunning
          result, tailored perfectly to your needs.
        </p>

        <div className="lg:flex justify-between gap-8 mb-6 text-left lg:text-center">
          {ourProcessData.map((ele, index) => (
            <div key={index} className="grid grid-cols-3 lg:flex lg:flex-col gap-4">
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
        <Button text="Book Free Design Session" color="primary" />
      </section>
  )
}
