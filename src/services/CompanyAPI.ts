import Cookies from "js-cookie";
import { FormDataProps } from "@/types/Company";
import axios from "axios";

const CompanyAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;
  const token = Cookies.get("token");

  const InsertProfileCompany = async ({ formData }: FormDataProps) => {
    try {
      const response = await axios.post(`${BASE_URL}/company`, formData, {
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

  const UpdateProfileCompany = async ({
    id,
    formData,
  }: {
    id: number;
    formData: FormDataProps;
  }) => {
    try {
      const response = await axios.put(`${BASE_URL}/company/${id}`, formData, {
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

  const DeleteProfileCompany = async ({ id }: { id: number }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/company/${id}`, {
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

  const GetCompany = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/company`);
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

  const GetProfileDetailCompany = async ({ id }: { id: number }) => {
    try {
      const response = await axios.get(`${BASE_URL}/company/${id}`);
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

  const GetSearchCompany = async ({ keyword }: { keyword: string }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/company/search/s?=${keyword}`
      );
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

  return {
    InsertProfileCompany,
    UpdateProfileCompany,
    DeleteProfileCompany,
    GetCompany,
    GetProfileDetailCompany,
    GetSearchCompany,
  };
})();

export default CompanyAPI;
