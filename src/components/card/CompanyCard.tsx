import { CompanyResponseProps } from "@/types/Company";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CompanyCard = ({ data }: { data: CompanyResponseProps }) => {
  return (
    <Link href={`/company/${data?.id}`}>
      <Box borderWidth="1px" rounded="md" p="2">
        <Flex gap="2">
          <Image
            rounded="md"
            src={`http://127.0.0.1:3000/${data?.photo}`}
            width="150px"
            height="150px"
          />
          <Stack>
            <Text fontWeight="bold" fontSize="xl">
              {data.company_name}
            </Text>
            <Text fontSize="sm">{data.location}</Text>
          </Stack>
        </Flex>
      </Box>
    </Link>
  );
};

export default CompanyCard;
