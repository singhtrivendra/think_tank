import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" ;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-500",
  secondary: "bg-purple-300 text-purple-600 hover:bg-purple-200",
};

const defaultStyle =
  "px-4 py-2 rounded-md font-bold flex items-center transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  className, 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyle} ${
        fullWidth ? "w-full justify-center" : "justify-start"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  );
}