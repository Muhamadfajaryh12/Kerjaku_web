import React from "react";

const CategoryCard = ({ data }) => {
  console.log(data);
  return (
    <div className="border  p-8 text-center font-bold text-xl ">{data}</div>
  );
};

export default CategoryCard;
