"use client";
import ButtonLink from "@/components/button/ButtonLink";
import { toaster } from "@/components/ui/toaster";
import { useFetch } from "@/hooks/useFetch";
import CompanyLayout from "@/layouts/CompanyLayout";
import VacancyAPI from "@/services/VacancyAPI";
import {
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
  Table,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

const VacancyAdminPage = () => {
  const { data, setData } = useFetch(`${process.env.NEXT_PUBLIC_API}/vacancy`);

  const onDelete = async (id: number) => {
    const response = await VacancyAPI.DeleteVacancy(id);
    if (response?.status == 200) {
      toaster.create({
        title: response.message,
        type: "success",
      });

      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };
  return (
    <CompanyLayout title="Vacancy">
      <Flex justifyContent="end">
        <Button asChild size="xs" colorPalette="green">
          <Link href="/admin/vacancy/form">Add Vacancy</Link>
        </Button>
      </Flex>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>No</Table.ColumnHeader>
            <Table.ColumnHeader>Name Vacancy</Table.ColumnHeader>
            <Table.ColumnHeader>Total Applicant</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>{++index}</Table.Cell>
              <Table.Cell>{item.name_vacancy}</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <Button
                    asChild
                    variant="surface"
                    size="sm"
                    colorPalette="blue"
                  >
                    <Link href={`/admin/vacancy/form/${item.id}`}>
                      <BiPencil />
                    </Link>
                  </Button>
                  <Dialog.Root
                    motionPreset="slide-in-bottom"
                    role="alertdialog"
                  >
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
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our systems.
                            </p>
                          </Dialog.Body>
                          <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                              colorPalette="red"
                              onClick={() => onDelete(item?.id)}
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
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </CompanyLayout>
  );
};

export default VacancyAdminPage;
