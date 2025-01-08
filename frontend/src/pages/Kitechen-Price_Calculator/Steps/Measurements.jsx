import LshapedMeasurements from "/kitchen-price-calculator/l-shaped-measurements.png";
import StraightMeasurements from "/kitchen-price-calculator/straight-measurements.png";
import UshapedMeasurements from "/kitchen-price-calculator/u-shaped-measurements.png";
import ParallelMeasurements from "/kitchen-price-calculator/parallel-u-measurements.png";

export default function Measurements(props) {
  const { selections, setSelections } = props;
  return (
    <div className="md:px-16 grid gap-6 w-[90%] m-auto pb-12">
      <h4 className="text-center font-semibold text-lg">
        Now review the measurements for accuracy
      </h4>
      <img
        src={
          selections.layout === "L-shaped"
            ? LshapedMeasurements
            : selections.layout === "Straight"
            ? StraightMeasurements
            : selections.layout === "U-shaped"
            ? UshapedMeasurements
            : ParallelMeasurements
        }
        alt={selections.layout}
      />
      <p className="bg-[#f9e8bd] text-xs rounded-md text-center py-1">
        Standard size has been set for your convenience
      </p>

      <div className="flex items-center justify-around font-medium text-lg">
        <p>A</p>
        <select
          className="w-[80%] p-2 border border-slate-300 rounded-md "
          value={selections.measurements["A"]}
          onChange={(e)=>setSelections(prev=>({
            ...prev,measurements:{...prev.measurements,"A":Number(e.target.value)}
          }))}
        >
          {Array.from({length:10}).map((_,index)=>(
            <option value={index+3} key={index}>{index+3}</option>
          ))}
        </select>
        <p>ft.</p>
      </div>

      {selections.layout !== "Straight" && (
        <div className="flex items-center justify-around font-medium text-lg">
          <p>B</p>
          <select
            className="w-[80%] p-2 border border-slate-300 rounded-md "
            value={selections.measurements["B"]}
            onChange={(e)=>setSelections(prev=>({
              ...prev,measurements:{...prev.measurements,"B":Number(e.target.value)}
            }))}
          >
          {Array.from({length:10}).map((_,index)=>(
            <option value={index+3} key={index}>{index+3}</option>
          ))}
          </select>
          <p>ft.</p>
        </div>
      )}
      {selections.layout === "U-shaped" && (
        <div className="flex items-center justify-around font-medium text-lg">
          <p>C</p>
          <select
                    value={selections.measurements["C"]}
                    onChange={(e)=>setSelections(prev=>({
                      ...prev,measurements:{...prev.measurements,"C":Number(e.target.value)}
                    }))}
            className="w-[80%] p-2 border border-slate-300 rounded-md "
          >
          {Array.from({length:10}).map((_,index)=>(
            <option value={index+3} key={index}>{index+3}</option>
          ))}
          </select>
          <p>ft.</p>
        </div>
      )}
    </div>
  );
}
