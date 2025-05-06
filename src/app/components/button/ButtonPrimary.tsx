import ButtonProps from "@/app/types/button/button";
import React from "react";

const ButtonPrimary = ({ name, click, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 w-full rounded-sm bg-blue-400"
      onClick={click}
    >
      {name}
    </button>
  );
};

export default ButtonPrimary;
