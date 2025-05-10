"use client";
import VacancyCard from "@/components/card/VacancyCard";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

const DashboardPage = () => {
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/vacancy`);
  return (
    <MainLayout>
      <div>
        {data.data?.map((item, index) => (
          <VacancyCard key={index} data={item} />
        ))}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
