import { useDate } from "@/hooks/useDate";
import { VacancyProps } from "@/types/Vacancy";
import React from "react";
import { BiBuilding, BiDollar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const VacancyCard = ({ data }: VacancyProps) => {
  return (
    <div
      id="card-vacancy"
      className="flex items-center gap-4 border border-gray-200 p-2 rounded-sm max-w-xl w-full"
    >
      <div>
        <img src={data.company.photo} alt="" className="w-24 h-24 border" />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h6 className="font-bold">{data.name_vacancy}</h6>
          <span
            className={`${
              data.status == "CLOSE" ? `bg-red-600` : `bg-green-600`
            } text-xs font-semibold text-white p-1 rounded-sm`}
          >
            {data.status}
          </span>
        </div>
        <p className="flex items-center gap-2 text-sm">
          <BiDollar />
          <span>{data.salary}</span>
        </p>
        <p className="flex items-center gap-2 text-sm justify-between">
          <div className="flex items-center gap-2">
            <BiBuilding />
            <span>{data.company.company_name}</span> - <span> Full Time </span>
          </div>
          <p>Dibuka {useDate(data.date_start)}</p>
        </p>
        <p className="flex items-center gap-2 text-sm justify-between">
          <div className="flex items-center gap-2">
            <FaLocationDot />
            <span>{data.company.location}</span>
          </div>
          <p>Ditutup {useDate(data.date_end)}</p>
        </p>
      </div>
    </div>
  );
};

export default VacancyCard;
