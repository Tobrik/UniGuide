import React from 'react';
import { GraduationCap, Layout, Compass, Brain, MessageCircle } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setTab }) => {
  const navItems = [
    { id: 'explore', label: 'Поиск Вузов', icon: Compass },
    { id: 'career', label: 'Профориентация', icon: Brain },
    { id: 'chat', label: 'Чат Студентов', icon: MessageCircle },
    { id: 'roadmap', label: 'План Поступления', icon: Layout },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 text-academic-900 cursor-pointer" onClick={() => setTab('explore')}>
          <img
            src="/images/logos/telegram-cloud-photo-size-2-5467906110330178593-y.jpg"
            alt="UNI.KZ Logo"
            className="h-12 w-auto rounded-lg"
          />
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
