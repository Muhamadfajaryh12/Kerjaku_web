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

  return {
    InsertApplication,
  };
})();

export default ApplicationAPI;
