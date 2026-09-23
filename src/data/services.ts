import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'computervision',
    title: 'COMPUTER VISION & AI',
    description: 'Engineering end-to-end deep learning pipelines for object detection, instance segmentation (Mask R-CNN, YOLOv8), and edge AI inference on drone & mobile hardware.',
    tags: ['PyTorch', 'YOLOv8', 'Mask R-CNN', 'OpenCV', 'Edge AI', 'Hugging Face'],
    mockupImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'cloud',
    title: 'CLOUD & ARCHITECTURE',
    description: 'Designing secure, scalable cloud infrastructure and deployment pipelines on AWS. Proficient in Linux system administration, storage optimization, and cloud reliability.',
    tags: ['AWS Certified', 'Cloud Infrastructure', 'Linux / Bash', 'CloudWatch', 'API Gateway'],
    mockupImages: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'gis',
    title: 'GIS & LAND DIGITIZATION',
    description: 'Processing remote sensing and drone-captured aerial imagery into precision QGIS shapefiles (.shp), automated plot segmentation, and spatial data analytics.',
    tags: ['QGIS', 'Shapefiles (.shp)', 'Drone Photogrammetry', 'Spatial Analysis', 'Agricultural AI'],
    mockupImages: [
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'frontend',
    title: 'CREATIVE DEV & UI/UX',
    description: 'Building blazing-fast, accessible web and mobile platforms using React, TypeScript, Vite, Tailwind CSS, Mapbox SDK, and buttery smooth Framer Motion choreographies.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Mapbox SDK'],
    mockupImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
    ]
  }
];
