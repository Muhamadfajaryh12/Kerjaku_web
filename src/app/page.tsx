"use client";
import CategoryCard from "@/components/card/CategoryCard";
import VacancyCard from "@/components/card/VacancyCard";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const DashboardPage = () => {
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/vacancy`);
  const { data: dataCategory } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/category`
  );
  console.log(dataCategory);
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4">
        {dataCategory?.data?.category.map((item, index) => (
          <CategoryCard key={index} data={item} />
        ))}
      </div>
      <div>
        {data.data?.map((item, index) => (
          <VacancyCard key={index} data={item} />
        ))}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
