"use client";
import VacancyCard from "@/components/card/VacancyCard";
import { useCurrency } from "@/hooks/useCurrency";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  Card,
} from "@chakra-ui/react";
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
      <Flex justifyContent="space-between" gap="5" my="3">
        <Card.Root w="full" p="2">
          <Flex gap="5" borderBottomWidth="2px" p="5">
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
              <Flex alignItems="center" gap="2">
                <BiBuilding />
                <Text>{data?.data?.category}</Text>
              </Flex>

              <Flex alignItems="center" gap="2">
                <FaClock />
                <Text>{data?.data?.type}</Text>
              </Flex>

              <Flex alignItems="center" gap="2">
                <FaLocationDot />
                <Text>{data?.data?.location}</Text>
              </Flex>

              <Flex alignItems="center" gap="2">
                <BiDollar />
                <Text>{useCurrency(data?.data?.salary)}</Text>
              </Flex>

              <Flex alignItems="center" gap="2" fontSize="xs" color="gray">
                <Text>Posted {useDate(data?.data?.date_start)}</Text>|
                <Text> Close {useDate(data?.data?.date_end)}</Text>
              </Flex>
              <Button asChild colorPalette="blue" size="sm" variant="surface">
                <Link href={`/vacancy/form/${data?.data?.id}`}>Apply Now</Link>
              </Button>
            </Stack>
          </Flex>
          <Box my="5" mx="5">
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
        </Card.Root>
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
