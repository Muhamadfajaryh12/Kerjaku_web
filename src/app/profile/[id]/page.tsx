"use client";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { Breadcrumb } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const params = useParams();

  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/profile/${params.id}`
  );
  return (
    <MainLayout>
      <Breadcrumb.Root my="5">
        <Breadcrumb.List>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>{data?.data?.name}</Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </MainLayout>
  );
};

export default ProfilePage;
