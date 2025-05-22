import { createListCollection } from "@chakra-ui/react";

export const skillsData = createListCollection({
  items: [
    { label: "Programmer", value: "Programmer" },
    { label: "Network Engineer", value: "Network Engineer" },
    { label: "Web Developer", value: "Web Developer" },
  ],
});

export const typeData = createListCollection({
  items: [
    { label: "Full-time", value: "Full-time" },
    { label: "Part-time", value: "Part-time" },
    { label: "Internship", value: "Internship" },
    { label: "Freelance", value: "Freelance" },
  ],
});

export const educationData = createListCollection({
  items: [
    { label: "Magister", value: "Magister" },
    { label: "Bachelor", value: "Bachelor" },
    { label: "SMA/SMK", value: "SMA/SMK" },
    { label: "SMP", value: "SMP" },
    { label: "SD", value: "SD" },
  ],
});

export const siteData = createListCollection({
  items: [
    { label: "Onsite", value: "Onsite" },
    { label: "Hybrid", value: "Hybrid" },
    { label: "Remote", value: "Remote" },
  ],
});

export const categoryJobData = createListCollection({
  items: [
    { label: "Technology", value: "Technology" },
    { label: "Finance", value: "Finance" },
    { label: "Legal Officer", value: "Legal Officer" },
    { label: "Administration", value: "Administration" },
  ],
});

export const experienceTimeData = createListCollection({
  items: [
    { label: "Freshgraduate", value: "Freshgraduate" },
    { label: "1-2 Year", value: "1-2 Year" },
    { label: "3-4 Year", value: "3-4 Year" },
    { label: "5 Year", value: "5 Year" },
    { label: "Expert", value: "Expert" },
  ],
});
