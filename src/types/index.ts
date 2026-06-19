export interface Skill {
  name: string;
  level: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarId: string;
  bio: string;
  miniSkills: string[];
  skills: Skill[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  author: string;
  summary: string;
  content: string;
}

export interface PortfolioProject {
  title: string;
  cat: string;
  catLabel: string;
  img: string;
  linkText: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}
