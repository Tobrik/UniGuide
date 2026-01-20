import React from 'react';
import { ROADMAP_STEPS } from '../constants';
import { CheckCircle2, Lock, Circle, ArrowRight } from 'lucide-react';

const Roadmap: React.FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-academic-900 mb-2">План Поступления</h2>
        <p className="text-slate-500">Ваш пошаговый гид от 9 класса до зачисления.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {ROADMAP_STEPS.map((step, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Timeline Icon */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-white transform -translate-x-1/2 z-10 shadow-md flex items-center justify-center">
                {step.status === 'completed' ? (
                  <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center text-white">
                    <CheckCircle2 size={16} />
                  </div>
                ) : step.status === 'in-progress' ? (
                  <div className="w-full h-full rounded-full bg-accent-500 flex items-center justify-center text-white animate-pulse">
                    <Circle size={16} fill="currentColor" />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <Lock size={14} />
                  </div>
                )}
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                  step.status === 'in-progress' 
                    ? 'bg-white border-accent-500 shadow-xl shadow-accent-500/10 ring-2 ring-accent-100' 
                    : step.status === 'completed' 
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : 'bg-white border-slate-100 opacity-50 grayscale'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-academic-500">{step.grade} Класс</span>
                    {step.status === 'in-progress' && (
                      <span className="px-2 py-0.5 bg-accent-100 text-accent-700 text-[10px] font-bold rounded-full">ТЕКУЩИЙ</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight size={14} className="mt-1 text-accent-500 shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
