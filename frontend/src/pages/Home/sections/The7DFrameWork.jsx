import The7DFrameworkBG from "/other-images-icons/The7DFramework.jfif";

export default function The7DFrameWork() {
      const the7DFrameworkData = [
            {
              title: "Define",
              description:
                "Understanding your vision and requirements through consultations to define the scope of the project.",
            },
            {
              title: "Discover",
              description:
                "Researching and gathering inspirations, trends & styles that align with your preferences and needs.",
            },
            {
              title: "Design",
              description:
                "Creating innovative and functional design concepts that capture your essence and preferences.",
            },
            {
              title: "Develop",
              description:
                "Finalizing design details, including material selection, finishes, and furniture to create a cohesive look.",
            },
            {
              title: "Deliver",
              description:
                "Coordinating with contractors and vendors to ensure the smooth execution of the project.",
            },
            {
              title: "Deploy",
              description:
                "Implementing the design plan while overseeing the entire process to maintain quality and timelines.",
            },
            {
              title: "Delight",
              description:
                "Conducting a final walkthrough with you to ensure your satisfaction and making adjustments as needed for your ultimate delight.",
            },
          ];
  return (
      <section  id="home-framework" className="relative  bg-secondary py-10 pl-5  lg:py-20 lg:px-28 min-h-[50vh] lg:h-auto"
      >
        <div className="mb-2 text-center lg:text-left pr-5">
          <p className="text-primary lg:text-xl font-medium leading-tight">
            The 7D Framework
          </p>
          <p className="text-white text-xl  lg:text-[2.5rem] leading-tight">
            Our Pathway to exceptional Design
          </p>
        </div>
        <p className="pr-5 text-white lg:hidden font-light text-sm  text-center">At Interior Magnus, our unique 7D Framework ensures every project delivers outstanding, functional, and inspiring results.</p>
        <p className="hidden lg:block  text-white text-xl  lg:w-4/6 my-4 text-center lg:text-left">
          At Interior Magnus, we follow a unique 7D Framework to deliver
          outstanding results with every project. Discover how our 7D Framework
          creates spaces that are both functional and inspiring.
        </p>
        <img
          src={The7DFrameworkBG}
          alt="The7DFrameworkBG"
          id="The7DFrameworkBG"
          className=" absolute right-0 bottom-0 h-4/6   lg:h-full lg:w-2/5"
        />

        <div className="framework-scroll  flex overflow-x-auto gap-1 lg:w-3/4 mt-14">
          {the7DFrameworkData.map((ele, index) => (
            <div
              key={index}
              className="bg-white p-5  lg:p-3 min-w-[250px]  lg:min-w-[320px]  flex flex-col gap-4 mb-6"
            >
              <div className="p-5   bg-primary w-fit text-lg">
                <p>{`${index + 1}`.padStart(2, 0)}</p>
              </div>
              <p className="text-xl font-medium">{ele.title}</p>
              <p className="text-sm lg:text-base">{ele.description}</p>
            </div>
          ))}
        </div>
      </section>
  )
}
