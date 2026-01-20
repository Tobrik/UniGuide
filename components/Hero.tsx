import React, { useState } from 'react';
import { Search, Globe, ChevronRight } from 'lucide-react';

interface HeroProps {
  onSearch: (term: string) => void;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onExplore }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term);
    onExplore();
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=85"
          alt="Университетский кампус"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-academic-900/70 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/50 mb-6 backdrop-blur-sm">
          <Globe size={16} />
          <span className="text-sm font-medium uppercase tracking-wide">UNI.KZ - Поступление 2025</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Твое будущее начинается <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-white">
            в Лучших Университетах Мира
          </span>
        </h1>

        <p className="text-lg md:text-xl text-academic-100 mb-10 max-w-2xl">
          Открой для себя топ университеты мира, оцени свои шансы на поступление и создай идеальное портфолио с UNI.KZ
        </p>

        {/* Smart Search Bar */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-academic-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-2">
              <Search className="ml-4 text-academic-400" size={24} />
              <input 
                type="text" 
                placeholder="Поиск по специальности (например, 'Информатика' или 'Медицина')"
                className="w-full p-4 text-lg text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-accent-500/30"
              >
                Найти <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-8 flex gap-4 text-academic-100 text-sm">
          <span>Популярное:</span>
          <span className="underline decoration-accent-500/50 cursor-pointer hover:text-white">Информатика</span>
          <span className="underline decoration-accent-500/50 cursor-pointer hover:text-white">Экономика</span>
          <span className="underline decoration-accent-500/50 cursor-pointer hover:text-white">Инженерия</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
