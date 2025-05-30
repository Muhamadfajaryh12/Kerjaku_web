import { Badge, Box } from "@chakra-ui/react";
import React from "react";

const BadgeStatus = ({ value }: { value: string }) => {
  switch (value) {
    case "Rejected":
      return (
        <Box>
          <Badge size="sm" variant="surface" colorPalette="red">
            {value}
          </Badge>
        </Box>
      );

    case "Completed":
      return (
        <Box>
          <Badge size="sm" variant="surface" colorPalette="green">
            {value}
          </Badge>
        </Box>
      );
    default:
      return (
        <Box>
          <Badge size="sm" variant="surface" colorPalette="blue">
            {value}
          </Badge>
        </Box>
      );
  }
};

export default BadgeStatus;
