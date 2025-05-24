"use client";
import ButtonPrimary from "@/components/button/ButtonPrimary";
import InputFile from "@/components/form/InputFile";
import InputText from "@/components/form/InputText";
import Select from "@/components/form/Select";
import CompanyLayout from "@/layouts/CompanyLayout";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

const ProfileAdminLayout = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <CompanyLayout>
      <div>
        <form action=""></form>
      </div>
    </CompanyLayout>
  );
};

export default ProfileAdminLayout;
