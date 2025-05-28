"use client";
import { toaster } from "@/components/ui/toaster";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import CompanyLayout from "@/layouts/CompanyLayout";
import VacancyAPI from "@/services/VacancyAPI";
import { VacancyProps } from "@/types/Vacancy";
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
  const IdCompany = useLocalStorate("id_company");
  const { data = [], setData } = useFetch<VacancyProps[]>(
    `${process.env.NEXT_PUBLIC_API}/vacancy/company/${IdCompany}`
  );

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
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>No</Table.ColumnHeader>
            <Table.ColumnHeader>Name Vacancy</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Date Close</Table.ColumnHeader>
            <Table.ColumnHeader>Total Applicant</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>{++index}</Table.Cell>
              <Table.Cell>{item.name_vacancy}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{useDate(item.date_end)}</Table.Cell>
              <Table.Cell>
                <Button asChild size="xs">
                  <Link href={`/admin/vacancy/apply/${item.id}`}>
                    Open ({item.application_count})
                  </Link>
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Flex gap="2">
                  <Button
                    asChild
                    variant="surface"
                    size="xs"
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
