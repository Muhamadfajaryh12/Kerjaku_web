export interface CompanyInputProps {
  company_name: string;
  company_type: string;
  location: string;
  size: string;
  description: string;
  photo?: File;
  id_user: number;
}

export interface FormDataProps {
  formData: FormData;
}

export interface CompanyResponseProps {
  company_name: string;
  company_type: string;
  location: string;
  size: string;
  description: string;
  photo?: string;
  id_user: number;
  id: number;
}
