# uni.kz — Платформа для абитуриентов Казахстана

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

**Умный гид по университетам Казахстана**

[Демо](https://uni-kz.vercel.app) · [Исходный код](https://github.com/Tobrik/UniGuide)

</div>

---

## О проекте

**uni.kz** — веб-платформа, помогающая казахстанским абитуриентам выбрать университет и специальность. Проект объединяет базу из 60+ университетов, профориентационный тест RIASEC, калькулятор ЕНТ и чат-помощника.

### Возможности

- **Каталог университетов** — поиск и фильтрация по городу, типу и направлению. Подробные карточки с описанием, контактами и фото
- **Профориентационный тест** — тест по методике RIASEC (30 вопросов) с рекомендацией подходящих специальностей
- **Калькулятор ЕНТ** — расчёт баллов по предметам, определение категории и подходящих грантов
- **Чат-помощник** — ответы на вопросы о поступлении, университетах и подготовке к ЕНТ
- **Авторизация** — регистрация и вход по email через Firebase Auth

## Технологии

| Категория | Технологии |
|-----------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Стилизация | Tailwind CSS, Radix UI, Lucide Icons |
| Авторизация | Firebase Authentication |
| База данных | Firebase Firestore |
| Деплой | Vercel |

## Быстрый старт

### 1. Клонирование

```bash
git clone https://github.com/Tobrik/UniGuide.git
cd UniGuide
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GROQ_API_KEY=your_groq_api_key
```

### 4. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
├── app/
│   ├── api/chat/        # API для чат-помощника
│   ├── calculator/      # Калькулятор ЕНТ
│   ├── career/          # Профориентационный тест
│   ├── universities/    # Каталог университетов
│   └── university/      # Страница университета
├── components/
│   ├── auth/            # Авторизация
│   ├── chat/            # Чат-виджет
│   ├── home/            # Главная страница
│   ├── layout/          # Header, Footer
│   └── ui/              # UI компоненты (Radix)
├── lib/
│   ├── auth-context.tsx # Контекст авторизации
│   ├── data.ts          # Данные университетов
│   ├── firebase.ts      # Инициализация Firebase
│   └── firestore.ts     # Функции Firestore
└── types/               # TypeScript типы
```

## Деплой

Проект настроен для деплоя на Vercel:

```bash
npm run build
```

## Лицензия

MIT
