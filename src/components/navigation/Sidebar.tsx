"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboard, MdSettings, MdWork } from "react-icons/md";

const dataLink = [
  {
    link: "/company/admin",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    link: "/company/admin/vacancy",
    name: "Vacancy",
    icon: <MdWork />,
  },
  {
    link: "/company/admin/profile",
    name: "Profile",
    icon: <MdSettings />,
  },
];

const Sidebar = () => {
  const router = usePathname();

  return (
    <div className="w-48 h-screen shadow-md">
      <ul>
        {dataLink.map((item) => (
          <li
            key={item.link}
            className={`p-2 my-2 text-md hover:bg-black hover:text-white ${
              router == item.link ? "bg-black text-white" : ""
            }`}
          >
            <Link href={item.link}>
              <div className="flex items-center gap-4">
                {item.icon} <p>{item.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
