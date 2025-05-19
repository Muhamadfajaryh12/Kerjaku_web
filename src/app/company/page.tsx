"use client";
import CompanyCard from "@/components/card/CompanyCard";
import PaginationCommon from "@/components/common/Pagination";
import Filter from "@/components/navigation/Filter";
import { useFetch } from "@/hooks/useFetch";
import LayoutUnAuthentication from "@/layouts/LayoutUnAuthentication";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

const CompanyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 6;
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/company`);

  const totalPages = Math.ceil((data?.length || 0) / itemsPage);
  const currentItems =
    data?.slice((currentPage - 1) * itemsPage, currentPage * itemsPage) || [];
  return (
    <LayoutUnAuthentication>
      <Flex gap="4">
        <Filter />
        <div>
          <div className="grid grid-cols-2 gap-4">
            {currentItems.map((item, index) => (
              <CompanyCard key={index} data={item} />
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
      </Flex>
    </LayoutUnAuthentication>
  );
};

export default CompanyPage;
