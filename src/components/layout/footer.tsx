"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Университеты", href: "/universities" },
    { name: "Профориентация", href: "/career" },
    { name: "Калькулятор ЕНТ", href: "/calculator" },
  ],
  cities: [
    { name: "Алматы", href: "/universities?city=almaty" },
    { name: "Астана", href: "/universities?city=astana" },
    { name: "Шымкент", href: "/universities?city=shymkent" },
    { name: "Караганда", href: "/universities?city=karaganda" },
  ],
  categories: [
    { name: "IT и Программирование", href: "/universities?category=IT" },
    { name: "Медицина", href: "/universities?category=MEDICINE" },
    { name: "Бизнес", href: "/universities?category=BUSINESS" },
    { name: "Инженерия", href: "/universities?category=ENGINEERING" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="uni.kz" className="h-10 w-10 rounded-lg object-contain" />
              <span className="font-bold text-xl text-white">uni.kz</span>
            </Link>
            <p className="text-sm text-slate-400">
              Платформа для выбора университета и профессии в Казахстане.
              Более 50 университетов, калькулятор ЕНТ и профориентационный тест.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-turkestan-400" />
                <span>info@uni.kz</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-turkestan-400" />
                <span>+7 (7172) 00-00-00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-turkestan-400" />
                <span>Астана, Казахстан</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Платформа</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-turkestan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Города</h3>
            <ul className="space-y-2">
              {footerLinks.cities.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-turkestan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Направления</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-turkestan-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">
              © 2024 uni.kz. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="hover:text-turkestan-400 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="#" className="hover:text-turkestan-400 transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
