import { ExperienceProps } from "@/types/Experience";
import axios from "axios";
import Cookies from "js-cookie";

const ExperienceAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const token = Cookies.get("token");

  const InsertExperience = async ({
    name_experience,
    name_company,
    position,
    date_start,
    date_end,
    description,
    id_user,
  }: ExperienceProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/experience`, {
        name_experience,
        name_company,
        position,
        date_start,
        date_end,
        description,
        id_user,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  const UpdateExperience = async ({
    name_experience,
    name_company,
    position,
    date_start,
    date_end,
    description,
    id_user,
    id,
  }: ExperienceProps) => {
    try {
      const response = await axios.put(`${BASE_URL}/experience/${id}`, {
        name_experience,
        name_company,
        position,
        date_start,
        date_end,
        description,
        id_user,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  const DeleteExperience = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/experience/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };
  return {
    InsertExperience,
    UpdateExperience,
    DeleteExperience,
  };
})();

export default ExperienceAPI;
