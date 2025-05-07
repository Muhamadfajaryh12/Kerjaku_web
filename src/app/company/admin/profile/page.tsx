"use client";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import InputFile from "@/components/form/InputFile";
import InputText from "@/components/form/InputText";
import Select from "@/components/form/Select";
import CompanyLayout from "@/layouts/CompanyLayout";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const dataTypePerusahaan = [
  {
    id: "Perseroan Tertutup",
  },
  {
    id: "Perseroan Terbuka",
  },
];
const ProfileAdminLayout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <CompanyLayout>
      <div>
        <form action="">
          <div className="flex  w-full gap-4">
            <div>
              <Image width={125} height={125} />
              <InputFile name={"Upload File"} />
            </div>
            <div className="w-full">
              <InputText
                register={register}
                name={"Nama Perusahaan"}
                required={true}
                error={errors}
                type="text"
              />
              <InputText
                register={register}
                name={"Lokasi"}
                required={true}
                error={errors}
                type="text"
              />
            </div>
          </div>
          <InputText
            register={register}
            name={"Deskripsi Perusahaan"}
            required={true}
            error={errors}
            type="text"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputText
              register={register}
              name={"Jumlah Pegawai"}
              required={true}
              error={errors}
              type="number"
            />
            <Select
              register={register}
              name={"Nama Perusahaan"}
              required={true}
              errors={errors}
              data={dataTypePerusahaan}
            />
          </div>
          <ButtonPrimary name="Simpan" type="submit" />
        </form>
      </div>
    </CompanyLayout>
  );
};

export default ProfileAdminLayout;
