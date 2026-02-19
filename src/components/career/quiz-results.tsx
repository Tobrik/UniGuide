"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiasecScores } from "@/types";
import { riasecDescriptions, majors } from "@/lib/data";

interface QuizResultsProps {
  scores: RiasecScores;
  onRetake: () => void;
}

export function QuizResults({ scores, onRetake }: QuizResultsProps) {
  // Calculate max possible score (5 questions * 5 max points = 25)
  const maxScore = 25;

  // Sort types by score
  const sortedTypes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([type, score]) => ({
      type: type as keyof typeof riasecDescriptions,
      score,
      percentage: (score / maxScore) * 100,
    }));

  const topTypes = sortedTypes.slice(0, 3);
  const dominantType = sortedTypes[0];

  // Get recommended majors based on top types
  const topTypesCodes = topTypes.map((t) => t.type);
  const recommendedMajors = majors.filter((major) =>
    major.riasecTypes.some((type) => topTypesCodes.includes(type as keyof RiasecScores))
  ).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Result Card */}
      <Card className="overflow-hidden">
        <div
          className="h-2"
          style={{ backgroundColor: riasecDescriptions[dominantType.type].color }}
        />
        <CardHeader className="text-center pb-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Ваш доминирующий тип
          </p>
          <CardTitle className="text-3xl mt-2">
            {riasecDescriptions[dominantType.type].name}
          </CardTitle>
          <p className="text-lg text-muted-foreground">
            ({riasecDescriptions[dominantType.type].nameEn})
          </p>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="max-w-xl mx-auto text-muted-foreground">
            {riasecDescriptions[dominantType.type].description}
          </p>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Ваш профиль RIASEC</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedTypes.map((item, index) => {
            const typeInfo = riasecDescriptions[item.type];
            return (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: typeInfo.color }}
                    />
                    <span className="font-medium">{typeInfo.name}</span>
                    {index < 3 && (
                      <Badge variant="secondary" className="text-xs">
                        TOP {index + 1}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.score} / {maxScore} ({Math.round(item.percentage)}%)
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: typeInfo.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Рекомендуемые профессии
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topTypes.slice(0, 2).flatMap((item) =>
              riasecDescriptions[item.type].careers.slice(0, 3).map((career, idx) => (
                <div
                  key={`${item.type}-${idx}`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-slate-50"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: riasecDescriptions[item.type].color }}
                  />
                  <span className="text-sm font-medium">{career}</span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Majors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Подходящие специальности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {recommendedMajors.map((major) => (
              <div
                key={major.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-medium">{major.nameRu}</p>
                  <p className="text-sm text-muted-foreground">Код: {major.code}</p>
                </div>
                <div className="flex gap-1">
                  {major.riasecTypes.slice(0, 2).map((type) => (
                    <div
                      key={type}
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          riasecDescriptions[type as keyof typeof riasecDescriptions]?.color ||
                          "#ccc",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="turkestan" asChild>
              <Link href="/universities">
                Найти университеты
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onRetake}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Пройти тест заново
        </Button>
        <Button variant="turkestan" asChild>
          <Link href="/calculator">
            Рассчитать баллы ЕНТ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
