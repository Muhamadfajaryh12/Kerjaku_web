"use client";
import { useLocalStorate } from "@/hooks/useLocalStorage";
import MainLayout from "@/layouts/MainLayout";
import ProfileAPI from "@/services/ProfileAPI";
import {
  Badge,
  Box,
  Breadcrumb,
  Button,
  CloseButton,
  createListCollection,
  Field,
  FileUpload,
  Flex,
  Image,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LuFileImage, LuFileUp } from "react-icons/lu";

const skillsData = createListCollection({
  items: [
    { label: "Programmer", value: "Programmer" },
    { label: "Network Engineer", value: "Network Engineer" },
    { label: "Web Developer", value: "Web Developer" },
  ],
});

const ProfileFormPage = () => {
  const [skills, setSkills] = useState([]);
  const [cv, setCV] = useState<File | null>(null);
  const [nameCV, setNameCV] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState("");
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const id = useLocalStorate("id");
  const handleChangeSkills = (data: string) => {
    if (data) {
      setSkills((prevItems) => [...prevItems, data]);
    }
  };

  const handleRemoveSkills = (data: string) => {
    setSkills(skills.filter((item) => item != data));
  };

  const handleCV = (data: File) => {
    if (data) {
      setNameCV(data.name);
      setCV(data);
    }
  };

  const handlePhoto = (data: File) => {
    if (data) {
      const file = URL.createObjectURL(data);
      setPhotoURL(file);
      setPhoto(data);
    }
  };

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("name", data.nama);
    formData.append("summary", data.ringkasan);
    formData.append("email", data.email);
    formData.append("address", data.alamat);
    formData.append("education", data.pendidikan);
    formData.append("birth", new Date(data.tanggal_lahir).toISOString());
    formData.append("phone", data.phone);
    formData.append("skills", skills);
    formData.append("cv", cv);
    formData.append("photo", photo);
    formData.append("id_user", id);

    const response = await ProfileAPI.InsertProfile({ formData: formData });
    if (response?.status == 201) {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <MainLayout>
      <div>
        <Breadcrumb.Root my="5">
          <Breadcrumb.List>
            <Breadcrumb.Item>Profile</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>Form</Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <form action="" onSubmit={handleSubmit(submitForm)}>
          <Flex gap="10" justifyContent="center">
            <Stack>
              {photoURL ? (
                <Image
                  rounded="sm"
                  src={photoURL}
                  width="200px"
                  height="200px"
                />
              ) : (
                <Box
                  borderWidth="1px"
                  rounded="sm"
                  width="200px"
                  height="200px"
                />
              )}

              <FileUpload.Root
                accept="image/*"
                onChange={(e) => handlePhoto(e.target.files?.[0])}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                  <Button variant="outline" size="md" mx="auto">
                    <LuFileImage /> Upload Image
                  </Button>
                </FileUpload.Trigger>
                {/* <FileUploadList /> */}
              </FileUpload.Root>
            </Stack>

            <Stack gap="4">
              <Field.Root invalid={!!errors.nama}>
                <Field.Label>Nama Lengkap</Field.Label>
                <Input
                  {...register("nama", {
                    required: "Nama Lengkap tidak boleh kosong",
                  })}
                  size="lg"
                />
                <Field.ErrorText>{errors.nama?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email tidak boleh kosong",
                  })}
                  size="lg"
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.tanggal_lahir}>
                <Field.Label>Tanggal Lahir</Field.Label>
                <Input
                  type="date"
                  {...register("tanggal_lahir", {
                    required: "Tanggal Lahir tidak boleh kosong",
                  })}
                  size="lg"
                />
                <Field.ErrorText>
                  {errors.tanggal_lahir?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.ringkasan}>
                <Field.Label>Ringkasan Diri</Field.Label>
                <Input
                  {...register("ringkasan", {
                    required: "Ringkasan Diri tidak boleh kosong",
                  })}
                  size="lg"
                />
                <Field.ErrorText>{errors.ringkasan?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.pendidikan}>
                <Field.Label>Pendidikan</Field.Label>
                <Input
                  {...register("pendidikan", {
                    required: "Pendidikan tidak boleh kosong",
                  })}
                  size="lg"
                />
                <Field.ErrorText>{errors.pendidikan?.message}</Field.ErrorText>
              </Field.Root>
              <Flex gap="4">
                <Field.Root invalid={!!errors.alamat}>
                  <Field.Label>Alamat</Field.Label>
                  <Input
                    {...register("alamat", {
                      required: "Alamat tidak boleh kosong",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.alamat?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.phone}>
                  <Field.Label>Nomor Telepon</Field.Label>
                  <Input
                    {...register("phone", {
                      required: "Nomor Telepon tidak boleh kosong",
                    })}
                    size="lg"
                  />
                  <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                </Field.Root>
              </Flex>
              <FileUpload.Root
                gap="1"
                size="lg"
                onChange={(e) => handleCV(e.target?.files[0])}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Label>Circulum Vitae</FileUpload.Label>
                <InputGroup
                  startElement={<LuFileUp />}
                  endElement={
                    <FileUpload.ClearTrigger asChild>
                      <CloseButton
                        me="-1"
                        size="xs"
                        variant="plain"
                        focusVisibleRing="inside"
                        focusRingWidth="2px"
                        pointerEvents="auto"
                      />
                    </FileUpload.ClearTrigger>
                  }
                >
                  <Input asChild>
                    <FileUpload.Trigger>
                      <FileUpload.FileText lineClamp={1} />
                    </FileUpload.Trigger>
                  </Input>
                </InputGroup>
              </FileUpload.Root>
              <div>
                <Select.Root
                  collection={skillsData}
                  size="lg"
                  onChange={(e) => handleChangeSkills(e.target.value)}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Keahlian</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Pilih Keahlian" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {skillsData.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                <Flex mt="2" gap="2">
                  {skills &&
                    skills?.map((item, index) => (
                      <Badge size="lg" key={index}>
                        {item}
                        <button
                          onClick={() => handleRemoveSkills(item)}
                          type="button"
                        >
                          x
                        </button>
                      </Badge>
                    ))}
                </Flex>
              </div>
              <Button type="submit">SUBMIT</Button>
            </Stack>
          </Flex>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfileFormPage;
