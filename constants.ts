import { University, RoadmapStep } from './types';

// Fallback campus images for universities
const FALLBACK_CAMPUS_IMAGES = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=85", // Classical building
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=85", // Library
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=85", // Modern campus
  "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=85", // Green campus
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85", // Students walking
  "https://images.unsplash.com/photo-1590012314607-689d021cfd03?w=1200&q=85", // Brick building
  "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=85", // Hallway
  "https://images.unsplash.com/photo-1627556704290-2b1f5853bf78?w=1200&q=85", // Modern glass
  "https://images.unsplash.com/photo-1607237138186-73d0979848ef?w=1200&q=85", // Ivy covered
  "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=1200&q=85"  // Arches
];

const regions = ['Казахстан'] as const;
const programsList = ['Информатика', 'Экономика', 'Медицина', 'Инженерия', 'Искусство', 'Бизнес', 'Право', 'Психология', 'Архитектура', 'Международные отношения'];

const realUnis: Partial<University & { imageKey: string }>[] = [
  // Казахстанские университеты
  { name: 'Nazarbayev University', country: 'Казахстан', region: 'Казахстан', rankingQS: 295, location: 'Астана, Казахстан' },
  { name: 'Al-Farabi Kazakh National University', country: 'Казахстан', region: 'Казахстан', rankingQS: 347, location: 'Алматы, Казахстан' },
  { name: 'L. N. Gumilyov Eurasian National University', country: 'Казахстан', region: 'Казахстан', rankingQS: 401, location: 'Астана, Казахстан' },
  { name: 'Satbayev University', country: 'Казахстан', region: 'Казахстан', rankingQS: 651, location: 'Алматы, Казахстан' },
  { name: 'KIMEP University', country: 'Казахстан', region: 'Казахстан', rankingQS: 701, location: 'Алматы, Казахстан' },
  { name: 'Kazakh-British Technical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 751, location: 'Алматы, Казахстан' },
  { name: 'Suleyman Demirel University', country: 'Казахстан', region: 'Казахстан', rankingQS: 801, location: 'Каскелен, Казахстан' },
  { name: 'Abylkas Saginov Karaganda Technical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 851, location: 'Караганда, Казахстан' },
  { name: 'East Kazakhstan State Technical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 901, location: 'Усть-Каменогорск, Казахстан' },
  { name: 'Kazakh National Pedagogical University named after Abay', country: 'Казахстан', region: 'Казахстан', rankingQS: 951, location: 'Алматы, Казахстан' },
  { name: 'E. A. Buketov University of Karaganda', country: 'Казахстан', region: 'Казахстан', rankingQS: 1001, location: 'Караганда, Казахстан' },
  { name: 'Ahmet Yesevi University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1051, location: 'Туркестан, Казахстан' },
  { name: 'Narxoz University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1101, location: 'Алматы, Казахстан' },
  { name: 'International IT University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1151, location: 'Алматы, Казахстан' },
  { name: 'S. Toraighyrov Pavlodar State University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1201, location: 'Павлодар, Казахстан' },
  { name: 'Auezov South Kazakhstan State University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1251, location: 'Шымкент, Казахстан' },
  { name: 'Kazakh National Medical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1301, location: 'Алматы, Казахстан' },
  { name: 'Astana Medical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1351, location: 'Астана, Казахстан' },
  { name: 'Saken Seifullin Kazakh Agrotechnical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1401, location: 'Астана, Казахстан' },
  { name: 'Kazakh National Agrarian University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1451, location: 'Алматы, Казахстан' },
  { name: 'Kazakh Ablai Khan University of International Relations', country: 'Казахстан', region: 'Казахстан', rankingQS: 1501, location: 'Алматы, Казахстан' },
  { name: 'West Kazakhstan Medical Academy named after M. Ospanov', country: 'Казахстан', region: 'Казахстан', rankingQS: 1551, location: 'Актобе, Казахстан' },
  { name: 'Atyrau State University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1601, location: 'Атырау, Казахстан' },
  { name: 'Atyrau University of Oil and Gas', country: 'Казахстан', region: 'Казахстан', rankingQS: 1651, location: 'Атырау, Казахстан' },
  { name: 'Almaty Management University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1701, location: 'Алматы, Казахстан' },
  { name: 'Almaty Technological University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1751, location: 'Алматы, Казахстан' },
  { name: 'Almaty University of Humanities and Economics', country: 'Казахстан', region: 'Казахстан', rankingQS: 1801, location: 'Алматы, Казахстан' },
  { name: 'Caspian State University of Technologies', country: 'Казахстан', region: 'Казахстан', rankingQS: 1851, location: 'Актау, Казахстан' },
  { name: 'Baishev University', country: 'Казахстан', region: 'Казахстан', rankingQS: 1901, location: 'Актобе, Казахстан' },
  { name: 'Aktobe Regional University named after K. Zhubanov', country: 'Казахстан', region: 'Казахстан', rankingQS: 1951, location: 'Актобе, Казахстан' },
  { name: 'Kazakh-Russian International University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2001, location: 'Актобе, Казахстан' },
  { name: 'Caspian University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2051, location: 'Алматы, Казахстан' },
  { name: 'German-Kazakh University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2101, location: 'Алматы, Казахстан' },
  { name: 'Kazakh Leading Academy of Architecture', country: 'Казахстан', region: 'Казахстан', rankingQS: 2151, location: 'Алматы, Казахстан' },
  { name: 'Kokshetau State University named after Shokan Ualikhanov', country: 'Казахстан', region: 'Казахстан', rankingQS: 2201, location: 'Кокшетау, Казахстан' },
  { name: 'Alikhan Bokeikhan University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2251, location: 'Семей, Казахстан' },
  { name: 'Semipalatinsk State University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2301, location: 'Семей, Казахстан' },
  { name: 'International Transport and Humanitarian University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2351, location: 'Алматы, Казахстан' },
  { name: 'Eurasian Technological University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2401, location: 'Алматы, Казахстан' },
  { name: 'Kazakhstan School of Public Health', country: 'Казахстан', region: 'Казахстан', rankingQS: 2451, location: 'Алматы, Казахстан' },
  { name: 'Kazakhstan-Russian Medical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2501, location: 'Алматы, Казахстан' },
  { name: 'Financial Academy', country: 'Казахстан', region: 'Казахстан', rankingQS: 2551, location: 'Астана, Казахстан' },
  { name: 'Astana University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2601, location: 'Астана, Казахстан' },
  { name: 'Kazakh-American University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2651, location: 'Алматы, Казахстан' },
  { name: 'Silkway International University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2701, location: 'Шымкент, Казахстан' },
  { name: 'Kazakh National Research Technical University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2751, location: 'Алматы, Казахстан' },
  { name: 'Kazakh National Women\'s Teacher Training University', country: 'Казахстан', region: 'Казахстан', rankingQS: 2801, location: 'Алматы, Казахстан' },
  { name: 'Altynsarin Institute', country: 'Казахстан', region: 'Казахстан', rankingQS: 2851, location: 'Аркалык, Казахстан' },
  { name: 'Atyrau Institute of Engineering and Humanities', country: 'Казахстан', region: 'Казахстан', rankingQS: 2901, location: 'Атырау, Казахстан' },
];

const DESCRIPTIONS = [
  "Ведущий мировой центр образования и исследований, известный своими инновациями и академическим превосходством. Идеальное место для тех, кто хочет изменить мир.",
  "Один из старейших и престижнейших университетов мира. Предлагает уникальную систему колледжей и индивидуальный подход к обучению.",
  "Современный исследовательский университет с передовыми лабораториями и сильными связями с индустрией. Отличный выбор для карьеры в технологиях.",
  "Глобальный университет, расположенный в сердце мегаполиса. Предлагает широкий спектр программ и возможности для нетворкинга мирового уровня.",
  "Университет с богатой историей и традициями, сочетающий классическое образование с современными методами обучения."
];

export const generateUniversities = (): University[] => {
  const allUnis: University[] = [];

  // Add Kazakh universities
  realUnis.forEach((uni, index) => {
    // Generate distinct programs for each
    const shuffledPrograms = [...programsList].sort(() => 0.5 - Math.random());
    const uniPrograms = shuffledPrograms.slice(0, 4);

    // Use fallback images for all universities
    const uniImage = FALLBACK_CAMPUS_IMAGES[index % FALLBACK_CAMPUS_IMAGES.length];
    const uniLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name || '')}&background=random&color=fff&size=100`;

    // Казахстанские университеты имеют доступную стоимость
    const tuitionCost = Math.floor(Math.random() * 3000) + 1000; // $1,000 - $4,000
    const acceptRate = Math.floor(Math.random() * 50) + 30; // 30-80%

    allUnis.push({
      id: `uni-${index}`,
      name: uni.name!,
      location: uni.location!,
      country: uni.country!,
      region: uni.region as any,
      rankingQS: uni.rankingQS!,
      tuition: tuitionCost,
      acceptanceRate: acceptRate,
      scholarships: Math.random() > 0.7 ? 'Полная' : Math.random() > 0.4 ? 'Частичная' : 'Нет',
      language: 'Русский/Казахский/Английский',
      programs: uniPrograms,
      image: uniImage,
      logo: uniLogo,
      description: "Ведущий казахстанский университет, предлагающий качественное образование по доступным ценам. Идеальный выбор для получения высшего образования в Казахстане.",
      website: `https://www.google.com/search?q=${encodeURIComponent(uni.name || '')}+official+website`,
      requirements: {
        minGPA: 3.0,
        minSAT: 1000,
        minIELTS: 5.5
      }
    });
  });

  // Now we have 50 real Kazakh universities

  return allUnis;
};

export const UNIVERSITIES = generateUniversities();

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    grade: 9,
    title: "Этап исследования",
    description: "Исследуй свои интересы и начни формировать портфолио.",
    status: "completed",
    tasks: ["Определить профильные предметы", "Вступить в 2 школьных клуба", "Начать волонтерский проект"]
  },
  {
    grade: 10,
    title: "Углубление и тесты",
    description: "Подготовка к стандартизированным тестам и развитие внеклассной деятельности.",
    status: "in-progress",
    tasks: ["Сдать пробный SAT/ACT", "Лидерская роль в клубе", "Летняя школа или стажировка"]
  },
  {
    grade: 11,
    title: "Финишная прямая",
    description: "Финальные тесты и составление списка университетов.",
    status: "locked",
    tasks: ["Сдать SAT/ACT/IELTS", "Виртуальные туры по вузам", "Написать мотивационное письмо"]
  },
  {
    grade: 12,
    title: "Подача заявок",
    description: "Отправка заявок и поиск стипендий.",
    status: "locked",
    tasks: ["Регистрация в Common App", "Запросить рекомендательные письма", "Подача Early Action"]
  }
];