import React, { useState } from 'react';
import { ArrowLeft, MapPin, Trophy, DollarSign, GraduationCap, CheckCircle2, BookOpen, Globe, ExternalLink } from 'lucide-react';
import { University } from '../types';

interface UniversityDetailProps {
  university: University;
  onBack: () => void;
}

const UniversityDetail: React.FC<UniversityDetailProps> = ({ university, onBack }) => {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const getInitials = (name: string) => {
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getColorFromName = (name: string) => {
    const colors = [
      'bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-600',
      'bg-red-600', 'bg-orange-600', 'bg-amber-600', 'bg-green-600',
      'bg-teal-600', 'bg-cyan-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-[400px] w-full">
        {!imageError ? (
          <img
            src={university.image}
            alt={university.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-academic-500 to-academic-700 flex items-center justify-center">
            <GraduationCap size={120} className="text-white opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all font-medium"
        >
          <ArrowLeft size={18} /> Назад к поиску
        </button>
        
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            {!logoError ? (
              <img
                src={university.logo}
                alt="Logo"
                className="w-24 h-24 rounded-2xl border-4 border-white bg-white shadow-xl p-2 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className={`w-24 h-24 rounded-2xl border-4 border-white ${getColorFromName(university.name)} shadow-xl flex items-center justify-center text-white font-bold text-3xl`}>
                {getInitials(university.name)}
              </div>
            )}
            <div className="text-white mb-2">
              <h1 className="text-4xl font-bold mb-2">{university.name}</h1>
              <div className="flex items-center gap-4 text-lg opacity-90">
                <span className="flex items-center gap-1"><MapPin size={18} /> {university.location}</span>
                <span className="flex items-center gap-1"><Globe size={18} /> {university.region}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-academic-900 mb-4">Об университете</h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {university.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-academic-900 mb-4">Программы для иностранных студентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {university.programs.map((program, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="p-2 bg-white rounded-lg text-academic-600 shadow-sm">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-medium text-slate-800">{program}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-accent-50 rounded-2xl p-6 border border-accent-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Требования к поступлению</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-slate-500 text-sm mb-1">Средний балл (GPA)</div>
                <div className="text-2xl font-bold text-academic-600">{university.requirements.minGPA}+</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-slate-500 text-sm mb-1">SAT Score</div>
                <div className="text-2xl font-bold text-academic-600">{university.requirements.minSAT}+</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-slate-500 text-sm mb-1">IELTS</div>
                <div className="text-2xl font-bold text-academic-600">{university.requirements.minIELTS}+</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Stats Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Ваш шанс поступления</span>
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                 (university.matchScore || 0) >= 70 ? 'bg-green-100 text-green-700' : 
                 (university.matchScore || 0) >= 40 ? 'bg-yellow-100 text-yellow-700' : 
                 'bg-red-100 text-red-700'
              }`}>
                {university.matchScore}%
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <Trophy size={18} className="text-accent-500" />
                  <span>Мировой рейтинг</span>
                </div>
                <span className="font-bold text-slate-900">#{university.rankingQS}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <GraduationCap size={18} className="text-academic-500" />
                  <span>Процент приема</span>
                </div>
                <span className="font-bold text-slate-900">{university.acceptanceRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign size={18} className="text-green-600" />
                  <span>Стоимость / год</span>
                </div>
                <span className="font-bold text-slate-900">${university.tuition.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 size={18} className="text-blue-600" />
                  <span>Стипендии</span>
                </div>
                <span className="font-bold text-slate-900">{university.scholarships}</span>
              </div>
            </div>

            <a 
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-academic-600 hover:bg-academic-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-academic-600/30 text-center"
            >
              Узнать подробнее <ExternalLink size={20} />
            </a>
            <p className="text-center text-xs text-slate-400 mt-4">
              * Шансы рассчитываются на основе вашей статистики
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;