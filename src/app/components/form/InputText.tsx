import InputTextProps from "@/app/types/form/InputText";
import React from "react";
import { FieldValues } from "react-hook-form";

const InputText = <T extends FieldValues>({
  name,
  type,
  register,
  required,
  errors,
}: InputTextProps<T>) => {
  return (
    <div className="my-2 w-full">
      <label htmlFor="" className="font-semibold opacity-80 capitalize text-xs">
        {name.toString()}
      </label>
      <input
        type={type}
        className={`block border p-1 rounded-sm w-full ${
          errors?.[name] ? `border-red-500` : ``
        }`}
        {...register(name, { required })}
      />
    </div>
  );
};

export default InputText;
