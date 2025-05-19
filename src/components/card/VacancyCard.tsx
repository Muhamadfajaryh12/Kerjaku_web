import { useCurrency } from "@/hooks/useCurrency";
import { useDate } from "@/hooks/useDate";
import { VacancyProps } from "@/types/Vacancy";
import { Badge, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const VacancyCard = ({ data }: VacancyProps) => {
  return (
    <Link href={`/vacancy/${data?.id}`} className="w-96">
      <Box id="card-vacancy" borderWidth="1px" rounded="md" p="2" w="full">
        <Stack gap="2">
          <div className="w-full">
            <Flex gap="2" alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bolder">
                {data.name_vacancy}
              </Text>
              <Text fontSize="xs">Gaji {useCurrency(data?.salary)}</Text>
            </Flex>
            <Flex gap="2" my="1">
              <Badge>{data?.type}</Badge>
              <Badge>{data?.category}</Badge>
            </Flex>
          </div>
          <Flex borderBottomWidth="1px" alignItems="center" gap="2" my="1">
            <Image
              rounded="sm"
              src={`http://127.0.0.1:3000/${data?.company?.photo}`}
              width="50px"
              height="50px"
            />
            <div>
              <Text fontSize="sm" fontWeight="bold">
                {data?.company.company_name}
              </Text>
              <Text fontSize="xs">{data?.location}</Text>
            </div>
          </Flex>
          <Text fontSize="xs">Berakhir pada {useDate(data.date_start)}</Text>
        </Stack>
      </Box>
    </Link>
  );
};

export default VacancyCard;
