"use client";

import Link from "next/link";
import { Compass, Calculator, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ctaCards = [
  {
    title: "Профориентация",
    description: "Пройдите тест и узнайте, какие профессии вам подходят",
    icon: Compass,
    href: "/career",
    color: "bg-turkestan-50 hover:bg-turkestan-100",
    iconColor: "text-turkestan-600",
  },
  {
    title: "Калькулятор ЕНТ",
    description: "Рассчитайте свои шансы на грант по вашим баллам",
    icon: Calculator,
    href: "/calculator",
    color: "bg-gold-50 hover:bg-gold-100",
    iconColor: "text-gold-600",
  },
  {
    title: "Все университеты",
    description: "Найдите идеальный вуз среди 50+ университетов",
    icon: GraduationCap,
    href: "/universities",
    color: "bg-slate-50 hover:bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export function CTASection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif">
              Готовы начать свой путь
              <br />
              <span className="text-turkestan-400">в образовании?</span>
            </h2>
            <p className="text-slate-300 max-w-lg">
              Используйте наши инструменты, чтобы принять правильное решение
              о своем будущем. Тест на профориентацию, калькулятор баллов ЕНТ
              и полная база университетов — всё в одном месте.
            </p>
            <Button variant="turkestan" size="lg" asChild>
              <Link href="/career">
                Начать тест
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right - Cards */}
          <div className="grid gap-4 sm:grid-cols-1">
            {ctaCards.map((card, index) => (
              <Link key={index} href={card.href}>
                <Card
                  className={`${card.color} border-0 transition-all hover:shadow-lg cursor-pointer`}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                      <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{card.title}</h3>
                      <p className="text-sm text-slate-600">{card.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
