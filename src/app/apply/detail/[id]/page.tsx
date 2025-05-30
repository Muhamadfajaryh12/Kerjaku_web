"use client";
import BadgeStatus from "@/components/common/BadgeStatus";
import { useCurrency } from "@/hooks/useCurrency";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import MainLayout from "@/layouts/MainLayout";
import {
  Badge,
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
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaClock, FaLocationDot } from "react-icons/fa6";

const DetailApplicationPage = () => {
  const params = useParams();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/application/${params.id}`
  );

  return (
    <MainLayout>
      <Card.Root w="full" p="2">
        <Flex gap="5" borderBottomWidth="2px" p="5">
          <Image
            rounded="sm"
            src={`http://127.0.0.1:3000/${data?.vacancy?.company?.photo}`}
            width="200px"
            height="200px"
          />
          <Stack>
            <Text fontWeight="bold" fontSize="2xl">
              {data?.vacancy?.name_vacancy}
            </Text>
            <Text fontWeight="semibold" color="blue">
              {data?.vacancy?.company?.company_name}
            </Text>
            <Flex alignItems="center" gap="2">
              <BiBuilding />
              <Text>{data?.vacancy?.category}</Text>
            </Flex>

            <Flex alignItems="center" gap="2">
              <FaClock />
              <Text>{data?.vacancy?.type}</Text>
            </Flex>

            <Flex alignItems="center" gap="2">
              <FaLocationDot />
              <Text>{data?.vacancy?.location}</Text>
            </Flex>

            <Flex alignItems="center" gap="2">
              <BiDollar />
              <Text>{useCurrency(data?.vacancy?.salary)}</Text>
            </Flex>

            <Flex alignItems="center" gap="2" fontSize="xs" color="gray">
              <Text>Posted {useDate(data?.vacancy?.date_start)}</Text>|
              <Text> Close {useDate(data?.vacancy?.date_end)}</Text>
            </Flex>
          </Stack>
        </Flex>
        <Box p="5" borderBottomWidth="2px">
          <Stack gap="2">
            <Text fontWeight="bold">Minimum Requirement</Text>
            <Flex gap="2">
              <Badge size="lg">{data?.vacancy?.education}</Badge>
              <Badge size="lg">{data?.vacancy?.experience_time}</Badge>
              <Badge size="lg">{data?.vacancy?.at_where}</Badge>
              <Badge size="lg">Qty {data?.vacancy?.qty}</Badge>
            </Flex>
            <Text fontWeight="bold" mt="2">
              Description Job
            </Text>
            <Text textAlign="justify">{data?.vacancy?.description}</Text>
          </Stack>
        </Box>
        <Stack gap="2" mx="5" my="5">
          <Text fontWeight="bold">
            Status <BadgeStatus value={data?.status} />
          </Text>
          <div>
            <Text fontWeight="bold">Note</Text>
            <Box borderWidth="1px" p="2" rounded="md">
              <Text>{data?.note || "Tidak ada catatan"}</Text>
            </Box>
          </div>
        </Stack>
      </Card.Root>
    </MainLayout>
  );
};

export default DetailApplicationPage;
