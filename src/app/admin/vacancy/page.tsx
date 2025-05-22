"use client";
import ButtonLink from "@/components/button/ButtonLink";
import { useFetch } from "@/hooks/useFetch";
import CompanyLayout from "@/layouts/CompanyLayout";
import { Button, Flex, Table } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

const VacancyAdminPage = () => {
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API}/vacancy`);
  return (
    <CompanyLayout title="Vacancy">
      <div>
        <ButtonLink
          name="Membuat Vacancy"
          type="button"
          link="/company/admin/vacancy/form"
        />
      </div>
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
                    <Link href={`admin/vacancy/apply/${item.id}`}>
                      <BiPencil />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="surface"
                    size="sm"
                    colorPalette="red"
                  >
                    <Link href={`admin/vacancy/apply/${item.id}`}>
                      <BiTrash />
                    </Link>
                  </Button>
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
