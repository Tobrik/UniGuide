"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  Minus,
  GraduationCap,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { majors, universities } from "@/lib/data";
import { calculateGrantChance } from "@/lib/utils";

// ENT subjects
const subjects = [
  { id: "reading", name: "Грамотность чтения", maxScore: 20 },
  { id: "math", name: "Математическая грамотность", maxScore: 20 },
  { id: "history", name: "История Казахстана", maxScore: 20 },
  { id: "profile1", name: "Профильный предмет 1", maxScore: 40 },
  { id: "profile2", name: "Профильный предмет 2", maxScore: 40 },
];

// Mock grant scores by major category
const grantScoresByCategory: Record<string, { min: number; avg: number }> = {
  IT: { min: 110, avg: 120 },
  ENGINEERING: { min: 100, avg: 115 },
  MEDICINE: { min: 120, avg: 130 },
  BUSINESS: { min: 95, avg: 110 },
  LAW: { min: 105, avg: 118 },
  HUMANITIES: { min: 85, avg: 100 },
  NATURAL_SCIENCES: { min: 95, avg: 110 },
  ARTS: { min: 80, avg: 95 },
  EDUCATION: { min: 75, avg: 90 },
  AGRICULTURE: { min: 70, avg: 85 },
};

export default function CalculatorPage() {
  const [scores, setScores] = useState({
    reading: "",
    math: "",
    history: "",
    profile1: "",
    profile2: "",
  });
  const [selectedMajor, setSelectedMajor] = useState("");

  // Calculate total score
  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((sum, val) => {
      const num = parseInt(val) || 0;
      return sum + num;
    }, 0);
  }, [scores]);

  const maxPossibleScore = 140;
  const scorePercentage = (totalScore / maxPossibleScore) * 100;

  // Get selected major info
  const major = majors.find((m) => m.id === selectedMajor);
  const categoryScores = major
    ? grantScoresByCategory[major.category]
    : null;

  // Calculate grant chance
  const grantChance = categoryScores
    ? calculateGrantChance(totalScore, categoryScores.min)
    : 0;

  const handleScoreChange = (subject: string, value: string) => {
    const maxScore =
      subjects.find((s) => s.id === subject)?.maxScore || 40;
    let numValue = parseInt(value) || 0;

    if (numValue > maxScore) numValue = maxScore;
    if (numValue < 0) numValue = 0;

    setScores((prev) => ({
      ...prev,
      [subject]: numValue > 0 ? numValue.toString() : "",
    }));
  };

  // Get matching universities
  const matchingUniversities = useMemo(() => {
    if (!major || totalScore === 0) return [];

    return universities
      .filter((uni) => {
        // Simple matching logic - in real app would use actual data
        if (totalScore >= 110) return true;
        if (totalScore >= 90 && uni.universityType !== "NATIONAL") return true;
        return totalScore >= 70;
      })
      .slice(0, 5);
  }, [major, totalScore]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-turkestan-600 to-turkestan-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-6">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Калькулятор ЕНТ
            </h1>
            <p className="text-turkestan-100 text-lg">
              Введите свои баллы и узнайте шансы на получение гранта
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Input Card */}
            <Card>
              <CardHeader>
                <CardTitle>Введите баллы ЕНТ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Major Selection */}
                <div className="space-y-2">
                  <Label>Выберите специальность</Label>
                  <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите специальность" />
                    </SelectTrigger>
                    <SelectContent>
                      {majors.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.nameRu} ({m.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Score Inputs */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <Label htmlFor={subject.id}>
                        {subject.name}
                        <span className="text-muted-foreground text-xs ml-2">
                          (макс. {subject.maxScore})
                        </span>
                      </Label>
                      <Input
                        id={subject.id}
                        type="number"
                        min={0}
                        max={subject.maxScore}
                        placeholder="0"
                        value={scores[subject.id as keyof typeof scores]}
                        onChange={(e) =>
                          handleScoreChange(subject.id, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Total Score Display */}
                <div className="p-6 rounded-lg bg-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium">Общий балл:</span>
                    <span className="text-4xl font-bold text-turkestan-600">
                      {totalScore}
                      <span className="text-lg text-muted-foreground">
                        /{maxPossibleScore}
                      </span>
                    </span>
                  </div>
                  <Progress value={scorePercentage} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            {totalScore > 0 && selectedMajor && categoryScores && (
              <Card>
                <CardHeader>
                  <CardTitle>Результаты расчета</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Grant Chance */}
                  <div className="p-6 rounded-lg bg-slate-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {grantChance >= 60 ? (
                          <TrendingUp className="h-8 w-8 text-green-500" />
                        ) : grantChance >= 30 ? (
                          <Minus className="h-8 w-8 text-yellow-500" />
                        ) : (
                          <TrendingDown className="h-8 w-8 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Шанс на грант
                          </p>
                          <p className="text-3xl font-bold">
                            {grantChance}%
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          grantChance >= 60
                            ? "success"
                            : grantChance >= 30
                            ? "warning"
                            : "destructive"
                        }
                        className="text-lg px-4 py-1"
                      >
                        {grantChance >= 60
                          ? "Высокий"
                          : grantChance >= 30
                          ? "Средний"
                          : "Низкий"}
                      </Badge>
                    </div>
                    <div className="h-4 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          grantChance >= 60
                            ? "bg-green-500"
                            : grantChance >= 30
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${grantChance}%` }}
                      />
                    </div>
                  </div>

                  {/* Score Comparison */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-1">
                        Мин. балл для гранта (2024)
                      </p>
                      <p className="text-2xl font-bold">{categoryScores.min}</p>
                      <p className="text-sm text-muted-foreground">
                        по специальности: {major?.nameRu}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground mb-1">
                        Средний балл поступивших
                      </p>
                      <p className="text-2xl font-bold">{categoryScores.avg}</p>
                      <p className="text-sm text-muted-foreground">
                        за прошлый год
                      </p>
                    </div>
                  </div>

                  {/* Your Position */}
                  <div className="flex items-center gap-2 p-4 rounded-lg bg-turkestan-50">
                    <Info className="h-5 w-5 text-turkestan-600" />
                    <p className="text-sm">
                      {totalScore >= categoryScores.min
                        ? `Ваш балл выше минимального на ${
                            totalScore - categoryScores.min
                          } баллов. Хорошие шансы на грант!`
                        : `Вам не хватает ${
                            categoryScores.min - totalScore
                          } баллов до минимального порога для гранта.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Info & Recommendations */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Как это работает?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  ЕНТ (Единое национальное тестирование) — обязательный экзамен
                  для поступления в вузы Казахстана.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-turkestan-500 mt-1.5" />
                    Максимальный балл: 140
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-turkestan-500 mt-1.5" />
                    Минимальный порог: 50 баллов
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-turkestan-500 mt-1.5" />
                    Грант — от 70 баллов (зависит от специальности)
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Matching Universities */}
            {matchingUniversities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Подходящие университеты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {matchingUniversities.map((uni) => (
                    <Link
                      key={uni.id}
                      href={`/university/${uni.slug}`}
                      className="block p-3 rounded-lg border hover:bg-slate-50 transition-colors"
                    >
                      <p className="font-medium">{uni.nameRu}</p>
                      <p className="text-sm text-muted-foreground">
                        {uni.cityRu}
                      </p>
                    </Link>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/universities">
                      Все университеты
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Career Test CTA */}
            <Card className="bg-slate-900 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  Не уверены в выборе?
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Пройдите тест на профориентацию и узнайте, какие специальности
                  вам подходят
                </p>
                <Button variant="turkestan" className="w-full" asChild>
                  <Link href="/career">Пройти тест</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
