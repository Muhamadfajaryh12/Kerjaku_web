"use client";
import VacancyCard from "@/components/card/VacancyCard";
import PaginationCommon from "@/components/common/Pagination";
import Filter from "@/components/navigation/Filter";
import { useFetch } from "@/hooks/useFetch";
import LayoutUnAuthentication from "@/layouts/LayoutUnAuthentication";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const DashboardPage = () => {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 10;

  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/vacancy?
    ` +
      `&search=${params.get("search") || ""}` +
      `&category=${params.get("category") || ""}` +
      `&type=${params.get("type") || ""}` +
      `&location=${params.get("location") || ""}`
  );
  const { data: dataCategory } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/category`
  );

  const totalPages = Math.ceil((data?.length || 0) / itemsPage);
  const currentItems =
    data?.slice((currentPage - 1) * itemsPage, currentPage * itemsPage) || [];
  return (
    <LayoutUnAuthentication>
      <div className="flex gap-4">
        <Filter data={dataCategory} />
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4 w-full">
            {currentItems?.map((item, index) => (
              <VacancyCard key={index} data={item} />
            ))}
          </div>
          <Flex justifyContent="center">
            <PaginationCommon
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </Flex>
        </div>
      </div>
    </LayoutUnAuthentication>
  );
};

export default DashboardPage;
