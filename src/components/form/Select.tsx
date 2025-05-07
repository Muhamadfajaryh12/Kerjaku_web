import React from "react";

const Select = ({ data, name, register, required, errors }) => {
  return (
    <div className="my-2 w-full">
      <label htmlFor="" className="font-semibold opacity-80 capitalize text-xs">
        {name.toString()}
      </label>
      <select
        className={`block border p-2 rounded-sm w-full ${
          errors?.[name] ? `border-red-500` : ``
        }`}
        {...register(name, { required })}
      >
        <option value="">Pilih Tipe Perusahan</option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
