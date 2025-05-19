"use client";
import VacancyCard from "@/components/card/VacancyCard";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import DetailLayout from "@/layouts/DetailLayout";
import { Box, Container, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaLocationDot, FaPeopleGroup } from "react-icons/fa6";

const CompanyDetailPage = () => {
  const id = useLocalStorate("id");
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/company/${id}`);

  return (
    <DetailLayout>
      <Container borderBottomWidth="1px" w="full">
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
                <FaLocationDot />
                <Text>{data?.company_type}</Text>
              </Flex>
              <Flex gap="3" alignItems="center">
                <FaLocationDot />
                <Text>{data?.location}</Text>
              </Flex>
              <Flex gap="3" alignItems="center">
                <FaPeopleGroup />
                <Text>{data?.size} Employee</Text>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Container>
      <Container mt="10">
        <Text>Vacancy</Text>
        <Stack>
          {data?.vacancy?.map((item, index) => (
            <VacancyCard key={index} data={item} />
          ))}
        </Stack>
      </Container>
    </DetailLayout>
  );
};

export default CompanyDetailPage;
