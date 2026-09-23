export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  isProfessional: boolean;
  badgeUrl?: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
}

export const certificationsData: Certification[] = [
  {
    id: 'aws-ccp',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2026',
    credentialId: 'AWS-CCP-CERT-2026',
    isProfessional: true,
    badgeUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    description: 'Validates overall understanding of AWS Cloud platform concepts, security, architecture principles, core cloud services, and compliance frameworks.',
    skills: ['AWS Cloud', 'Cloud Architecture', 'Security & Compliance', 'Billing & Pricing', 'EC2 & S3'],
    credentialUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/'
  },
  {
    id: 'associate-data-scientist',
    name: 'Associate Data Scientist + Python',
    issuer: 'Digital Talent Academy (Digitalent) — Nasional',
    issueDate: '2025',
    isProfessional: false,
    description: 'National certification on data science fundamentals, statistical modeling, machine learning algorithms, and predictive exploratory data analysis with Python.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'Data Preprocessing'],
    credentialUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/'
  },
  {
    id: 'aws-restart',
    name: 'AWS re/Start Graduate — Cloud Infrastructure',
    issuer: 'Amazon Web Services & Orbit Future Academy',
    issueDate: '2026',
    isProfessional: false,
    description: 'Rigorous 12-week cloud computing program covering Linux command line, networking fundamentals, databases, Python automation, and AWS infrastructure management.',
    skills: ['Linux', 'Cloud Infrastructure', 'SysAdmin', 'Networking'],
    credentialUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/'
  },
  {
    id: 'ms-elevate',
    name: 'Mastering AI & Data Science with Microsoft Fabric',
    issuer: 'Microsoft Elevate',
    issueDate: '2025',
    isProfessional: false,
    description: 'Hands-on enterprise AI training covering end-to-end data pipelines, modern data analytics, and deep learning model operationalization.',
    skills: ['Artificial Intelligence', 'Microsoft Fabric', 'Deep Learning'],
    credentialUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/'
  }
];
