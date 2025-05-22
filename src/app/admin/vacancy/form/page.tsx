"use client";
import InputText from "@/components/form/InputText";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import CompanyLayout from "@/layouts/CompanyLayout";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import {
  categoryJobData,
  educationData,
  experienceTimeData,
  siteData,
  typeData,
} from "@/utils/data";

const FormAdminVacancy = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({
      date_start: new Date().toISOString().split("T")[0],
    });
  }, [reset]);
  return (
    <CompanyLayout title="Vacancy">
      <div>
        <form action="">
          <Stack gap="5">
            <Field.Root invalid={!!errors.name_vacancy}>
              <Field.Label>Name Vacancy</Field.Label>
              <Input
                {...register("name_vacancy", {
                  required: "name_vacancy is required",
                })}
                size="md"
              />
              <Field.ErrorText>{errors.name_vacancy?.message}</Field.ErrorText>
            </Field.Root>
            <Flex gap="3">
              <Field.Root invalid={!!errors.location}>
                <Field.Label>Location</Field.Label>
                <Input
                  {...register("location", {
                    required: "location is required",
                  })}
                  size="md"
                />
                <Field.ErrorText>{errors.location?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.salary}>
                <Field.Label>Salary</Field.Label>
                <Input
                  {...register("salary", {
                    required: "salary is required",
                  })}
                  size="md"
                  type="number"
                />
                <Field.ErrorText>{errors.salary?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.qty}>
                <Field.Label>Qty</Field.Label>
                <Input
                  {...register("qty", {
                    required: "qty is required",
                  })}
                  size="md"
                  type="number"
                />
                <Field.ErrorText>{errors.qty?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
            <Flex gap="3">
              <Select.Root collection={siteData} size="md">
                <Select.HiddenSelect />
                <Select.Label>Work on</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Work on" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {siteData.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Select.Root collection={categoryJobData} size="md">
                <Select.HiddenSelect />
                <Select.Label>Category</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Category" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {categoryJobData.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Select.Root collection={typeData} size="md">
                <Select.HiddenSelect />
                <Select.Label>Type</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Type" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {typeData.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Flex>
            <Flex gap="3">
              <Select.Root collection={educationData} size="md">
                <Select.HiddenSelect />
                <Select.Label>Education minimum</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select education" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {educationData.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Select.Root collection={experienceTimeData} size="md">
                <Select.HiddenSelect />
                <Select.Label>Experience</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select experience" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {experienceTimeData.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Flex>
            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description</Field.Label>
              <Textarea
                {...register("description", {
                  required: "Description required",
                })}
                size="lg"
              />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
            <Flex gap="4">
              <Field.Root invalid={!!errors.date_start}>
                <Field.Label>Date open</Field.Label>
                <Input
                  {...register("date_start", {
                    required: "date_start is required",
                  })}
                  size="md"
                  type="date"
                  disabled
                />
                <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
              </Field.Root>{" "}
              <Field.Root invalid={!!errors.date_end}>
                <Field.Label>Date close</Field.Label>
                <Input
                  {...register("date_end", {
                    required: "date_end is required",
                  })}
                  size="md"
                  type="date"
                />
                <Field.ErrorText>{errors.date_end?.message}</Field.ErrorText>
              </Field.Root>
            </Flex>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </div>
    </CompanyLayout>
  );
};

export default FormAdminVacancy;
