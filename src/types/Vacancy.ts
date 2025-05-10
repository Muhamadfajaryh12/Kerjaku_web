export interface VacancyProps {
  data: {
    id: number;
    name_vacancy: string;
    description: string;
    location: string;
    qty: number;
    salary: number;
    date_end: string;
    status: string;
    date_start: string;
    id_company: number;
    company: {
      id: number;
      company_name: string;
      company_type: string;
      location: string;
      size: number;
      photo: string;
      description: string;
      id_user: number;
    };
  };
}
