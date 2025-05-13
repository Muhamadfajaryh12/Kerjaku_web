import { useDate } from "@/hooks/useDate";
import { VacancyProps } from "@/types/Vacancy";
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const VacancyCard = ({ data }: VacancyProps) => {
  return (
    <Link href={`/vacancy/${data?.id}`}>
      <Box id="card-vacancy" borderWidth="1px" rounded="md" p="2">
        <Flex alignItems="start" gap="2">
          <Image
            rounded="md"
            src={`http://127.0.0.1:3000/${data?.company?.photo}`}
            width="150px"
            height="150px"
          />

          <div className="w-full">
            <Flex gap="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bolder">
                {data.name_vacancy}
              </Text>
              <Badge colorPalette="green">{data?.status}</Badge>
            </Flex>
            <Flex gap="2" alignItems="center">
              <BiDollar />
              <Text fontSize="xs">{data?.salary}</Text>
            </Flex>
            <Flex gap="2" alignItems="center">
              <BiBuilding />
              <Text fontSize="xs">{data?.company.company_name}</Text>-
              <Text fontSize="xs">{data?.type}</Text>
            </Flex>
            <Flex gap="2" alignItems="center">
              <FaLocationDot />
              <Text fontSize="xs">{data?.location}</Text>
            </Flex>
            <Flex gap="4" alignItems="center">
              <Text fontSize="xs">{useDate(data.date_start)}</Text>-
              <Text fontSize="xs">{useDate(data.date_start)}</Text>
            </Flex>
          </div>
        </Flex>
      </Box>
    </Link>
  );
};

export default VacancyCard;
