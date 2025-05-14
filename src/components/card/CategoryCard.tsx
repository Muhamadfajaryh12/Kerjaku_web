import React from "react";

const CategoryCard = ({ data }: { data: string }) => {
  return (
    <div className="border  p-8 text-center font-bold text-xl ">{data}</div>
  );
};

export default CategoryCard;
