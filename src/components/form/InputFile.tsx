import React from "react";
import { MdUpload } from "react-icons/md";

const InputFile = ({ name, handleChangeImage }) => {
  return (
    <label className="w-auto">
      <input
        type="file"
        hidden
        onChange={(e) => handleChangeImage(e.target.files?.[0])}
      />
      <div className="cursor-pointer bg-black text-white p-2 text-xs text-center font-semibold rounded my-2  flex justify-center items-center gap-2 w-32">
        <span>{name}</span>
        <MdUpload size={20} />
      </div>{" "}
    </label>
  );
};

export default InputFile;
