"use client";
import ApplicationCard from "@/components/card/ApplicationCard";
import PaginationCommon from "@/components/common/Pagination";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const ProfileApplyPage = () => {
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/application?user=1`
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPage = 5;
  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPage);
  const currentItems =
    data?.data?.slice((currentPage - 1) * itemsPage, currentPage * itemsPage) ||
    [];

  return (
    <MainLayout>
      <Breadcrumb.Root my="5">
        <Breadcrumb.List>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>Application</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Stack>
        <Text fontSize="xl" fontWeight="bold">
          List Applications
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          Total application : {data?.data?.length}
        </Text>
        <Stack>
          {currentItems.map((item, index) => (
            <ApplicationCard data={item} key={index} />
          ))}
        </Stack>
        <Flex justifyContent="center">
          <PaginationCommon
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Flex>
      </Stack>
    </MainLayout>
  );
};

export default ProfileApplyPage;
