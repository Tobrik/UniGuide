"use client";

import Link from "next/link";
import Image from "next/image";
import { Network, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    number: "1",
    title: "Глобальная сеть выпускников и преподавателей",
    description: "Присоединяйтесь к сообществу выпускников и преподавателей со всего Казахстана",
    icon: Network,
  },
  {
    number: "2",
    title: "Безграничные возможности трудоустройства",
    description: "Получите доступ к лучшим вакансиям в ведущих компаниях страны",
    icon: Briefcase,
  },
  {
    number: "3",
    title: "Самые современные знания",
    description: "Учитесь по актуальным программам с использованием передовых технологий",
    icon: BookOpen,
  },
];

export function Features() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif">
                Университеты Казахстана
                <br />
                <span className="text-turkestan-600">помогут вам достичь целей</span>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Наша платформа объединяет лучшие университеты страны и помогает
                абитуриентам найти идеальное место для обучения и развития.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-turkestan-100 text-turkestan-600 font-serif text-xl">
                      {feature.number}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="turkestan" size="lg" asChild>
              <Link href="/universities">
                Посмотреть все университеты
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop"
                alt="University campus"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-10 w-10 rounded-full bg-turkestan-200 border-2 border-white flex items-center justify-center text-sm font-medium">
                    JD
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gold-200 border-2 border-white flex items-center justify-center text-sm font-medium">
                    АК
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-sm font-medium">
                    МВ
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">15,000+ студентов</p>
                  <p className="text-muted-foreground">нашли свой ВУЗ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
