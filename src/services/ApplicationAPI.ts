import { ApplicationInputProps } from "@/types/Application";
import axios from "axios";
import Cookies from "js-cookie";

const ApplicationAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const token = Cookies.get("token");

  const InsertApplication = async ({
    formData,
  }: {
    formData: ApplicationInputProps;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/application`, formData, {
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

  const GetApplicationDetail = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/application/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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

  const UpdateApplication = async ({ id, note, status }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/application/${id}`,
        {
          note,
          status,
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
      if (axios.isAxiosError(error)) {
        return {
          status: error.status || 500,
          message: error.response?.data.message || "Internal Server Error",
        };
      }
    }
  };

  return {
    InsertApplication,
    GetApplicationDetail,
    UpdateApplication,
  };
})();

export default ApplicationAPI;
