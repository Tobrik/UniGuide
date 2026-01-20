export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  region: 'США' | 'Европа' | 'Азия' | 'Великобритания' | 'Канада' | 'Австралия';
  rankingQS: number;
  tuition: number; // in USD
  acceptanceRate: number; // percentage
  scholarships: 'Полная' | 'Частичная' | 'Нет';
  language: string;
  programs: string[];
  image: string;
  logo: string;
  description: string;
  website: string;
  requirements: {
    minGPA: number;
    minSAT: number;
    minIELTS: number;
  };
  matchScore?: number;
}

export interface StudentStats {
  gpa: number; // 4.0 scale
  ielts: number;
  sat: number;
}

export interface RoadmapStep {
  grade: number; // 9, 10, 11, 12
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  tasks: string[];
}