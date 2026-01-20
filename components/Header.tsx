import React from 'react';
import { GraduationCap, Layout, Compass, Brain } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setTab }) => {
  const navItems = [
    { id: 'explore', label: 'Поиск Вузов', icon: Compass },
    { id: 'career', label: 'Профориентация', icon: Brain },
    { id: 'roadmap', label: 'План Поступления', icon: Layout },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 text-academic-900 cursor-pointer" onClick={() => setTab('explore')}>
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Graduation Cap */}
              <path d="M50 25L10 40L50 55L90 40L50 25Z" fill="#0284c7" />
              <path d="M50 55L20 43V60C20 65 30 70 50 70C70 70 80 65 80 60V43L50 55Z" fill="#0ea5e9" />
              <rect x="85" y="38" width="4" height="35" rx="2" fill="#f59e0b" />
              <circle cx="87" cy="35" r="5" fill="#f59e0b" />
              {/* U Letter */}
              <path d="M35 75C35 82 40 87 50 87C60 87 65 82 65 75V60H58V75C58 78 55 80 50 80C45 80 42 78 42 75V60H35V75Z" fill="#0c4a6e" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-2xl tracking-tight">UNI<span className="text-academic-500">.KZ</span></span>
            <span className="text-[9px] text-slate-500 uppercase tracking-wider">Поступление в Университет</span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-academic-50 text-academic-700 ring-1 ring-academic-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
