import React, { useState } from 'react';
import { MapPin, Trophy, DollarSign, GraduationCap, Heart } from 'lucide-react';
import { University } from '../types';

interface UniversityCardProps {
  university: University;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onClick: (university: University) => void;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, onToggleFavorite, isFavorite, onClick }) => {
  const matchScore = university.matchScore ?? 0;
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Get university initials for fallback
  const getInitials = (name: string) => {
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // Generate consistent color based on university name
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
    <div 
      onClick={() => onClick(university)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative cursor-pointer"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        {!imageError ? (
          <img
            src={university.image}
            alt={university.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-academic-500 to-academic-700 flex items-center justify-center">
            <GraduationCap size={64} className="text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-3 w-full pr-4">
          {!logoError ? (
            <img
              src={university.logo}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-white bg-white p-1 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className={`w-12 h-12 rounded-full border-2 border-white ${getColorFromName(university.name)} flex items-center justify-center text-white font-bold text-sm`}>
              {getInitials(university.name)}
            </div>
          )}
          <div className="text-white overflow-hidden">
            <h3 className="font-bold leading-tight truncate">{university.name}</h3>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <MapPin size={12} /> {university.location}
            </div>
          </div>
        </div>
        
        {/* Match Score Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 shadow-sm ${
          matchScore >= 80 ? 'bg-green-500 text-white border-green-600' : 
          matchScore >= 50 ? 'bg-yellow-400 text-yellow-900 border-yellow-500' : 
          'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          Шанс: {matchScore}%
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Trophy size={16} className="text-accent-500" />
            <span>#{university.rankingQS} Рейтинг</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <GraduationCap size={16} className="text-academic-500" />
            <span>{university.acceptanceRate}% Прием</span>
          </div>
        </div>

        {/* Requirements Mini-View */}
        <div className="mb-4 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
           <div className="flex justify-between mb-1">
             <span>Min GPA: <b>{university.requirements.minGPA}</b></span>
             <span>SAT: <b>{university.requirements.minSAT}</b></span>
           </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {university.programs.slice(0, 3).map((prog, idx) => (
            <span key={idx} className="px-2 py-1 bg-white text-slate-600 text-xs rounded-md border border-slate-200">
              {prog}
            </span>
          ))}
          {university.programs.length > 3 && (
            <span className="px-2 py-1 bg-slate-50 text-slate-400 text-xs rounded-md border border-slate-200">+{university.programs.length - 3}</span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Стоимость / год</span>
            <div className="flex items-center font-bold text-slate-700">
              <DollarSign size={14} />
              {university.tuition.toLocaleString()}
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(university.id);
            }}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
