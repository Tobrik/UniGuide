"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Calendar,
  Home,
  Shield,
  Star,
  Trophy,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { universities, majors } from "@/lib/data";
import { formatNumber, formatPrice } from "@/lib/utils";

export default function UniversityPage() {
  const params = useParams();
  const slug = params.slug as string;

  const university = universities.find((u) => u.slug === slug);

  if (!university) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Университет не найден</h1>
        <p className="mt-2 text-muted-foreground">
          Запрашиваемый университет не существует
        </p>
        <Button asChild className="mt-4">
          <Link href="/universities">Вернуться к списку</Link>
        </Button>
      </div>
    );
  }

  const typeLabels: Record<string, string> = {
    PUBLIC: "Государственный",
    PRIVATE: "Частный",
    NATIONAL: "Национальный",
    INTERNATIONAL: "Международный",
  };

  // Mock majors for this university (in real app would come from DB)
  const universityMajors = majors.slice(0, 8).map((major) => ({
    ...major,
    grantMinScore: 90 + Math.floor(Math.random() * 30),
    paidMinScore: 60 + Math.floor(Math.random() * 20),
    tuitionFee: (800000 + Math.floor(Math.random() * 2000000)),
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96">
        {university.coverImageUrl ? (
          <Image
            src={university.coverImageUrl}
            alt={university.nameRu}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-turkestan-500 to-turkestan-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
            <Link href="/universities">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Назад
            </Link>
          </Button>
        </div>

        {/* University Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="container mx-auto">
            <div className="flex items-end gap-4">
              {/* Logo */}
              <div className="relative h-20 w-20 md:h-24 md:w-24 flex-shrink-0 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
                {university.logoUrl ? (
                  <Image
                    src={university.logoUrl}
                    alt={university.nameRu}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-turkestan-500">
                    {university.nameRu.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex-1 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="turkestan">{typeLabels[university.universityType]}</Badge>
                  {university.ranking && university.ranking <= 10 && (
                    <Badge variant="gold" className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      TOP {university.ranking}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {university.nameRu}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-white/80">
                  <MapPin className="h-4 w-4" />
                  <span>{university.cityRu}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {university.ranking && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="mx-auto h-6 w-6 text-gold-500" />
                    <p className="mt-2 text-2xl font-bold">#{university.ranking}</p>
                    <p className="text-xs text-muted-foreground">Рейтинг</p>
                  </CardContent>
                </Card>
              )}
              {university.studentsCount && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="mx-auto h-6 w-6 text-turkestan-500" />
                    <p className="mt-2 text-2xl font-bold">{formatNumber(university.studentsCount)}</p>
                    <p className="text-xs text-muted-foreground">Студентов</p>
                  </CardContent>
                </Card>
              )}
              {university.foundedYear && (
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="mx-auto h-6 w-6 text-turkestan-500" />
                    <p className="mt-2 text-2xl font-bold">{university.foundedYear}</p>
                    <p className="text-xs text-muted-foreground">Год основания</p>
                  </CardContent>
                </Card>
              )}
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="mx-auto h-6 w-6 text-turkestan-500" />
                  <p className="mt-2 text-2xl font-bold">{universityMajors.length}+</p>
                  <p className="text-xs text-muted-foreground">Специальностей</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">Об университете</TabsTrigger>
                <TabsTrigger value="majors">Специальности</TabsTrigger>
                <TabsTrigger value="scores">Проходные баллы</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Описание</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {university.descriptionRu || "Описание отсутствует."}
                    </p>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Возможности</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${university.hasHostel ? "bg-green-100" : "bg-slate-100"}`}>
                          <Home className={`h-5 w-5 ${university.hasHostel ? "text-green-600" : "text-slate-400"}`} />
                        </div>
                        <div>
                          <p className="font-medium">Общежитие</p>
                          <p className="text-sm text-muted-foreground">
                            {university.hasHostel ? "Есть" : "Нет"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${university.hasMilitaryDept ? "bg-green-100" : "bg-slate-100"}`}>
                          <Shield className={`h-5 w-5 ${university.hasMilitaryDept ? "text-green-600" : "text-slate-400"}`} />
                        </div>
                        <div>
                          <p className="font-medium">Военная кафедра</p>
                          <p className="text-sm text-muted-foreground">
                            {university.hasMilitaryDept ? "Есть" : "Нет"}
                          </p>
                        </div>
                      </div>
                      {university.accreditation && (
                        <div className="flex items-center gap-3 sm:col-span-2">
                          <div className="p-2 rounded-lg bg-turkestan-100">
                            <Star className="h-5 w-5 text-turkestan-600" />
                          </div>
                          <div>
                            <p className="font-medium">Аккредитация</p>
                            <p className="text-sm text-muted-foreground">
                              {university.accreditation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Majors Tab */}
              <TabsContent value="majors" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Специальности ({universityMajors.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {universityMajors.map((major) => (
                        <div
                          key={major.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <p className="font-medium">{major.nameRu}</p>
                            <p className="text-sm text-muted-foreground">
                              Код: {major.code}
                            </p>
                          </div>
                          <Badge variant="secondary">{major.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Scores Tab */}
              <TabsContent value="scores" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Проходные баллы 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Специальность</th>
                            <th className="text-center py-3 px-4">Грант</th>
                            <th className="text-center py-3 px-4">Платное</th>
                            <th className="text-right py-3 px-4">Стоимость</th>
                          </tr>
                        </thead>
                        <tbody>
                          {universityMajors.map((major) => (
                            <tr key={major.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <p className="font-medium">{major.nameRu}</p>
                                <p className="text-xs text-muted-foreground">{major.code}</p>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="turkestan">{major.grantMinScore}</Badge>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="secondary">{major.paidMinScore}</Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-sm">
                                {formatPrice(major.tuitionFee)}/год
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {university.addressRu && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Адрес</p>
                      <p className="text-sm text-muted-foreground">{university.addressRu}</p>
                    </div>
                  </div>
                )}
                {university.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Телефон</p>
                      <a
                        href={`tel:${university.phone}`}
                        className="text-sm text-turkestan-600 hover:underline"
                      >
                        {university.phone}
                      </a>
                    </div>
                  </div>
                )}
                {university.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a
                        href={`mailto:${university.email}`}
                        className="text-sm text-turkestan-600 hover:underline"
                      >
                        {university.email}
                      </a>
                    </div>
                  </div>
                )}
                {university.website && (
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <a href={university.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Посетить сайт
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-turkestan-50 border-turkestan-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg">Хотите поступить сюда?</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Рассчитайте свои шансы на поступление с помощью калькулятора ЕНТ
                </p>
                <Button variant="turkestan" className="mt-4 w-full" asChild>
                  <Link href="/calculator">Калькулятор ЕНТ</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
