import { VacancyInputProps } from "@/types/Vacancy";
import axios from "axios";
import Cookies from "js-cookie";

const VacancyAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const token = Cookies.get("token");

  const GetVacancy = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vacancy`);
      return {
        status: response.status,
        data: response.data.data,
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

  const InsertVacancy = async ({
    name_vacancy,
    location,
    description,
    salary,
    qty,
    at_where,
    category,
    type,
    status,
    education,
    experience_time,
    date_start,
    date_end,
    id_company,
  }: VacancyInputProps) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/vacancy`,
        {
          name_vacancy,
          location,
          description,
          salary,
          qty,
          at_where,
          category,
          type,
          status,
          education,
          experience_time,
          date_start,
          date_end,
          id_company,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const UpdateVacancy = async ({
    name_vacancy,
    location,
    description,
    salary,
    qty,
    at_where,
    category,
    type,
    status,
    education,
    experience_time,
    date_start,
    date_end,
    id_company,
    id,
  }: VacancyInputProps) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/vacancy/${id}`,
        {
          name_vacancy,
          location,
          description,
          salary,
          qty,
          at_where,
          category,
          type,
          status,
          education,
          experience_time,
          date_start,
          date_end,
          id_company,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
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

  const DeleteVacancy = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/vacancy/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        status: response.status,
        message: response.data.message,
        id: response.data.data.id,
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
    GetVacancy,
    InsertVacancy,
    UpdateVacancy,
    DeleteVacancy,
  };
})();

export default VacancyAPI;
