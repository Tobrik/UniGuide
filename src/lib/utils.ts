import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ru-KZ").format(num);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateGrantChance(score: number, minScore: number): number {
  if (score >= minScore + 10) return 95;
  if (score >= minScore + 5) return 80;
  if (score >= minScore) return 60;
  if (score >= minScore - 5) return 30;
  return 10;
}

export function getRiasecDescription(type: string): string {
  const descriptions: Record<string, string> = {
    R: "Реалистичный - практическая работа с инструментами и механизмами",
    I: "Исследовательский - анализ, исследования и решение сложных задач",
    A: "Артистический - творчество, самовыражение и искусство",
    S: "Социальный - работа с людьми, помощь и обучение",
    E: "Предприимчивый - лидерство, управление и бизнес",
    C: "Конвенциональный - организация данных и систематическая работа",
  };
  return descriptions[type] || "";
}

export function getSubjectName(code: string): string {
  const subjects: Record<string, string> = {
    math: "Математика",
    physics: "Физика",
    chemistry: "Химия",
    biology: "Биология",
    history: "История Казахстана",
    geography: "География",
    english: "Английский язык",
    kazakh: "Казахский язык",
    russian: "Русский язык",
    literature: "Литература",
    informatics: "Информатика",
    world_history: "Всемирная история",
  };
  return subjects[code] || code;
}
