export default function Button({ text = "Default", color = "primary",onClick=()=>{return} }) {
  return (
    <div className={`bg-${color} w-fit p-1 shadow-buttonShadow`} onClick={onClick}>
      <button className="text-white border border-black p-2  text-xl">
        {text}
      </button>
    </div>
  );
}
