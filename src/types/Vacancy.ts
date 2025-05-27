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
  application_count?: number;
  category?: string;
}

export interface VacancyInputProps {
  id?: number;
  name_vacancy: string;
  description: string;
  location: string;
  qty: number;
  salary: number;
  date_end: string;
  status?: string;
  at_where: string;
  category: string;
  experience_time: string;
  education: string;
  type: string;
  date_start: string;
  id_company: number;
}
