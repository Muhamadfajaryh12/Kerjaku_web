"use client";
import VacancyCard from "@/components/card/VacancyCard";
import { useCurrency } from "@/hooks/useCurrency";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import { Badge, Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaClock, FaLocationDot } from "react-icons/fa6";

const DetailVacancyPage = () => {
  const params = useParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/vacancy/${params.id}`
  );
  return (
    <MainLayout>
      <Flex justifyContent="space-between" gap="5">
        <div className="w-full">
          <Flex gap="5" borderBottomWidth="2px" paddingBottom="4">
            <Image
              rounded="sm"
              src={`http://127.0.0.1:3000/${data?.data?.company?.photo}`}
              width="200px"
              height="200px"
            />
            <Stack>
              <Text fontWeight="bold" fontSize="2xl">
                {data?.data?.name_vacancy}
              </Text>
              <Text fontWeight="semibold" color="blue">
                {data?.data?.company?.company_name}
              </Text>
              <p className="flex items-center gap-2 text-sm">
                <BiBuilding />
                <span>{data?.data?.category}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaClock />
                <span>{data?.data?.type}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <FaLocationDot />
                <span>{data?.data?.location}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <BiDollar />
                <span>{useCurrency(data?.data?.salary)}</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                Close <span>{useDate(data?.data?.date_end)}</span>
              </p>
              <Button asChild colorPalette="blue">
                <Link href={`/vacancy/form/${data?.data?.id}`}>Apply Now</Link>
              </Button>
            </Stack>
          </Flex>
          <Box my="5">
            <Stack gap="2">
              <Text fontWeight="bold">Minimum Requirement</Text>
              <Flex gap="2">
                <Badge size="lg">{data?.data?.education}</Badge>
                <Badge size="lg">{data?.data?.experience_time}</Badge>
                <Badge size="lg">{data?.data?.at_where}</Badge>
                <Badge size="lg">Qty {data?.data?.qty}</Badge>
              </Flex>
              <Text fontWeight="bold" mt="2">
                Description Job
              </Text>
              <Text textAlign="justify">{data?.data?.description}</Text>
            </Stack>
          </Box>
        </div>
        <div>
          <Text fontWeight="bold" mb="3">
            Other vacancies
          </Text>
          <Flex direction="column" gap="3" w="72">
            {data?.other?.map((item, index) => (
              <VacancyCard data={item} key={index} />
            ))}
          </Flex>
        </div>
      </Flex>
    </MainLayout>
  );
};

export default DetailVacancyPage;
