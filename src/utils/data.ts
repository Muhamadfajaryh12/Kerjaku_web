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
    { label: "Full Time", value: "Full Time" },
    { label: "Part Time", value: "Part Time" },
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

export const statusData = createListCollection({
  items: [
    { label: "Open", value: "Open" },
    { label: "Close", value: "Close" },
  ],
});

export const statusApplication = createListCollection({
  items: [
    { label: "Waiting", value: "Waiting" },
    { label: "Assesment", value: "Assesment" },
    { label: "Interview", value: "Interview" },
    { label: "Offering", value: "Offering" },
    { label: "Completed", value: "Completed" },
    { label: "Reject", value: "Reject" },
  ],
});

export const indonesianCities = createListCollection({
  items: [
    // Sumatra
    { label: "Banda Aceh", value: "Banda Aceh" },
    { label: "Medan", value: "Medan" },
    { label: "Pekanbaru", value: "Pekanbaru" },
    { label: "Padang", value: "Padang" },
    { label: "Palembang", value: "Palembang" },
    { label: "Bandar Lampung", value: "Bandar Lampung" },

    // Java
    { label: "Jakarta", value: "Jakarta" },
    { label: "Bandung", value: "Bandung" },
    { label: "Bogor", value: "Bogor" },
    { label: "Depok", value: "Depok" },
    { label: "Tangerang", value: "Tangerang" },
    { label: "Bekasi", value: "Bekasi" },
    { label: "Semarang", value: "Semarang" },
    { label: "Yogyakarta", value: "Yogyakarta" },
    { label: "Surabaya", value: "Surabaya" },
    { label: "Malang", value: "Malang" },
    { label: "Karawang", value: "Karawang" },

    // Kalimantan
    { label: "Pontianak", value: "Pontianak" },
    { label: "Palangkaraya", value: "Palangkaraya" },
    { label: "Banjarmasin", value: "Banjarmasin" },
    { label: "Balikpapan", value: "Balikpapan" },
    { label: "Samarinda", value: "Samarinda" },

    // Sulawesi
    { label: "Makassar", value: "Makassar" },
    { label: "Manado", value: "Manado" },
    { label: "Palu", value: "Palu" },
    { label: "Gorontalo", value: "Gorontalo" },

    // Bali & Nusa Tenggara
    { label: "Denpasar", value: "Denpasar" },
    { label: "Mataram", value: "Mataram" },
    { label: "Kupang", value: "Kupang" },

    // Maluku & Papua
    { label: "Ambon", value: "Ambon" },
    { label: "Ternate", value: "Ternate" },
    { label: "Jayapura", value: "Jayapura" },
    { label: "Manokwari", value: "Manokwari" },
  ],
});

export const typeCompanyData = createListCollection({
  items: [
    { label: "Perseroan Terbuka", value: "Perseroan Terbuka" },
    { label: "Perseroan Tertutup", value: "Perseroan Tertutup" },
    {
      label: "Commanditaire Vennootschap",
      value: "Commanditaire Vennootschap",
    },
  ],
});
