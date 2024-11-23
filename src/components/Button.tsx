import React from "react";
import capatalizeText from "../utils/capitalizeText";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div
      className="bg-cyan-500 text-slate-800 font-bold text-center py-3 px-6 cursor-pointer select-none 
      rounded-md w-full md:w-1/3"
      onClick={onClick}
    >
      {capatalizeText(text)}
    </div>
  );
};

export default Button;
