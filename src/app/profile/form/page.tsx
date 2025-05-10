"use client";
import InputFile from "@/components/form/InputFile";
import InputText from "@/components/form/InputText";
import Select from "@/components/form/Select";
import MainLayout from "@/layouts/MainLayout";
import ProfileAPI from "@/services/ProfileAPI";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const skillsData = [
  {
    id: "Programmer",
  },
  {
    id: "Networking",
  },
];

const ProfileFormPage = () => {
  const [skills, setSkills] = useState([]);
  const [cv, setCV] = useState<File | null>(null);
  const [nameCV, setNameCV] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
    formData.append("address", data.alamat);
    formData.append("education", data.pendidikan);
    formData.append("skills", skills);
    formData.append("cv", cv);
    formData.append("photo", photo);

    const response = await ProfileAPI.InsertProfile({ formData: formData });
    return response;
  };

  return (
    <MainLayout>
      <div>
        <form
          action=""
          onSubmit={handleSubmit(submitForm)}
          className=" mx-auto flex gap-4 justify-center items-start  max-w-2xl"
        >
          <div className="flex-none mt-4">
            <img
              src={photoURL ? photoURL : ""}
              alt=""
              className="w-56 h-56 border"
            />
            <InputFile name="Foto" handleChangeImage={handlePhoto} />
          </div>
          <div className="shrink w-full">
            <InputText
              register={register}
              type="text"
              required={true}
              errors={errors}
              name="nama"
            />
            <InputText
              register={register}
              type="text"
              required={true}
              errors={errors}
              name="Ringkasan diri"
            />
            <InputText
              register={register}
              type="text"
              required={true}
              errors={errors}
              name="Pendidikan"
            />
            <InputText
              register={register}
              type="text"
              required={true}
              errors={errors}
              name="Alamat"
            />

            <div>
              <label htmlFor="">CV</label>
              <div className="p-2 border rounded-sm w-full">
                {nameCV ? nameCV : "-"}
              </div>
              <InputFile name={"CV"} handleChangeImage={handleCV} />
            </div>

            <div>
              <Select
                data={skillsData}
                name={"Keahlian"}
                onChange={(e) => handleChangeSkills(e.target.value)}
              />

              <div className="flex items-center gap-4 my-2 flex-wrap">
                {skills &&
                  skills?.map((item, index) => (
                    <div
                      className="p-2 bg-gray-200 shadow-sm w-auto flex rounded-sm items-center gap-4"
                      key={index}
                    >
                      <p>{item}</p>
                      <button
                        onClick={() => handleRemoveSkills(item)}
                        type="button"
                      >
                        x
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfileFormPage;
