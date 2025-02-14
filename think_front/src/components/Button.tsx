import { ReactElement } from "react";

interface ButtonProps{
  variant: "primary" | "secondary",
  text: string,
  startIcon?: ReactElement
  onClick?: () => void;
  fullWidth?:boolean;
  loading?:boolean;
}

const variantClasses = {
    "primary":"bg-purple-600 text-white hover:bg-purple-500",
    "secondary":"bg-purple-300 text-purple-600 hover:bg-purple-200"
};

const defaultStyle =  "px-4 py-2 rounded-md font-light-bold flex items-center"

export function Button({variant,text,startIcon,onClick, fullWidth,loading}: ButtonProps){
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyle + `${fullWidth ? " w-full justify-center items-center" : ""} 
    ${loading ? "opacity-45" : ""}`}
         disabled={loading}>
        <div className="pr-2">
        {startIcon} </div>
        {text }
    </button>
}