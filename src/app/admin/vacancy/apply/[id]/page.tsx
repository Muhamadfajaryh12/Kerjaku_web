"use client";
import { toaster } from "@/components/ui/toaster";
import { useDate } from "@/hooks/useDate";
import { useFetch } from "@/hooks/useFetch";
import CompanyLayout from "@/layouts/CompanyLayout";
import ApplicationAPI from "@/services/ApplicationAPI";
import { statusApplication } from "@/utils/data";
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Portal,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { LuFolder, LuUser } from "react-icons/lu";
import { MdWork } from "react-icons/md";

const ApplyAdminPage = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const { data } = useFetch(
    `${process.env.NEXT_PUBLIC_API}/application?vacancy=${params.id}`
  );

  const handleDetail = async (id: number) => {
    const response = await ApplicationAPI.GetApplicationDetail(id);
    if (response?.status == 200) {
      setDetail(response.data);
      setOpen(true);
      reset({
        status: response.data.status,
      });
    }
  };

  const submitUpdate = async (data) => {
    const response = await ApplicationAPI.UpdateApplication({
      id: detail?.id,
      status: data.status,
      note: data.note,
    });
    if (response?.status == 200) {
      toaster.create({
        title: response.message,
        type: "success",
      });
    }
  };
  return (
    <CompanyLayout title={data[0]?.vacancy?.name_vacancy}>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>No</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Education</Table.ColumnHeader>
            <Table.ColumnHeader>Date Apply</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{++index}</Table.Cell>
              <Table.Cell>{item?.profile?.name}</Table.Cell>
              <Table.Cell>{item?.profile?.education}</Table.Cell>
              <Table.Cell>{useDate(item?.date)}</Table.Cell>
              <Table.Cell>
                <Badge>{item?.status}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button size="xs" onClick={() => handleDetail(item?.id)}>
                  <BiDetail />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Dialog.Root
        size="lg"
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>View Information</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Tabs.Root defaultValue="profile">
                  <Tabs.List>
                    <Tabs.Trigger value="profile">
                      <LuUser />
                      Profile
                    </Tabs.Trigger>
                    <Tabs.Trigger value="experience">
                      <MdWork />
                      Experience
                    </Tabs.Trigger>
                    <Tabs.Trigger value="additional">
                      <LuFolder />
                      Additional
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="profile">
                    <Stack gap="3">
                      <Box>
                        <div className="grid grid-cols-2 mb-2">
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Name
                            </Text>
                            <Text mb="2">{detail?.profile.name}</Text>
                          </div>
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Education
                            </Text>
                            <Text mb="2">{detail?.profile.education}</Text>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 ">
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Address
                            </Text>
                            <Text>{detail?.profile.address}</Text>
                          </div>
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Birth
                            </Text>
                            <Text>{useDate(detail?.profile.birth)}</Text>
                          </div>
                        </div>
                      </Box>
                      <Box>
                        <div className="grid grid-cols-2">
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Email
                            </Text>
                            <Text>{detail?.profile.email}</Text>
                          </div>{" "}
                          <div>
                            <Text fontWeight="bold" mb="2">
                              Phone
                            </Text>
                            <Text>{detail?.profile.phone}</Text>
                          </div>
                        </div>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" mb="2">
                          Summary
                        </Text>
                        <Text>{detail?.profile.summary}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold" mb="2">
                          Skills
                        </Text>
                        <div className="flex gap-2 items-center">
                          {detail?.profile?.skills?.map((item, index) => (
                            <Badge size="sm" key={index}>
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </Box>
                    </Stack>
                  </Tabs.Content>
                  <Tabs.Content value="experience">
                    {detail?.profile?.experience?.map((item, index) => (
                      <Box key={index} borderWidth="1px" rounded="sm" p="2">
                        <Text fontWeight="bold">
                          {item.name_experience} - {item.position}
                        </Text>
                        <Text>
                          {useDate(item.date_start)} - {useDate(item.date_end)}
                        </Text>
                        <Text>{item.name_company}</Text>
                      </Box>
                    ))}
                  </Tabs.Content>
                  <Tabs.Content value="additional">
                    <Stack gap="3">
                      <div>
                        <Text fontWeight="bold">Cover Letter</Text>
                        <Button size="sm">Cover Letter</Button>
                      </div>
                      <div>
                        <Text fontWeight="bold">Circulum Virtae</Text>
                        <Button size="sm">Circulum Virtae</Button>
                      </div>
                    </Stack>
                  </Tabs.Content>
                </Tabs.Root>
                <Box mt="4">
                  <form>
                    <Stack gap="3">
                      <Field.Root invalid={!!errors.status}>
                        <Field.Label fontWeight="bold">Status</Field.Label>
                        <Controller
                          control={control}
                          name="status"
                          render={({ field }) => (
                            <Select.Root
                              name={field.name}
                              value={[field.value]}
                              onValueChange={({ value }) =>
                                field.onChange(value[0])
                              }
                              onInteractOutside={() => field.onBlur()}
                              collection={statusApplication}
                              style={{ zIndex: 9999 }}
                            >
                              <Select.HiddenSelect />
                              <Select.Control>
                                <Select.Trigger>
                                  <Select.ValueText placeholder="Select status " />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                  <Select.Indicator />
                                </Select.IndicatorGroup>
                              </Select.Control>
                              <Portal>
                                <Select.Positioner style={{ zIndex: 9999 }}>
                                  <Select.Content>
                                    {statusApplication.items.map((item) => (
                                      <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                      </Select.Item>
                                    ))}
                                  </Select.Content>
                                </Select.Positioner>
                              </Portal>
                            </Select.Root>
                          )}
                        />
                        <Field.ErrorText>
                          {errors.status?.message}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={!!errors.note}>
                        <Field.Label fontWeight="bold">Note</Field.Label>
                        <Textarea {...register("note")} size="lg" />
                        <Field.ErrorText>
                          {errors.note?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </Stack>
                  </form>
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button type="button" onClick={handleSubmit(submitUpdate)}>
                  Save
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </CompanyLayout>
  );
};

export default ApplyAdminPage;
