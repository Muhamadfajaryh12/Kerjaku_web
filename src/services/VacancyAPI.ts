import axios from "axios";

const VacancyAPI = (() => {
  const BASE_URL = process.env.NEXT_PUBLIC_API;

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
  return GetVacancy;
})();

export default VacancyAPI;
