import { APIResponse } from "./ApiResponse";
import { CompanyResponseProps } from "./Company";

export interface VacancyProps {
  id: number;
  name_vacancy: string;
  description: string;
  location: string;
  qty: number;
  salary: number;
  date_end: string;
  status: string;
  type: string;
  date_start: string;
  id_company: number;
  company: CompanyResponseProps;
}
