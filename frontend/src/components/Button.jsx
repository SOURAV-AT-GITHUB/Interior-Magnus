export default function Button({ text = "Default", color = "primary",onClick=()=>{return},isDisabled=false }) {
  return (
    <button disabled={isDisabled} className={`bg-${color} w-fit p-1 shadow-buttonShadow min-w-[100px] disabled:opacity-75 disabled:cursor-progress`} onClick={onClick}>
      <p className="w-full text-white border border-black p-2  text-xl">
        {text}
      </p>
    </button>
  );
}
