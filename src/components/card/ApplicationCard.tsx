import { useDate } from "@/hooks/useDate";
import { Badge, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

const ApplicationCard = ({ data }) => {
  return (
    <Box width="" borderWidth="1px" rounded="sm" p="2" shadow="xs">
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
          <Text fontSize="sm">
            Lowongan Berakhir {useDate(data?.vacancy?.date_end)}
          </Text>
          <Box>
            <Badge colorPalette="green">{data?.status}</Badge>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ApplicationCard;
