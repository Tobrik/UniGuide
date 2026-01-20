import React from 'react';
import { StudentStats } from '../types';
import { Filter, DollarSign, Globe, Trophy, UserCircle } from 'lucide-react';

interface FilterState {
  search: string;
  regions: string[];
  maxTuition: number;
  minRanking: number;
  scholarshipsOnly: boolean;
  programs: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  stats: StudentStats;
  setStats: React.Dispatch<React.SetStateAction<StudentStats>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, stats, setStats }) => {

  const toggleRegion = (region: string) => {
    setFilters(prev => {
      if (prev.regions.includes(region)) {
        return { ...prev, regions: prev.regions.filter(r => r !== region) };
      }
      return { ...prev, regions: [...prev.regions, region] };
    });
  };

  const toggleProgram = (program: string) => {
    setFilters(prev => {
      if (prev.programs.includes(program)) {
        return { ...prev, programs: prev.programs.filter(p => p !== program) };
      }
      return { ...prev, programs: [...prev.programs, program] };
    });
  };

  const allPrograms = ['Информатика', 'Экономика', 'Медицина', 'Инженерия', 'Искусство', 'Бизнес', 'Право', 'Психология', 'Архитектура', 'Международные отношения'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-8">
      
      {/* My Stats Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-academic-900 font-bold text-lg">
          <UserCircle size={20} />
          <h2>Моя статистика</h2>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
          <p className="text-xs text-slate-500 mb-2">Обновите, чтобы увидеть шансы на поступление.</p>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">GPA (4.0 Scale)</label>
            <input 
              type="number" 
              step="0.1" 
              max="4.0"
              value={stats.gpa}
              onChange={(e) => setStats({...stats, gpa: parseFloat(e.target.value)})}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-academic-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">SAT Score</label>
            <input 
              type="number" 
              step="10" 
              max="1600"
              value={stats.sat}
              onChange={(e) => setStats({...stats, sat: parseInt(e.target.value)})}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-academic-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">IELTS</label>
            <input 
              type="number" 
              step="0.5" 
              max="9"
              value={stats.ielts}
              onChange={(e) => setStats({...stats, ielts: parseFloat(e.target.value)})}
              className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-academic-500 outline-none"
            />
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Filters Section */}
      <div>
        <div className="flex items-center gap-2 mb-6 text-academic-900 font-bold text-lg">
          <Filter size={20} />
          <h2>Фильтры</h2>
        </div>

        <div className="space-y-6">
          {/* Regions */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              <Globe size={14} /> Регион
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {['Казахстан'].map(region => (
                <label key={region} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.regions.includes(region)}
                    onChange={() => toggleRegion(region)}
                    className="w-4 h-4 rounded border-slate-300 text-academic-600 focus:ring-academic-500"
                  />
                  <span className="text-slate-700 group-hover:text-academic-600 transition-colors">{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Programs/Majors */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              <Filter size={14} /> Направление
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {allPrograms.map(program => (
                <label key={program} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.programs.includes(program)}
                    onChange={() => toggleProgram(program)}
                    className="w-4 h-4 rounded border-slate-300 text-academic-600 focus:ring-academic-500"
                  />
                  <span className="text-slate-700 group-hover:text-academic-600 transition-colors text-sm">{program}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ranking */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              <Trophy size={14} /> Рейтинг (QS)
            </h3>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="10" 
              value={filters.minRanking}
              onChange={(e) => setFilters(prev => ({ ...prev, minRanking: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-academic-600"
            />
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>Топ 10</span>
              <span className="font-bold text-academic-700">Топ {filters.minRanking}</span>
              <span>Топ 100</span>
            </div>
          </div>

          {/* Tuition Budget */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
              <DollarSign size={14} /> Бюджет
            </h3>
            <input 
              type="range" 
              min="5000" 
              max="60000" 
              step="5000" 
              value={filters.maxTuition}
              onChange={(e) => setFilters(prev => ({ ...prev, maxTuition: parseInt(e.target.value) }))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-academic-600"
            />
            <div className="flex justify-between text-sm text-slate-600 mt-2">
              <span>$5k</span>
              <span className="font-bold text-academic-700">${filters.maxTuition.toLocaleString()}</span>
              <span>$60k+</span>
            </div>
          </div>

          {/* Scholarships Toggle */}
          <div className="p-4 bg-accent-50 rounded-xl border border-accent-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  checked={filters.scholarshipsOnly}
                  onChange={() => setFilters(prev => ({ ...prev, scholarshipsOnly: !prev.scholarshipsOnly }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
              </div>
              <span className="text-sm font-medium text-slate-800">Только со стипендией</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
