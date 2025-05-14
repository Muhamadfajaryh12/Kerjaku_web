"use-client";
import { useDate } from "@/hooks/useDate";
import { ExperienceProps } from "@/types/Experience";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

const ExperienceCard = ({ data }: { data: ExperienceProps }) => {
  return (
    <Box borderWidth="1px" rounded="sm" p="2" minWidth="xl">
      <Flex justifyContent="space-between">
        <Text fontWeight="bold" fontSize="xl">
          {data.name_experience}
        </Text>
        <Flex gap="2">
          <Button size="xs" colorPalette="gray" variant="surface">
            <BiPencil />
          </Button>
          <Button size="xs" colorPalette="red" variant="surface">
            <BiTrash />
          </Button>
        </Flex>
      </Flex>
      <Text fontSize="sm">
        {data.name_company} - {data.position}
      </Text>
      <Text fontSize="sm">
        {useDate(data.date_start)} - {useDate(data.date_end)}
      </Text>
      <Text>{data.description}</Text>
    </Box>
  );
};

export default ExperienceCard;
