export const useDate = (dateString: string) => {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(dateString);
  const tanggal = date.getDate();
  const bulanIndex = date.getMonth();
  const tahun = date.getFullYear();

  return `${tanggal} ${bulan[bulanIndex]} ${tahun}`;
};
