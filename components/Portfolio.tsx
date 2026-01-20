import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Award, Book, Star } from 'lucide-react';
import { StudentStats } from '../types';

interface PortfolioProps {
  stats: StudentStats;
}

const Portfolio: React.FC<PortfolioProps> = ({ stats }) => {
  const chartData = [
    { subject: 'GPA', A: (stats.gpa / 4) * 100, fullMark: 100 },
    { subject: 'English', A: (stats.ielts! / 9) * 100, fullMark: 100 },
    { subject: 'SAT', A: (stats.sat! / 1600) * 100, fullMark: 100 },
    { subject: 'Extra-curr', A: 85, fullMark: 100 },
    { subject: 'Leadership', A: 70, fullMark: 100 },
    { subject: 'Volunteering', A: 90, fullMark: 100 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-academic-900 mb-2">My Digital Portfolio</h2>
        <p className="text-slate-500">Manage your admission readiness and track achievements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Stats */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <div className="text-slate-400 text-sm font-medium uppercase mb-2">GPA</div>
              <div className="text-4xl font-bold text-academic-600">{stats.gpa}</div>
              <div className="text-xs text-green-500 mt-1 font-semibold">Top 5%</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <div className="text-slate-400 text-sm font-medium uppercase mb-2">IELTS</div>
              <div className="text-4xl font-bold text-academic-600">{stats.ielts}</div>
              <div className="text-xs text-slate-400 mt-1">Band Score</div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <div className="text-slate-400 text-sm font-medium uppercase mb-2">SAT</div>
              <div className="text-4xl font-bold text-academic-600">{stats.sat}</div>
              <div className="text-xs text-slate-400 mt-1">/ 1600</div>
            </div>
            <div className="bg-gradient-to-br from-accent-500 to-accent-600 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white transform hover:-translate-y-1 transition-transform">
              <Star size={24} className="mb-2" />
              <div className="text-lg font-bold text-center leading-tight">Add New Achievement</div>
            </div>
          </div>

          {/* Achievements List */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award className="text-accent-500" /> Recent Achievements
            </h3>
            <div className="space-y-4">
              {[
                { title: 'National Math Olympiad Finalist', cat: 'Academic', date: 'Oct 2024' },
                { title: 'Volunteer Head at Local Shelter', cat: 'Volunteering', date: 'Aug 2024' },
                { title: 'Varsity Basketball Captain', cat: 'Sports', date: 'Sep 2024' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-academic-500">
                      <Book size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.cat} • {item.date}</div>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-academic-600 hover:text-academic-700">Edit</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Wheel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold text-slate-800 mb-2 w-full text-center">Admission Readiness</h3>
          <p className="text-sm text-slate-500 mb-6 text-center">Your profile balance compared to Ivy League admits.</p>
          
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar
                  name="Student"
                  dataKey="A"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-4 bg-academic-50 rounded-xl text-sm text-academic-800 leading-relaxed text-center">
            <strong>Tip:</strong> Your <b>Leadership</b> score is slightly below average for top-tier universities. Consider leading a school project next semester.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
