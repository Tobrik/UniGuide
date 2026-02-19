export type UniversityType = "PUBLIC" | "PRIVATE" | "NATIONAL" | "INTERNATIONAL" | "IVY_LEAGUE";

export type MajorCategory =
  | "ENGINEERING"
  | "MEDICINE"
  | "BUSINESS"
  | "IT"
  | "LAW"
  | "HUMANITIES"
  | "NATURAL_SCIENCES"
  | "ARTS"
  | "EDUCATION"
  | "AGRICULTURE";

export interface University {
  id: string;
  name: string;
  nameRu: string;
  slug: string;
  country: string;
  countryRu: string;
  city: string;
  cityRu: string;
  description?: string | null;
  descriptionRu?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  ranking?: number | null;
  foundedYear?: number | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  addressRu?: string | null;
  studentsCount?: number | null;
  hasHostel: boolean;
  acceptanceRate?: number | null;
  tuitionFee?: number | null;
  accreditation?: string | null;
  universityType: UniversityType;
}

export interface Major {
  id: string;
  code: string;
  name: string;
  nameRu: string;
  description?: string | null;
  descriptionRu?: string | null;
  subjectCombination: string[];
  category: MajorCategory;
  riasecTypes: string[];
}

export interface UniversityMajor {
  id: string;
  universityId: string;
  majorId: string;
  tuitionFee?: number | null;
  duration: number;
  language: string;
  university?: University;
  major?: Major;
}

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  type: keyof RiasecScores;
}

export const COUNTRIES = [
  { value: "usa", label: "США", flag: "🇺🇸" },
  { value: "uk", label: "Великобритания", flag: "🇬🇧" },
  { value: "canada", label: "Канада", flag: "🇨🇦" },
  { value: "germany", label: "Германия", flag: "🇩🇪" },
  { value: "france", label: "Франция", flag: "🇫🇷" },
  { value: "australia", label: "Австралия", flag: "🇦🇺" },
  { value: "japan", label: "Япония", flag: "🇯🇵" },
  { value: "china", label: "Китай", flag: "🇨🇳" },
  { value: "singapore", label: "Сингапур", flag: "🇸🇬" },
  { value: "switzerland", label: "Швейцария", flag: "🇨🇭" },
  { value: "netherlands", label: "Нидерланды", flag: "🇳🇱" },
  { value: "sweden", label: "Швеция", flag: "🇸🇪" },
  { value: "south_korea", label: "Южная Корея", flag: "🇰🇷" },
  { value: "russia", label: "Россия", flag: "🇷🇺" },
  { value: "kazakhstan", label: "Казахстан", flag: "🇰🇿" },
  { value: "italy", label: "Италия", flag: "🇮🇹" },
  { value: "spain", label: "Испания", flag: "🇪🇸" },
  { value: "hong_kong", label: "Гонконг", flag: "🇭🇰" },
];

export const MAJOR_CATEGORIES = [
  { value: "IT", label: "IT и Программирование" },
  { value: "ENGINEERING", label: "Инженерия" },
  { value: "MEDICINE", label: "Медицина" },
  { value: "BUSINESS", label: "Бизнес и Экономика" },
  { value: "LAW", label: "Юриспруденция" },
  { value: "HUMANITIES", label: "Гуманитарные науки" },
  { value: "NATURAL_SCIENCES", label: "Естественные науки" },
  { value: "ARTS", label: "Искусство и Дизайн" },
  { value: "EDUCATION", label: "Образование" },
  { value: "AGRICULTURE", label: "Сельское хозяйство" },
];
