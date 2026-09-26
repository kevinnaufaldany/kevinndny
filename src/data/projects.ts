import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    slug: 'drone-ai-plantation',
    title: 'Drone-AI & Pineapple Land Digitization',
    category: 'Real Project',
    tags: ['Computer Vision', 'Great Giant Foods', 'QGIS', 'Drone AI'],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Digitalizing large-scale pineapple plantations using drone-captured imagery, QGIS shapefiles, and near real-time edge Computer Vision.',
    description: 'Developed in the Digital Innovation Department at Great Giant Foods under the MagangHub Kemnaker RI program. The solution pairs GIS shapefile (.shp) boundary management with edge AI inference directly on drone platforms, accelerating plot-level health diagnosis and automated yield monitoring.',
    service: 'Computer Vision, GIS Engineering',
    timeline: 'Ongoing (Aug 2026 — Present)',
    tools: ['Python', 'QGIS', 'Edge AI', 'Drone Telemetry', 'YOLO'],
    client: 'Great Giant Foods (GGF)',
    liveUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/',
    metrics: [
      { label: 'Plantation Area', value: '10K+ Ha' },
      { label: 'Inference Speed', value: 'Edge Real-time' },
      { label: 'Plot Mapping', value: '100% Unique IDs' }
    ]
  },
  {
    slug: 'cassiterite-segmentation',
    title: 'Cassiterite Mineral Instance Segmentation',
    category: 'Real Project',
    tags: ['Deep Learning', 'PyTorch', 'PT Timah Tbk', 'Mask R-CNN'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Automating cassiterite mineral grain detection and quantitative visual inspection from microscope imagery using Mask R-CNN.',
    description: 'Engineered an end-to-end instance segmentation pipeline developed in collaboration with Exploration Laboratory geologists at PT Timah Tbk. Replaced laborious manual microscope counting with accurate automated polygon grain masks, deployed to Hugging Face Spaces for accessible quality assurance.',
    service: 'Computer Vision, Deep Learning',
    timeline: 'Jun 2025 — Feb 2026',
    tools: ['PyTorch', 'Mask R-CNN', 'Hugging Face Spaces', 'OpenCV', 'Python'],
    client: 'PT. Timah Tbk (Exploration Lab)',
    liveUrl: 'https://huggingface.co/spaces/kevinndny/cassiterite-segmentation',
    metrics: [
      { label: 'mAP@50 Score', value: '89.4%' },
      { label: 'Inspection Speed', value: '10x Faster' },
      { label: 'Deployment', value: 'Hugging Face' }
    ]
  },
  {
    slug: 'monstera-classification',
    title: 'Monstera Plant Species Classification',
    category: 'Exploration',
    tags: ['YOLOv8', 'Streamlit', 'Object Detection'],
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Interactive web-based botanical classifier leveraging YOLOv8 deep learning architecture deployed on Streamlit.',
    description: 'Conducted rigorous dataset curation, data augmentation, and model training to distinguish visually similar Monstera cultivars and botanical anomalies. Deployed as a high-responsiveness web application serving real-time predictions directly from user photo uploads.',
    service: 'AI Model Engineering, Web Deployment',
    timeline: 'Sep 2025 — Dec 2025',
    tools: ['YOLOv8', 'Python', 'Streamlit Cloud', 'OpenCV'],
    client: 'Academic AI Research',
    liveUrl: 'https://pcd-nyolo-pcdlu.streamlit.app',
    metrics: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Inference Latency', value: '< 120ms' },
      { label: 'Model Format', value: 'PyTorch / ONNX' }
    ]
  },
  {
    slug: 'fatigue-detection-app',
    title: 'Real-Time Driver & Student Fatigue Detection',
    category: 'Real Project',
    tags: ['Mobile AI', 'Flutter', 'Hugging Face API'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'A responsive cross-platform mobile application executing cloud and edge inference to prevent fatigue-related accidents.',
    description: 'Designed a seamless mobile user experience connecting camera image capture directly with fine-tuned facial landmark inference models hosted on Hugging Face API. Evaluates eye aspect ratios (EAR) and yawning frequency to trigger immediate safety alerts.',
    service: 'Mobile Engineering, AI Integration',
    timeline: 'Oct 2025 — Dec 2025',
    tools: ['Flutter', 'Dart', 'Hugging Face API', 'RESTful API'],
    client: 'Safety Tech Initiative',
    liveUrl: 'https://github.com/kevinnaufaldany/fatique_aps',
    metrics: [
      { label: 'Detection Speed', value: 'Real-time' },
      { label: 'Platform', value: 'Android / iOS' },
      { label: 'Accuracy', value: '91.8%' }
    ]
  },
  {
    slug: 'offline-asset-management',
    title: 'Offline-First Geotagged Asset Management App',
    category: 'Real Project',
    tags: ['Mapbox SDK', 'PT Timah Tbk', 'Mobile Dev'],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Enterprise mobile survey system with embedded Mapbox GPS and local database caching for network-isolated remote field audits.',
    description: 'Engineered during an internship at PT Timah Tbk. Replaced manual field paper and WhatsApp survey workflows with an offline-first mobile application featuring built-in GPS coordinates and automatic background synchronization to enterprise Oracle/PostgreSQL databases upon reconnection.',
    service: 'Mobile Architecture, Enterprise Systems',
    timeline: 'Jun 2025 — Aug 2025',
    tools: ['Mapbox SDK', 'Mobile Framework', 'REST API', 'Offline Sync'],
    client: 'PT. Timah Tbk (ICT Division)',
    liveUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/',
    metrics: [
      { label: 'Reporting Time', value: '-70%' },
      { label: 'Sync Reliability', value: '99.9%' },
      { label: 'Mapbox GPS', value: 'Embedded' }
    ]
  },
  {
    slug: 'village-portal',
    title: 'Batanghari Ogan Digital Village Platform',
    category: 'Real Project',
    tags: ['Web Engineering', 'Public Service', 'HMIF ITERA'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Leading the digital transformation of Batanghari Ogan village with administrative tools, public data transparency, and local commerce.',
    description: 'Led technical project management, requirements elicitation with village government officials, and full-stack software development in partnership with the Technopreneur Division of HMIF ITERA.',
    service: 'Project Management, Web Development',
    timeline: 'Sep 2025 — Jan 2026',
    tools: ['Full-stack Web', 'Tailwind CSS', 'PostgreSQL', 'Project Leadership'],
    client: 'Batanghari Ogan Village & ITERA',
    liveUrl: 'https://batanghariogan.com',
    metrics: [
      { label: 'Public Services', value: '100% Online' },
      { label: 'Citizens Served', value: '2,500+' },
      { label: 'Status', value: 'Live' }
    ]
  }
];
