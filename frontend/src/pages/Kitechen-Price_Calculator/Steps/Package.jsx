import CheckIcon from '@mui/icons-material/Check';
export default function Package(props) {
  const {packages, setPackages,setSelections} = props;
  const handlePackageSelect = (i) =>{
    setPackages(
      packages.map((item, index) =>
        index === i
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
    setSelections(prev=>({...prev,package:packages[i].title}))
  }


  return (
    <div className="">
      <h4 className="text-center m-auto mb-4 font-medium text-xl">Pick your package</h4>
      <div className="grid gap-4 pb-20">
        {packages.map((item, index) => (
          <div key={index} 
          className={`grid gap-4  ${item.isSelected ? "border-red-500" : "border-transparent"}   border-[3px]  p-2 cursor-pointer sm:w-2/4 min-w-[250px] m-auto rounded-lg`}
          onClick={()=>handlePackageSelect(index)}
          >
            <div className="flex gap-2">
              <div
                className={` rounded-[50%] bg-white  ${
                  item.isSelected
                    ? "border-[6px] border-red-500 h-[20px] w-[22px]"
                    : "border-slate-700 h-[20px] w-[32px]"
                }  border p-1`}
              ></div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
            {item.image && <img src={item.image} alt={item.title}/>}
            <ul>
              {item.benefits.map(benefit=>(
                <li key={benefit}><div className="flex gap-2"><CheckIcon color="success"/><p>{benefit}</p></div></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
