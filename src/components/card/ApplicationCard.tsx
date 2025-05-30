import { useDate } from "@/hooks/useDate";
import { Badge, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import BadgeStatus from "../common/BadgeStatus";
import Link from "next/link";

const ApplicationCard = ({ data }) => {
  return (
    <Link href={`/apply/detail/${data.id}`}>
      <Box
        width="full"
        borderWidth="1px"
        rounded="md"
        p="2"
        shadow="xs"
        backgroundColor="white"
      >
        <Flex gap="5">
          <Image
            rounded="md"
            src={`http://127.0.0.1:3000/${data?.vacancy?.company?.photo}`}
            width="100px"
            height="100px"
          />
          <Stack gap="1">
            <Text fontSize="xl" fontWeight="bold">
              {data?.vacancy?.name_vacancy}
            </Text>
            <Text fontSize="sm">{data?.vacancy?.company?.company_name}</Text>
            <Flex gap="2" fontSize="xs">
              <Text>Posted {useDate(data?.vacancy?.date_start)}</Text>|
              <Text> Close {useDate(data?.vacancy?.date_end)}</Text>{" "}
            </Flex>
            <Box>
              <BadgeStatus value={data?.status} />
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Link>
  );
};

export default ApplicationCard;
