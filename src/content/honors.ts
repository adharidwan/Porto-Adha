export type HonorCategory = "3rd Winner" | "Honorable Mention" | "Finalist";

export interface HonorItem {
  title: string;
  issuer: string;
  period: string;
  description: string;
  category: HonorCategory;
}

export const HONORS: HonorItem[] = [
  {
    title: "HACKATTACK 2025 by CCIxHIMAIF Telkom University",
    issuer: "CCIxHIMAIF Telkom University",
    period: "Des 2025",
    description: "Achieved 3rd place in HACKATTACK 2025.",
    category: "3rd Winner",
  },
  {
    title: "The 2025 ICPC Asia Jakarta Regional Contest",
    issuer: "ICPC",
    period: "Nov 2025",
    description: "Earned Honorable Mention in the ICPC Asia Jakarta Regional Contest.",
    category: "Honorable Mention",
  },
  {
    title: "Capture The Flag HOLOGY 8.0 FILKOM UB 2025",
    issuer: "BEM Fakultas Ilmu Komputer Universitas Brawijaya",
    period: "Okt 2025",
    description: "Finalist in HOLOGY 8.0 CTF.",
    category: "Finalist",
  },
  {
    title: "Data Analysis Competition IFEST UNPAD 2025",
    issuer: "Himpunan Mahasiswa Teknik Informatika UNPAD",
    period: "Okt 2025",
    description: "Finalist in IFEST UNPAD 2025 Data Analysis Competition.",
    category: "Finalist",
  },
];
