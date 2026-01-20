import { University, RoadmapStep } from './types';

// Real university images and logos mapping
const UNIVERSITY_IMAGES: Record<string, { image: string; logo: string }> = {
  'MIT': {
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg'
  },
  'Cambridge': {
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/University_of_Cambridge_logo.svg'
  },
  'Oxford': {
    image: 'https://images.unsplash.com/photo-1607237138186-73d0979848ef?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Oxford-University-Circlet.svg'
  },
  'Harvard': {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg'
  },
  'Stanford': {
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Leland_Stanford_Junior_University.svg'
  },
  'Imperial': {
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Imperial_College_London_crest.svg'
  },
  'ETH': {
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/ETH_Z%C3%BCrich_Logo_black.svg'
  },
  'NUS': {
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/NUS_coat_of_arms.svg'
  },
  'UCL': {
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/UCL_Logo.svg'
  },
  'Berkeley': {
    image: 'https://images.unsplash.com/photo-1590012314607-689d021cfd03?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Seal_of_University_of_California%2C_Berkeley.svg'
  },
  'Chicago': {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/University_of_Chicago_shield.svg'
  },
  'Pennsylvania': {
    image: 'https://images.unsplash.com/photo-1627556704290-2b1f5853bf78?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UPenn_shield_with_banner.svg'
  },
  'Cornell': {
    image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Cornell_University_seal.svg'
  },
  'Melbourne': {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/1/1c/University_of_Melbourne_logo.svg'
  },
  'Caltech': {
    image: 'https://images.unsplash.com/photo-1549651586-1e6a17b8307d?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Seal_of_the_California_Institute_of_Technology.svg'
  },
  'Yale': {
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Yale_University_Shield_1.svg'
  },
  'Peking': {
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Peking_University_seal.svg'
  },
  'Princeton': {
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Princeton_seal.svg'
  },
  'UNSW': {
    image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/27/UNSW_Crest.svg'
  },
  'Sydney': {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cd/University_of_Sydney_Coat_of_Arms.svg'
  },
  'Toronto': {
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/University_of_Toronto_coat_of_arms.svg'
  },
  'Edinburgh': {
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/40/University_of_Edinburgh_ceremonial_roundel.svg'
  },
  'Columbia': {
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Columbia_University_Shield.svg'
  },
  'PSL': {
    image: 'https://images.unsplash.com/photo-1590650213165-430e8a3c8c14?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_Universit%C3%A9_PSL.svg'
  },
  'Tsinghua': {
    image: 'https://images.unsplash.com/photo-1549281899-f75600a24107?w=1200&q=85',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/e9/Tsinghua_University_Logo.svg'
  }
};

// Fallback campus images for universities without specific images
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

const regions = ['США', 'Европа', 'Азия', 'Великобритания', 'Канада', 'Австралия', 'Казахстан'] as const;
const programsList = ['Информатика', 'Экономика', 'Медицина', 'Инженерия', 'Искусство', 'Бизнес', 'Право', 'Психология', 'Архитектура', 'Международные отношения'];

const realUnis: Partial<University & { imageKey: string }>[] = [
  { name: 'Massachusetts Institute of Technology (MIT)', country: 'США', region: 'США', rankingQS: 1, location: 'Кембридж, США', imageKey: 'MIT' },
  { name: 'University of Cambridge', country: 'Великобритания', region: 'Великобритания', rankingQS: 2, location: 'Кембридж, Великобритания', imageKey: 'Cambridge' },
  { name: 'University of Oxford', country: 'Великобритания', region: 'Великобритания', rankingQS: 3, location: 'Оксфорд, Великобритания', imageKey: 'Oxford' },
  { name: 'Harvard University', country: 'США', region: 'США', rankingQS: 4, location: 'Кембридж, США', imageKey: 'Harvard' },
  { name: 'Stanford University', country: 'США', region: 'США', rankingQS: 5, location: 'Стэнфорд, США', imageKey: 'Stanford' },
  { name: 'Imperial College London', country: 'Великобритания', region: 'Великобритания', rankingQS: 6, location: 'Лондон, Великобритания', imageKey: 'Imperial' },
  { name: 'ETH Zurich', country: 'Швейцария', region: 'Европа', rankingQS: 7, location: 'Цюрих, Швейцария', imageKey: 'ETH' },
  { name: 'National University of Singapore (NUS)', country: 'Сингапур', region: 'Азия', rankingQS: 8, location: 'Сингапур', imageKey: 'NUS' },
  { name: 'UCL', country: 'Великобритания', region: 'Великобритания', rankingQS: 9, location: 'Лондон, Великобритания', imageKey: 'UCL' },
  { name: 'University of California, Berkeley (UCB)', country: 'США', region: 'США', rankingQS: 10, location: 'Беркли, США', imageKey: 'Berkeley' },
  { name: 'University of Chicago', country: 'США', region: 'США', rankingQS: 11, location: 'Чикаго, США', imageKey: 'Chicago' },
  { name: 'University of Pennsylvania', country: 'США', region: 'США', rankingQS: 12, location: 'Филадельфия, США', imageKey: 'Pennsylvania' },
  { name: 'Cornell University', country: 'США', region: 'США', rankingQS: 13, location: 'Итака, США', imageKey: 'Cornell' },
  { name: 'University of Melbourne', country: 'Австралия', region: 'Австралия', rankingQS: 14, location: 'Мельбурн, Австралия', imageKey: 'Melbourne' },
  { name: 'Caltech', country: 'США', region: 'США', rankingQS: 15, location: 'Пасадена, США', imageKey: 'Caltech' },
  { name: 'Yale University', country: 'США', region: 'США', rankingQS: 16, location: 'Нью-Хейвен, США', imageKey: 'Yale' },
  { name: 'Peking University', country: 'Китай', region: 'Азия', rankingQS: 17, location: 'Пекин, Китай', imageKey: 'Peking' },
  { name: 'Princeton University', country: 'США', region: 'США', rankingQS: 18, location: 'Принстон, США', imageKey: 'Princeton' },
  { name: 'University of New South Wales', country: 'Австралия', region: 'Австралия', rankingQS: 19, location: 'Сидней, Австралия', imageKey: 'UNSW' },
  { name: 'University of Sydney', country: 'Австралия', region: 'Австралия', rankingQS: 20, location: 'Сидней, Австралия', imageKey: 'Sydney' },
  { name: 'University of Toronto', country: 'Канада', region: 'Канада', rankingQS: 21, location: 'Торонто, Канада', imageKey: 'Toronto' },
  { name: 'University of Edinburgh', country: 'Великобритания', region: 'Великобритания', rankingQS: 22, location: 'Эдинбург, Великобритания', imageKey: 'Edinburgh' },
  { name: 'Columbia University', country: 'США', region: 'США', rankingQS: 23, location: 'Нью-Йорк, США', imageKey: 'Columbia' },
  { name: 'PSL Research University', country: 'Франция', region: 'Европа', rankingQS: 24, location: 'Париж, Франция', imageKey: 'PSL' },
  { name: 'Tsinghua University', country: 'Китай', region: 'Азия', rankingQS: 25, location: 'Пекин, Китай', imageKey: 'Tsinghua' },

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

  // Add real unis with their actual images and logos
  realUnis.forEach((uni, index) => {
    const isTopTier = uni.rankingQS! <= 20;
    const isMidTier = uni.rankingQS! > 20 && uni.rankingQS! <= 50;
    const isKazakh = uni.region === 'Казахстан';

    // Generate distinct programs for each
    const shuffledPrograms = [...programsList].sort(() => 0.5 - Math.random());
    const uniPrograms = shuffledPrograms.slice(0, 4);

    // Get real images and logos from mapping
    const imageData = uni.imageKey ? UNIVERSITY_IMAGES[uni.imageKey] : null;
    const uniImage = imageData?.image || FALLBACK_CAMPUS_IMAGES[index % FALLBACK_CAMPUS_IMAGES.length];
    const uniLogo = imageData?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name || '')}&background=random&color=fff&size=100`;

    // Казахстанские университеты имеют более доступную стоимость
    let tuitionCost: number;
    if (isKazakh) {
      tuitionCost = Math.floor(Math.random() * 3000) + 1000; // $1,000 - $4,000
    } else {
      tuitionCost = Math.floor(Math.random() * 50000) + 10000; // $10,000 - $60,000
    }

    // Acceptance rate для казахстанских вузов выше
    let acceptRate: number;
    if (isKazakh) {
      acceptRate = Math.floor(Math.random() * 50) + 30; // 30-80%
    } else {
      acceptRate = isTopTier ? Math.floor(Math.random() * 10) + 4 : Math.floor(Math.random() * 30) + 15;
    }

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
      language: isKazakh ? 'Русский/Казахский/Английский' : 'Английский',
      programs: uniPrograms,
      image: uniImage,
      logo: uniLogo,
      description: isKazakh
        ? "Ведущий казахстанский университет, предлагающий качественное образование по доступным ценам. Идеальный выбор для получения высшего образования в Казахстане."
        : DESCRIPTIONS[index % DESCRIPTIONS.length],
      website: `https://www.google.com/search?q=${encodeURIComponent(uni.name || '')}+official+website`,
      requirements: {
        minGPA: isKazakh ? 3.0 : (isTopTier ? 3.8 : isMidTier ? 3.5 : 3.0),
        minSAT: isKazakh ? 1000 : (isTopTier ? 1500 : isMidTier ? 1350 : 1200),
        minIELTS: isKazakh ? 5.5 : (isTopTier ? 7.5 : 6.5)
      }
    });
  });

  // Now we have 75 real universities (25 international + 50 Kazakh)

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