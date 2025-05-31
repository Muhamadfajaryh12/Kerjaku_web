"use client";
import VacancyCard from "@/components/card/VacancyCard";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import DetailLayout from "@/layouts/DetailLayout";
import {
  Box,
  Card,
  Container,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React from "react";
import { BiBuilding } from "react-icons/bi";
import { FaLocationDot, FaPeopleGroup } from "react-icons/fa6";

const CompanyDetailPage = () => {
  const params = useParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/company/${params.id}`
  );

  return (
    <DetailLayout>
      <Card.Root w="full" p="4">
        <Flex w="full" p="3" gap="4">
          <Image
            rounded="md"
            src={`http://127.0.0.1:3000/${data?.photo}`}
            width="200px"
            height="200px"
          />
          <Stack gap="4" w="full">
            <Text fontWeight="bold" fontSize="3xl">
              {data?.company_name}
            </Text>
            <Text fontSize="xl">{data?.description}</Text>
            <Flex gap="5">
              <Flex gap="3" alignItems="center">
                <BiBuilding />
                <Text>{data?.company_type}</Text>
              </Flex>
              <Flex gap="3" alignItems="center">
                <FaLocationDot />
                <Text>{data?.location}</Text>
              </Flex>
            </Flex>
            <Flex gap="3" alignItems="center">
              <FaPeopleGroup />
              <Text>{data?.size} Employee</Text>
            </Flex>
          </Stack>
        </Flex>
      </Card.Root>
      <Container mt="10">
        <Text fontWeight="bold" my="5" fontSize="xl">
          Vacancy
        </Text>
        <div className="grid grid-cols-4 gap-3">
          {data?.vacancy?.map((item, index) => (
            <VacancyCard key={index} data={item} />
          ))}
        </div>
      </Container>
    </DetailLayout>
  );
};

export default CompanyDetailPage;
