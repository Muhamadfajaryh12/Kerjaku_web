"use client";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { Badge, Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const DetailVacancyPage = () => {
  const params = useParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/vacancy/${params.id}`
  );
  console.log(data);
  return (
    <MainLayout>
      <Flex gap="5">
        <Image
          rounded="md"
          src={`http://127.0.0.1:3000/${data?.data?.company?.photo}`}
          width="300px"
        />
        <Stack>
          <Text fontWeight="bold" fontSize="2xl">
            {data?.data?.name_vacancy}
          </Text>
          <p className="flex items-center gap-2 text-sm">
            <BiBuilding />
            <span>{data?.data?.company.company_name}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <BiDollar />
            <span>{data?.data?.salary}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaLocationDot />
            <span>{data?.data?.location}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <BiDollar />
            <span>{data?.data?.salary}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            Ditutup :<span>{useDate(data?.data?.date_end)}</span>
          </p>
        </Stack>
      </Flex>
      <Box my="5">
        <Flex gap="2">
          <Badge>{data?.data?.category}</Badge>
          <Badge>{data?.data?.type}</Badge>
        </Flex>
        <Text>{data?.data?.description}</Text>
        <Text>Jumlah yang dibutukan : {data?.data?.qty} Orang</Text>
        <Button asChild>
          <Link href={`/vacancy/form/${data?.data?.id}`}>Lamar Sekarang</Link>
        </Button>
      </Box>
    </MainLayout>
  );
};

export default DetailVacancyPage;
