import ButtonProps from "@/app/types/button/button";
import React from "react";

const ButtonPrimary = ({ name, click, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 my-4 w-full rounded-sm bg-black text-white font-semibold "
      onClick={click}
    >
      {name}
    </button>
  );
};

export default ButtonPrimary;
