import ButtonLink from "@/components/button/ButtonLink";
import VacancyCard from "@/components/card/VacancyCard";
import CompanyLayout from "@/layouts/CompanyLayout";
import React from "react";

const VacancyAdminPage = () => {
  return (
    <CompanyLayout title="Vacancy">
      <div>
        <ButtonLink
          name="Membuat Vacancy"
          type="button"
          link="/company/admin/vacancy/form"
        />
      </div>
    </CompanyLayout>
  );
};

export default VacancyAdminPage;
