"use client";
import InputText from "@/components/form/InputText";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import CompanyLayout from "@/layouts/CompanyLayout";
import React from "react";
import { useForm } from "react-hook-form";

const FormAdminVacancy = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <CompanyLayout>
      <div>
        <form action="">
          <InputText
            type="text"
            name="Posisi"
            register={register}
            required={true}
            errors={errors}
          />
          <InputText
            type="text"
            name="Deskripsi Pekerjaan"
            register={register}
            required={true}
            errors={errors}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputText
              type="text"
              name="Lokasi"
              register={register}
              required={true}
              errors={errors}
            />
            <InputText
              type="text"
              name="Jumlah Posisi"
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputText
              type="date"
              name="Tanggal Dibuka"
              register={register}
              required={true}
              errors={errors}
            />
            <InputText
              type="date"
              name="Tanggal Berakhir"
              register={register}
              required={true}
              errors={errors}
            />
          </div>
          <ButtonPrimary name="Submit" type="submit" />
        </form>
      </div>
    </CompanyLayout>
  );
};

export default FormAdminVacancy;
