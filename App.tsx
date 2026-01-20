import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UniversityCard from './components/UniversityCard';
import FilterSidebar from './components/FilterSidebar';
import Roadmap from './components/Roadmap';
import CareerTest from './components/CareerTest';
import UniversityDetail from './components/UniversityDetail';
import { UNIVERSITIES } from './constants';
import { University, StudentStats } from './types';
import { LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  
  // Student Stats for calculation
  const [studentStats, setStudentStats] = useState<StudentStats>({
    gpa: 3.5,
    ielts: 7.0,
    sat: 1350
  });

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    regions: [] as string[],
    maxTuition: 60000,
    minRanking: 10000,
    scholarshipsOnly: false,
    programs: [] as string[]
  });

  const toggleFavorite = (id: string) => {
    const newFavs = new Set(favorites);
    if (newFavs.has(id)) newFavs.delete(id);
    else newFavs.add(id);
    setFavorites(newFavs);
  };

  const handleHeroSearch = (term: string) => {
    setFilters(prev => ({ ...prev, search: term }));
    setActiveTab('explore');
    setSelectedUni(null);
  };

  // Admission Chance Calculation Logic
  const calculateMatchScore = (uni: University, stats: StudentStats): number => {
    let score = 0;

    // GPA (Weight: 35) - Строже оценка
    const gpaRatio = stats.gpa / uni.requirements.minGPA;
    if (gpaRatio >= 1.0) {
      score += Math.min(gpaRatio * 35, 42); // Бонус за превышение требований
    } else if (gpaRatio >= 0.85) {
      score += gpaRatio * 30; // Близко к требованиям
    } else {
      score += gpaRatio * 20; // Значительно ниже требований
    }

    // SAT (Weight: 35) - Строже оценка
    const satRatio = stats.sat / uni.requirements.minSAT;
    if (satRatio >= 1.0) {
      score += Math.min(satRatio * 35, 42); // Бонус за превышение требований
    } else if (satRatio >= 0.85) {
      score += satRatio * 30; // Близко к требованиям
    } else {
      score += satRatio * 20; // Значительно ниже требований
    }

    // IELTS (Weight: 15)
    const ieltsRatio = stats.ielts / uni.requirements.minIELTS;
    if (ieltsRatio >= 1.0) {
      score += 15;
    } else if (ieltsRatio >= 0.9) {
      score += 12;
    } else {
      score += ieltsRatio * 10;
    }

    // Acceptance Rate Modifier (Weight: 15) - Только бонус, если базовые требования близки
    // Высокий acceptance rate помогает, но не компенсирует плохие результаты
    const baseRequirementsMet = gpaRatio >= 0.85 && satRatio >= 0.85;
    if (baseRequirementsMet) {
      const acceptanceBonus = (uni.acceptanceRate / 100) * 15;
      score += acceptanceBonus;
    } else {
      // Минимальный бонус если требования не выполнены
      const acceptanceBonus = (uni.acceptanceRate / 100) * 5;
      score += acceptanceBonus;
    }

    return Math.min(Math.floor(score), 95);
  };

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.map(uni => ({
      ...uni,
      matchScore: calculateMatchScore(uni, studentStats)
    })).filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                            uni.programs.some(p => p.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesRegion = filters.regions.length === 0 || filters.regions.includes(uni.region);
      const matchesTuition = uni.tuition <= filters.maxTuition;
      const matchesScholarship = !filters.scholarshipsOnly || uni.scholarships !== 'Нет';
      const matchesRanking = uni.rankingQS <= filters.minRanking;
      const matchesPrograms = filters.programs.length === 0 ||
                              filters.programs.some(fp => uni.programs.includes(fp));

      return matchesSearch && matchesRegion && matchesTuition && matchesScholarship && matchesRanking && matchesPrograms;
    });
  }, [filters, studentStats]);

  const handleHeaderTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedUni(null);
  };

  if (selectedUni) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header currentTab={activeTab} setTab={handleHeaderTabChange} />
        <UniversityDetail 
          university={{...selectedUni, matchScore: calculateMatchScore(selectedUni, studentStats)}} 
          onBack={() => setSelectedUni(null)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Header currentTab={activeTab} setTab={handleHeaderTabChange} />

      <main>
        {activeTab === 'explore' && (
          <>
            {!filters.search && <Hero onSearch={handleHeroSearch} onExplore={() => {}} />}

            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4">
                  <FilterSidebar 
                    filters={filters} 
                    setFilters={setFilters} 
                    stats={studentStats}
                    setStats={setStudentStats}
                  />
                </aside>

                {/* Grid */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-academic-900 flex items-center gap-2">
                      <LayoutGrid size={24} />
                      Университеты
                      <span className="text-sm font-normal text-slate-500 ml-2">({filteredUniversities.length} найдено)</span>
                    </h2>
                    
                    {/* Active Filters Display */}
                    <div className="flex gap-2">
                      {filters.search && (
                        <span className="text-xs bg-academic-100 text-academic-700 px-2 py-1 rounded-full">
                          Поиск: {filters.search}
                        </span>
                      )}
                    </div>
                  </div>

                  {filteredUniversities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredUniversities.map(uni => (
                        <UniversityCard 
                          key={uni.id} 
                          university={uni} 
                          onToggleFavorite={toggleFavorite}
                          isFavorite={favorites.has(uni.id)}
                          onClick={setSelectedUni}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                      <p className="text-slate-500 text-lg">По вашим критериям университеты не найдены.</p>
                      <button
                        onClick={() => setFilters({ search: '', regions: [], maxTuition: 60000, minRanking: 10000, scholarshipsOnly: false, programs: [] })}
                        className="mt-4 text-academic-600 font-medium hover:underline"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'career' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CareerTest />
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Roadmap />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
