import { useState } from "react";

export default function FAQSection() {
      const [FAQs, setFAQs] = useState([
            {
              question:
                "How do you determine the design style that best suits my space and personal preferences?",
              answer:
                "At Interior Magnus, we understand your vision, lifestyle, and preferences through discussions and evaluate your space's layout and functionality. Using mood boards and renderings, we collaborate with you to finalize a design that reflects your style and needs.",
              isActive: false,
            },
            {
              question:
                "What is the initial consultation process like, and what should I expect?",
              answer:
                "Our consultation includes understanding your vision, assessing your space, discussing budget and timeline, and sharing initial ideas. It’s a collaborative process to align expectations and set the stage for your project.",
              isActive: false,
            },
            {
              question:
                "What materials and finishes do you use, and how do you ensure quality in each project?",
              answer:
                "We use premium materials and finishes, sourced from trusted vendors, tailored to your design and budget. Each project undergoes rigorous quality checks to ensure durability, functionality, and a flawless finish.",
              isActive: false,
            },
            {
              question:
                "How flexible are your designs if I want to make adjustments during the project?",
              answer:
                "Our designs are flexible, and we welcome your input throughout the project. Minor adjustments can be accommodated seamlessly, ensuring the final result meets your expectations",
              isActive: false,
            },
            {
              question:
                "Do you offer post-completion support if I need further assistance with my space?",
              answer:
                "Yes, we provide post-completion support to address any concerns or adjustments needed, ensuring you’re fully satisfied with your space.",
              isActive: false,
            },
            {
              question:
                "What are the typical timelines for your projects, and how do you handle any unexpected delays?",
              answer:
                "Timelines vary by project scope, but we provide clear schedules upfront. In case of unexpected delays, we promptly inform you and take necessary steps to minimize their impact.",
              isActive: false,
            },
          ]);
        
        
          const handleFAQs = (index) => {
            const updatedFAQs = FAQs.map((faq, i) =>
              i === index ? { ...faq, isActive: !FAQs[index].isActive } : { ...faq }
            );
            setFAQs([...updatedFAQs]);
          };
  return (
      <section id="home-faq" className="bg-primary py-10 px-5  lg:py-20 lg:px-28 ">
        <div className="text-center">
          <p className="text-secondary font-medium">FAQ</p>
          <p className="text-xl  lg:text-4xl">Got Questions? We Have Answers!</p>
          <p className="lg:hidden">We’ve answered common design questions to keep you informed—reach out anytime for more details!</p>
          <p className="hidden lg:block  text-xl  lg:w-11/12 m-auto mt-8">
            We know that starting a design project comes with many questions. To
            help you feel confident and informed, we&apos;ve answered some of
            the most common questions our clients ask. If you need more details,
            feel free to reach out—we’re here to help!
          </p>
        </div>
        <div className="m-auto  mt-8 text-xl">
          {FAQs.map((faq, index) => (
            <div key={index} className={`${faq.isActive && "my-4"}`}>
              <p
                onClick={() => handleFAQs(index)}
                className={`${
                  faq.isActive
                    ? "bg-secondary border-black shadow-buttonShadow ease-in-out duration-300"
                    : "bg-white bg-opacity-30 border-transparent"
                } text-sm lg:text-xl  p-4 rounded-2xl border cursor-pointer`}
              >
                {faq.question}
              </p>
              <p
                className={`transition-all duration-500 ease-in-out transform  ${
                  faq.isActive
                    ? "opacity-100 scale-100 mt-2"
                    : "opacity-0 scale-0 overflow-hidden max-h-px"
                } text-sm lg:text-xl bg-white bg-opacity-30 p-4 rounded-2xl`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
  )
}
