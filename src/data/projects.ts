import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    slug: 'drone-ai-plantation',
    title: 'Drone-AI & Pineapple Land Digitization',
    category: 'Real Project',
    tags: ['Computer Vision', 'Great Giant Foods', 'QGIS', 'Drone AI', 'Edge Inference'],
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
    tools: ['Python', 'QGIS', 'Edge AI', 'Drone Telemetry', 'YOLO', 'GeoPandas'],
    client: 'Great Giant Foods (GGF)',
    liveUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/',
    metrics: [
      { label: 'Plantation Area', value: '10K+ Ha' },
      { label: 'Inference Speed', value: 'Edge Real-time' },
      { label: 'Plot Mapping', value: '100% Unique IDs' },
      { label: 'Yield Precision', value: '96.4%' }
    ]
  },
  {
    slug: 'cassiterite-segmentation',
    title: 'Cassiterite Mineral Instance Segmentation',
    category: 'Real Project',
    tags: ['Deep Learning', 'PyTorch', 'PT Timah Tbk', 'Mask R-CNN', 'Microscopy'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Automating cassiterite mineral grain detection and quantitative visual inspection from microscope imagery using Mask R-CNN.',
    description: 'Engineered an end-to-end instance segmentation pipeline developed in collaboration with Exploration Laboratory geologists at PT Timah Tbk. Replaced laborious manual microscope counting with accurate automated polygon grain masks, deployed to Hugging Face Spaces for accessible quality assurance.',
    service: 'Computer Vision, Deep Learning',
    timeline: 'Jun 2025 — Feb 2026',
    tools: ['PyTorch', 'Mask R-CNN', 'Hugging Face Spaces', 'OpenCV', 'Python', 'Albumentations'],
    client: 'PT. Timah Tbk (Exploration Lab)',
    liveUrl: 'https://huggingface.co/spaces/kevinndny/cassiterite-segmentation',
    metrics: [
      { label: 'mAP@50 Score', value: '89.4%' },
      { label: 'Inspection Speed', value: '10x Faster' },
      { label: 'Grain Accuracy', value: '94.8%' },
      { label: 'Deployment', value: 'Hugging Face' }
    ]
  },
  {
    slug: 'monstera-classification',
    title: 'Monstera Plant Species Classification',
    category: 'Exploration',
    tags: ['YOLOv8', 'Streamlit', 'Object Detection', 'Botanical AI'],
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Interactive web-based botanical classifier leveraging YOLOv8 deep learning architecture deployed on Streamlit.',
    description: 'Conducted rigorous dataset curation, data augmentation, and model training to distinguish visually similar Monstera cultivars and botanical anomalies. Deployed as a high-responsiveness web application serving real-time predictions directly from user photo uploads.',
    service: 'AI Model Engineering, Web Deployment',
    timeline: 'Sep 2025 — Dec 2025',
    tools: ['YOLOv8', 'Python', 'Streamlit Cloud', 'OpenCV', 'PyTorch'],
    client: 'Academic AI Research',
    liveUrl: 'https://pcd-nyolo-pcdlu.streamlit.app',
    metrics: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Inference Latency', value: '< 120ms' },
      { label: 'Model Format', value: 'PyTorch / ONNX' },
      { label: 'Species Classified', value: '8 Varietals' }
    ]
  },
  {
    slug: 'fatigue-detection-app',
    title: 'Real-Time Driver & Student Fatigue Detection',
    category: 'Real Project',
    tags: ['Mobile AI', 'Flutter', 'Hugging Face API', 'Safety Tech', 'Computer Vision'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'A responsive cross-platform mobile application executing cloud and edge inference to prevent fatigue-related accidents.',
    description: 'Designed a seamless mobile user experience connecting camera image capture directly with fine-tuned facial landmark inference models hosted on Hugging Face API. Evaluates eye aspect ratios (EAR) and yawning frequency to trigger immediate safety alerts.',
    service: 'Mobile Engineering, AI Integration',
    timeline: 'Oct 2025 — Dec 2025',
    tools: ['Flutter', 'Dart', 'Hugging Face API', 'RESTful API', 'EAR Telemetry'],
    client: 'Safety Tech Initiative',
    liveUrl: 'https://github.com/kevinnaufaldany/fatique_aps',
    metrics: [
      { label: 'Detection Speed', value: 'Real-time' },
      { label: 'Platform', value: 'Android / iOS' },
      { label: 'Accuracy', value: '91.8%' },
      { label: 'Latency', value: '85ms' }
    ]
  },
  {
    slug: 'offline-asset-management',
    title: 'Offline-First Geotagged Asset Management App',
    category: 'Real Project',
    tags: ['Mapbox SDK', 'PT Timah Tbk', 'Mobile Dev', 'GIS Mapping', 'Offline Sync'],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Enterprise mobile survey system with embedded Mapbox GPS and local database caching for network-isolated remote field audits.',
    description: 'Engineered during an internship at PT Timah Tbk. Replaced manual field paper and WhatsApp survey workflows with an offline-first mobile application featuring built-in GPS coordinates and automatic background synchronization to enterprise Oracle/PostgreSQL databases upon reconnection.',
    service: 'Mobile Architecture, Enterprise Systems',
    timeline: 'Jun 2025 — Aug 2025',
    tools: ['Mapbox SDK', 'Mobile Framework', 'REST API', 'Offline Sync', 'SQLite'],
    client: 'PT. Timah Tbk (ICT Division)',
    liveUrl: 'https://www.linkedin.com/in/kevin-naufal-dany/',
    metrics: [
      { label: 'Reporting Time', value: '-70%' },
      { label: 'Sync Reliability', value: '99.9%' },
      { label: 'Mapbox GPS', value: 'Embedded' },
      { label: 'Field Audits', value: '1,200+' }
    ]
  },
  {
    slug: 'village-portal',
    title: 'Batanghari Ogan Digital Village Platform',
    category: 'Real Project',
    tags: ['Web Engineering', 'Public Service', 'HMIF ITERA', 'Full-stack', 'GIS'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop'
    ],
    summary: 'Leading the digital transformation of Batanghari Ogan village with administrative tools, public data transparency, and local commerce.',
    description: 'Led technical project management, requirements elicitation with village government officials, and full-stack software development in partnership with the Technopreneur Division of HMIF ITERA. Provides online population registry letters, agricultural commodity marketplaces, and geographical village maps.',
    service: 'Project Management, Web Development',
    timeline: 'Sep 2025 — Jan 2026',
    tools: ['Full-stack Web', 'Tailwind CSS', 'PostgreSQL', 'Project Leadership', 'React'],
    client: 'Batanghari Ogan Village & ITERA',
    liveUrl: 'https://batanghariogan.com',
    metrics: [
      { label: 'Public Services', value: '100% Online' },
      { label: 'Citizens Served', value: '2,500+' },
      { label: 'Service Speed', value: 'Same Day' },
      { label: 'Status', value: 'Live' }
    ]
  }
];
