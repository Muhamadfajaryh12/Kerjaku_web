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
