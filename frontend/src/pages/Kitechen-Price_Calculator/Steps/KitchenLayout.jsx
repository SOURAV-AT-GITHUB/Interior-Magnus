
export default function KitchenLayout(props) {
  const {layouts, setLayouts, selections, setSelections } = props;


  const handleLayoutSelect = (i) => {
    setLayouts(
      layouts.map((layout, index) =>
        i === index
          ? { ...layout, isSelected: true }
          : { ...layout, isSelected: false }
      )
    );
    let measurements = {"A":3}
    if(i!==1) measurements["B"]=3
    if(i===2) measurements["C"] = 3
    setSelections({ ...selections, layout: layouts[i].text,measurements });
  };

  return (
    <div className="text-center grid gap-6 ">
      <h4 className="text-xl font-semibold">
        Select the layout for your kitchen
      </h4>
      <p className="">
        Want to know more.{" "}
        <span className="text-secondary font-medium cursor-pointer">
          Click here
        </span>
      </p>
      <div className=" mt-2 grid grid-cols-2  sm:grid-cols-3 justify-center items-center gap-4">
        {layouts.map((layout, index) => (
          <div
            onClick={() => handleLayoutSelect(index)}
            key={index}
            className={`relative ${index === 3 && "col-start-2"}  ${
              layout.isSelected ? " border-secondary" : "border-transparent"
            } border-2 rounded-md overflow-hidden cursor-pointer`}
          >
            <div
              className={`absolute right-4 top-4 rounded-full bg-white  ${
                layout.isSelected
                  ? "border-[6px] border-secondary"
                  : "border-slate-700"
              } h-[20px] w-[20px] border p-1`}
            ></div>
            <img src={layout.image} alt={layout.text} />
            <p className="text-center py-2">{layout.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
