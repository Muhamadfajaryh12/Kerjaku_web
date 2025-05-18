"use client";
import ApplicationCard from "@/components/card/ApplicationCard";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb, Stack, Text } from "@chakra-ui/react";
import React from "react";

const ProfileApplyPage = () => {
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/application?user=1`
  );
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
          {data?.data?.map((item, index) => (
            <ApplicationCard data={item} key={index} />
          ))}
        </Stack>
      </Stack>
    </MainLayout>
  );
};

export default ProfileApplyPage;
