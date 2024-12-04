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
          name=""
          id=""
          className="w-[80%] p-2 border border-slate-300 rounded-md "
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <p>ft.</p>
      </div>

      {selections.layout !== "Straight" && (
        <div className="flex items-center justify-around font-medium text-lg">
          <p>B</p>
          <select
            name=""
            id=""
            className="w-[80%] p-2 border border-slate-300 rounded-md "
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <p>ft.</p>
        </div>
      )}
      {selections.layout === "U-shaped" && (
        <div className="flex items-center justify-around font-medium text-lg">
          <p>C</p>
          <select
            name=""
            id=""
            className="w-[80%] p-2 border border-slate-300 rounded-md "
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <p>ft.</p>
        </div>
      )}
    </div>
  );
}
