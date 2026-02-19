"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/lib/data";
import { RiasecScores } from "@/types";
import { cn } from "@/lib/utils";

const answerOptions = [
  { value: "1", label: "Полностью не согласен", score: 1 },
  { value: "2", label: "Не согласен", score: 2 },
  { value: "3", label: "Нейтрально", score: 3 },
  { value: "4", label: "Согласен", score: 4 },
  { value: "5", label: "Полностью согласен", score: 5 },
];

interface CareerQuizProps {
  onComplete: (scores: RiasecScores) => void;
}

export function CareerQuiz({ onComplete }: CareerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const handleAnswer = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (currentAnswer) {
      const newAnswers = {
        ...answers,
        [question.id]: parseInt(currentAnswer),
      };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        // Calculate scores
        const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

        quizQuestions.forEach((q) => {
          const answer = newAnswers[q.id] || 0;
          scores[q.type] += answer;
        });

        onComplete(scores);
      } else {
        setCurrentQuestion((prev) => prev + 1);
        // Check if next question was already answered
        const nextAnswer = answers[quizQuestions[currentQuestion + 1]?.id];
        setCurrentAnswer(nextAnswer?.toString() || "");
      }
    }
  };

  const handlePrev = () => {
    if (!isFirstQuestion) {
      setCurrentQuestion((prev) => prev - 1);
      const prevAnswer = answers[quizQuestions[currentQuestion - 1].id];
      setCurrentAnswer(prevAnswer?.toString() || "");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Вопрос {currentQuestion + 1} из {quizQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="p-3 rounded-full bg-turkestan-100">
              <Lightbulb className="h-6 w-6 text-turkestan-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Вопрос {currentQuestion + 1}
              </p>
              <h2 className="text-xl font-semibold">{question.text}</h2>
            </div>
          </div>

          <RadioGroup
            value={currentAnswer}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {answerOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all",
                  currentAnswer === option.value
                    ? "border-turkestan-500 bg-turkestan-50"
                    : "hover:border-turkestan-300 hover:bg-slate-50"
                )}
                onClick={() => handleAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstQuestion}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        <Button
          variant="turkestan"
          onClick={handleNext}
          disabled={!currentAnswer}
        >
          {isLastQuestion ? "Завершить" : "Далее"}
          {!isLastQuestion && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
