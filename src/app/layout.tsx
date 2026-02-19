import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "UniGuide - Платформа выбора университета в Казахстане",
  description:
    "Найдите идеальный университет среди 50+ вузов Казахстана. Калькулятор ЕНТ, профориентационный тест и полная информация о специальностях.",
  keywords: [
    "университеты Казахстана",
    "ЕНТ калькулятор",
    "профориентация",
    "поступление в вуз",
    "гранты",
    "специальности",
  ],
  authors: [{ name: "UniGuide" }],
  openGraph: {
    title: "UniGuide - Платформа выбора университета в Казахстане",
    description:
      "Найдите идеальный университет среди 50+ вузов Казахстана",
    type: "website",
    locale: "ru_KZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
