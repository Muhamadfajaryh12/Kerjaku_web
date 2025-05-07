import ButtonProps from "@/types/button/button";
import Link from "next/link";
import React from "react";

const ButtonLink = ({ name, type, link }: ButtonProps) => {
  return (
    <Link href={link}>
      <button
        type={type}
        className="bg-green-400 text-xs font-semibold p-2 rounded-sm text-white my-2"
      >
        {name}
      </button>
    </Link>
  );
};

export default ButtonLink;
