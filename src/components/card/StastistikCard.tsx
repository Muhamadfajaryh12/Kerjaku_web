import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const StastistikCard = ({ icon, title, value, color }) => {
  return (
    <Box w="48" h="56" borderWidth="1px" rounded="md" backgroundColor="white">
      <Flex justifyContent="center" alignItems="center" mt="5">
        <Flex
          justifyContent="center"
          alignItems="center"
          w="24"
          h="24"
          backgroundColor={color}
          rounded="sm"
        >
          {icon}
        </Flex>
      </Flex>
      <Stack mt="5">
        <Text fontWeight="bold" fontSize="sm" textAlign="center">
          {title}
        </Text>
        <Text fontWeight="bold" fontSize="xl" textAlign="center">
          {value}
        </Text>
      </Stack>
    </Box>
  );
};

export default StastistikCard;
