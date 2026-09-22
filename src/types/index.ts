export interface Project {
  slug: string;
  title: string;
  category: 'Real Project' | 'Exploration';
  tags: string[];
  image: string;
  gallery?: string[];
  summary: string;
  description: string;
  service: string;
  timeline: string;
  tools: string[];
  client: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  mockupImages?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'dribbble' | 'instagram' | 'behance';
}
