import React, { useState } from 'react';
import { Brain, Heart, Code, Calculator, Palette, Users, Microscope, Globe, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    majors: string[];
  }[];
}

interface MajorRecommendation {
  name: string;
  description: string;
  icon: any;
  careers: string[];
  universities: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Какие предметы вам больше всего интересны?",
    options: [
      { text: "Математика и Физика", majors: ["engineering", "cs", "math"] },
      { text: "Биология и Химия", majors: ["medicine", "biotech", "pharmacy"] },
      { text: "История и Литература", majors: ["humanities", "law", "education"] },
      { text: "Экономика и Бизнес", majors: ["business", "economics", "finance"] },
      { text: "Искусство и Дизайн", majors: ["design", "arts", "architecture"] }
    ]
  },
  {
    id: 2,
    question: "Чем вы любите заниматься в свободное время?",
    options: [
      { text: "Программировать или решать логические задачи", majors: ["cs", "engineering", "math"] },
      { text: "Помогать людям и волонтерить", majors: ["medicine", "psychology", "social"] },
      { text: "Рисовать, создавать контент", majors: ["design", "arts", "media"] },
      { text: "Читать новости и анализировать события", majors: ["journalism", "political", "law"] },
      { text: "Экспериментировать и исследовать", majors: ["science", "biotech", "research"] }
    ]
  },
  {
    id: 3,
    question: "Какая рабочая среда вам больше подходит?",
    options: [
      { text: "Офис технологической компании", majors: ["cs", "business", "engineering"] },
      { text: "Больница или лаборатория", majors: ["medicine", "pharmacy", "biotech"] },
      { text: "Творческая студия", majors: ["design", "arts", "architecture"] },
      { text: "Международная организация", majors: ["ir", "business", "economics"] },
      { text: "Университет или исследовательский центр", majors: ["science", "math", "research"] }
    ]
  },
  {
    id: 4,
    question: "Что для вас важнее в будущей карьере?",
    options: [
      { text: "Высокая зарплата и карьерный рост", majors: ["cs", "business", "finance"] },
      { text: "Помощь людям и обществу", majors: ["medicine", "education", "social"] },
      { text: "Творческая свобода", majors: ["design", "arts", "media"] },
      { text: "Инновации и технологии", majors: ["engineering", "cs", "biotech"] },
      { text: "Стабильность и престиж", majors: ["law", "medicine", "business"] }
    ]
  },
  {
    id: 5,
    question: "Какой тип проектов вам интереснее?",
    options: [
      { text: "Разработка приложений и сайтов", majors: ["cs", "design", "engineering"] },
      { text: "Медицинские исследования", majors: ["medicine", "biotech", "pharmacy"] },
      { text: "Бизнес-стратегии и маркетинг", majors: ["business", "marketing", "economics"] },
      { text: "Социальные инициативы", majors: ["social", "psychology", "education"] },
      { text: "Художественные работы", majors: ["arts", "design", "architecture"] }
    ]
  }
];

const MAJORS: Record<string, MajorRecommendation> = {
  cs: {
    name: "Computer Science (Информатика)",
    description: "Программирование, искусственный интеллект, разработка ПО",
    icon: Code,
    careers: ["Software Engineer", "Data Scientist", "AI Researcher", "Full-Stack Developer"],
    universities: ["Nazarbayev University", "KIMEP University", "KBTU", "International IT University"]
  },
  engineering: {
    name: "Engineering (Инженерия)",
    description: "Создание технологий, механика, электроника",
    icon: Calculator,
    careers: ["Mechanical Engineer", "Electrical Engineer", "Robotics Engineer"],
    universities: ["Satbayev University", "Nazarbayev University", "KBTU", "Karaganda Technical University"]
  },
  medicine: {
    name: "Medicine (Медицина)",
    description: "Лечение людей, здравоохранение, биомедицина",
    icon: Heart,
    careers: ["Doctor", "Surgeon", "Medical Researcher", "Pharmacist"],
    universities: ["Astana Medical University", "Kazakh National Medical University", "West Kazakhstan Medical Academy", "Kazakhstan-Russian Medical University"]
  },
  business: {
    name: "Business & Management (Бизнес)",
    description: "Менеджмент, предпринимательство, консалтинг",
    icon: Users,
    careers: ["Business Consultant", "Entrepreneur", "Product Manager", "Marketing Director"],
    universities: ["KIMEP University", "Narxoz University", "Almaty Management University", "Nazarbayev University"]
  },
  design: {
    name: "Design & Arts (Дизайн и Искусство)",
    description: "UX/UI дизайн, графический дизайн, архитектура",
    icon: Palette,
    careers: ["UX Designer", "Graphic Designer", "Creative Director", "Architect"],
    universities: ["Kazakh Leading Academy of Architecture", "Almaty Technological University", "L. N. Gumilyov Eurasian National University", "Al-Farabi KazNU"]
  },
  science: {
    name: "Natural Sciences (Естественные науки)",
    description: "Физика, химия, биология, исследования",
    icon: Microscope,
    careers: ["Research Scientist", "Lab Technician", "Data Analyst", "Professor"],
    universities: ["Nazarbayev University", "Al-Farabi KazNU", "L. N. Gumilyov Eurasian National University", "E. A. Buketov University"]
  },
  economics: {
    name: "Economics & Finance (Экономика)",
    description: "Финансы, аналитика, экономическая политика",
    icon: Globe,
    careers: ["Financial Analyst", "Economist", "Investment Banker", "Consultant"],
    universities: ["Narxoz University", "KIMEP University", "Financial Academy", "Al-Farabi KazNU"]
  },
  law: {
    name: "Law (Право)",
    description: "Юриспруденция, международное право, правосудие",
    icon: Brain,
    careers: ["Lawyer", "Judge", "Legal Consultant", "Corporate Counsel"],
    universities: ["Al-Farabi KazNU", "Kazakh Ablai Khan University", "L. N. Gumilyov Eurasian National University", "Caspian University"]
  }
};

const CareerTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });

    if (currentQuestion < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResults = (): MajorRecommendation[] => {
    const majorScores: Record<string, number> = {};

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = QUESTIONS[parseInt(questionId)];
      const majors = question.options[optionIndex].majors;

      majors.forEach(major => {
        majorScores[major] = (majorScores[major] || 0) + 1;
      });
    });

    const sortedMajors = Object.entries(majorScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([major]) => MAJORS[major])
      .filter(Boolean);

    return sortedMajors;
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = calculateResults();

    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-academic-900 mb-2">Результаты теста</h2>
          <p className="text-slate-600">На основе ваших ответов, вам подходят следующие направления:</p>
        </div>

        <div className="space-y-6 mb-8">
          {results.map((major, index) => {
            const Icon = major.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl ${
                    index === 0 ? 'bg-accent-100 text-accent-600' :
                    index === 1 ? 'bg-academic-100 text-academic-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon size={32} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">{major.name}</h3>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded-full">
                          Лучшее совпадение
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 mb-4">{major.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-slate-700 mb-2">Карьерные возможности:</h4>
                      <div className="flex flex-wrap gap-2">
                        {major.careers.map((career, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-lg">
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-700 mb-2">Рекомендуемые университеты:</h4>
                      <div className="flex flex-wrap gap-2">
                        {major.universities.map((uni, i) => (
                          <span key={i} className="px-3 py-1 bg-academic-50 text-academic-700 text-sm rounded-lg font-medium">
                            {uni}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={resetTest}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-medium transition-colors"
          >
            <RotateCcw size={20} />
            Пройти тест заново
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-academic-900">Тест на профориентацию</h2>
          <span className="text-sm text-slate-500">
            Вопрос {currentQuestion + 1} из {QUESTIONS.length}
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-accent-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:border-accent-500 hover:bg-accent-50 group ${
                answers[currentQuestion] === index
                  ? 'border-accent-500 bg-accent-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-800 font-medium">{option.text}</span>
                <ArrowRight size={20} className="text-slate-400 group-hover:text-accent-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="text-slate-600 hover:text-slate-900 font-medium"
        >
          ← Назад
        </button>
      )}
    </div>
  );
};

export default CareerTest;
