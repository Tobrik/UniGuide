"use client";

import { useState } from "react";
import { Compass, Clock, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CareerQuiz } from "@/components/career/career-quiz";
import { QuizResults } from "@/components/career/quiz-results";
import { RiasecScores } from "@/types";

type QuizState = "intro" | "quiz" | "results";

const features = [
  {
    icon: Clock,
    title: "10-15 минут",
    description: "Тест состоит из 30 вопросов",
  },
  {
    icon: Target,
    title: "Точный результат",
    description: "Основан на методологии RIASEC",
  },
  {
    icon: BookOpen,
    title: "Рекомендации",
    description: "Получите список подходящих профессий",
  },
];

export default function CareerPage() {
  const [state, setState] = useState<QuizState>("intro");
  const [scores, setScores] = useState<RiasecScores | null>(null);

  const handleStartQuiz = () => {
    setState("quiz");
  };

  const handleQuizComplete = (results: RiasecScores) => {
    setScores(results);
    setState("results");
  };

  const handleRetake = () => {
    setScores(null);
    setState("intro");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-turkestan-500/20 mb-6">
              <Compass className="h-8 w-8 text-turkestan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Тест на профориентацию
            </h1>
            <p className="text-slate-300 text-lg">
              Узнайте свой профессиональный тип личности и получите рекомендации
              по выбору специальности и карьеры
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {state === "intro" && (
          <div className="max-w-3xl mx-auto">
            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-3 mb-12">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-turkestan-100 mb-4">
                      <feature.icon className="h-6 w-6 text-turkestan-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* About Section */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4">О тесте RIASEC</h2>
                <p className="text-muted-foreground mb-4">
                  Тест на профориентацию основан на теории профессионального выбора
                  Джона Холланда (Holland Codes или RIASEC). Эта методология выделяет
                  шесть основных типов личности:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <strong>R</strong> — Реалистичный (Realistic)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <strong>I</strong> — Исследовательский (Investigative)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <strong>A</strong> — Артистический (Artistic)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <strong>S</strong> — Социальный (Social)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <strong>E</strong> — Предприимчивый (Enterprising)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-500" />
                    <strong>C</strong> — Конвенциональный (Conventional)
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  По результатам теста вы узнаете свой доминирующий тип и получите
                  рекомендации по профессиям и специальностям, которые вам подходят.
                </p>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button
                variant="turkestan"
                size="xl"
                onClick={handleStartQuiz}
                className="px-12"
              >
                Начать тест
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Отвечайте честно — нет правильных или неправильных ответов
              </p>
            </div>
          </div>
        )}

        {state === "quiz" && (
          <CareerQuiz onComplete={handleQuizComplete} />
        )}

        {state === "results" && scores && (
          <QuizResults scores={scores} onRetake={handleRetake} />
        )}
      </div>
    </div>
  );
}
