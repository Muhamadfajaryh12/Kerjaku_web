"use client";
import VacancyCard from "@/components/card/VacancyCard";
import Filter from "@/components/navigation/Filter";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { useSearchParams } from "next/navigation";
import React from "react";

const DashboardPage = () => {
  const params = useSearchParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/vacancy?
    ` +
      `&search=${params.get("search") || ""}` +
      `&category=${params.get("category") || ""}` +
      `&type=${params.get("type") || ""}` +
      `&location=${params.get("location") || ""}`
  );

  return (
    <MainLayout>
      <div className="flex gap-4">
        <Filter />
        <div className="grid grid-cols-2 gap-4">
          {data.data?.map((item, index) => (
            <VacancyCard key={index} data={item} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
