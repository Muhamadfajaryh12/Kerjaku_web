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
  return (
    <MainLayout>
      <Flex gap="5">
        <Image
          rounded="sm"
          src={`http://127.0.0.1:3000/${data?.company?.photo}`}
          width="300px"
        />
        <Stack>
          <Text fontWeight="bold" fontSize="2xl">
            {data?.name_vacancy}
          </Text>
          <p className="flex items-center gap-2 text-sm">
            <BiBuilding />
            <span>{data?.company?.company_name}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <BiDollar />
            <span>{data?.salary}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaLocationDot />
            <span>{data?.location}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            <BiDollar />
            <span>{data?.salary}</span>
          </p>
          <p className="flex items-center gap-2 text-sm">
            Berakhir tanggal <span>{useDate(data?.date_end)}</span>
          </p>
        </Stack>
      </Flex>
      <Box my="5">
        <Flex gap="2">
          <Badge>{data?.category}</Badge>
          <Badge>{data?.type}</Badge>
        </Flex>
        <Text>{data?.description}</Text>
        <Text>Jumlah yang dibutukan : {data?.qty} Orang</Text>
        <Button asChild>
          <Link href={`/vacancy/form/${data?.id}`}>Lamar Sekarang</Link>
        </Button>
      </Box>
    </MainLayout>
  );
};

export default DetailVacancyPage;
