"use-client";
import { useDate } from "@/hooks/useDate";
import { ExperienceProps } from "@/types/Experience";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

const ExperienceCard = ({ data, onDelete }: { data: ExperienceProps }) => {
  return (
    <div>
      <Box borderWidth="1px" rounded="sm" p="2" minWidth="xl">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="xl">
            {data.name_experience}
          </Text>
          <Flex gap="2">
            <Button asChild size="xs" colorPalette="gray" variant="surface">
              <Link href={`/profile/experience/form/${data.id}`}>
                <BiPencil />
              </Link>
            </Button>
            <Dialog.Root motionPreset="slide-in-bottom" role="alertdialog">
              <Dialog.Trigger asChild>
                <Button size="xs" colorPalette="red" variant="surface">
                  <BiTrash />
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Are you sure?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <p>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        systems.
                      </p>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button
                        colorPalette="red"
                        onClick={() => onDelete(data?.id)}
                      >
                        Delete
                      </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Flex>
        </Flex>
        <Text fontSize="sm">
          {data.name_company} - {data.position}
        </Text>
        <Text fontSize="sm">
          {useDate(data.date_start)} - {useDate(data.date_end)}
        </Text>
        <Text truncate maxWidth="400px">
          {data.description}
        </Text>
      </Box>
    </div>
  );
};

export default ExperienceCard;
