"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, GraduationCap, MapPin, Trophy, Compass, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES } from "@/types";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    router.push(`/universities?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
          alt="University students"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">Образование.</span>
                <span className="block">Развитие.</span>
                <span className="block">Карьера.</span>
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                Создавайте связи, развивайте навыки и узнайте, как устроен мир
                и как вы можете в нем работать. Более 50 университетов Казахстана
                ждут вас.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск по специальности или названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                    icon={<Search className="h-5 w-5 text-white/60" />}
                  />
                </div>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-12 w-full sm:w-[180px] bg-white/10 border-white/20 text-white">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    {CITIES.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="turkestan" size="lg" className="flex-1 sm:flex-none">
                  <Search className="mr-2 h-5 w-5" />
                  Найти университет
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => router.push("/career")}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Пройти профтест
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-white/80">
                <GraduationCap className="h-5 w-5 text-turkestan-400" />
                <span>50+ университетов</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-5 w-5 text-turkestan-400" />
                <span>16 городов</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Trophy className="h-5 w-5 text-gold-400" />
                <span>200+ специальностей</span>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="hidden lg:flex flex-col gap-4">
            <Link href="/career" className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-turkestan-500/20">
                  <Compass className="h-7 w-7 text-turkestan-300" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg">Профориентационный тест</h3>
                  <p className="text-sm text-white/60">Узнайте, какая профессия вам подходит по методике RIASEC</p>
                </div>
              </div>
            </Link>
            <Link href="/calculator" className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold-500/20">
                  <Calculator className="h-7 w-7 text-gold-300" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg">Калькулятор ЕНТ</h3>
                  <p className="text-sm text-white/60">Рассчитайте баллы и узнайте шансы на грант</p>
                </div>
              </div>
            </Link>
            <Link href="/universities" className="group relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <GraduationCap className="h-7 w-7 text-white/80" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-lg">60+ университетов</h3>
                  <p className="text-sm text-white/60">Полная база вузов Казахстана с описанием и контактами</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
