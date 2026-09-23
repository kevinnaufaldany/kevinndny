import postgres from 'postgres';

// Connection details provided by user
const connectionString = 
  process.env.DIRECT_URL || 
  "postgresql://postgres:kevinnaufaldanys.kom@db.cxxpbyqgvumvuqedoefc.supabase.co:5432/postgres";

console.log('Connecting to Supabase PostgreSQL...');

// Try direct connection or pooler with ssl
const sql = postgres(connectionString, {
  ssl: 'require',
  max: 1,
  connect_timeout: 10,
});

async function run() {
  try {
    console.log('Testing connection...');
    const result = await sql`SELECT current_database(), current_user, version()`;
    console.log('Connected successfully:', result[0]);

    console.log('Creating tables...');

    // 1. Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        slug text PRIMARY KEY,
        title text NOT NULL,
        category text NOT NULL,
        tags jsonb DEFAULT '[]'::jsonb,
        image text,
        gallery jsonb DEFAULT '[]'::jsonb,
        summary text,
        description text,
        service text,
        timeline text,
        tools jsonb DEFAULT '[]'::jsonb,
        client text,
        live_url text,
        metrics jsonb DEFAULT '[]'::jsonb,
        created_at timestamptz DEFAULT now()
      );
    `;

    // 2. Services Table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id text PRIMARY KEY,
        title text NOT NULL,
        description text NOT NULL,
        tags jsonb DEFAULT '[]'::jsonb,
        mockup_images jsonb DEFAULT '[]'::jsonb,
        created_at timestamptz DEFAULT now()
      );
    `;

    // 3. Experiences Table
    await sql`
      CREATE TABLE IF NOT EXISTS experiences (
        id serial PRIMARY KEY,
        company text NOT NULL,
        role text NOT NULL,
        period text NOT NULL,
        current boolean DEFAULT false,
        location text,
        description text NOT NULL,
        sort_order int DEFAULT 0,
        created_at timestamptz DEFAULT now()
      );
    `;

    // 4. Certifications Table
    await sql`
      CREATE TABLE IF NOT EXISTS certifications (
        id text PRIMARY KEY,
        name text NOT NULL,
        issuer text NOT NULL,
        issue_date text NOT NULL,
        credential_id text,
        is_professional boolean DEFAULT false,
        badge_url text,
        description text NOT NULL,
        skills jsonb DEFAULT '[]'::jsonb,
        credential_url text,
        sort_order int DEFAULT 0,
        created_at timestamptz DEFAULT now()
      );
    `;

    console.log('Tables created. Setting up RLS policies...');

    // Enable RLS and public read policies
    const tables = ['projects', 'services', 'experiences', 'certifications'];
    for (const table of tables) {
      await sql.unsafe(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;`);
      await sql.unsafe(`DROP POLICY IF EXISTS "Public read ${table}" ON ${table};`);
      await sql.unsafe(`CREATE POLICY "Public read ${table}" ON ${table} FOR SELECT USING (true);`);
    }

    console.log('Inserting seed data...');

    // Seed Projects
    const projects = [
      {
        slug: 'drone-ai-plantation',
        title: 'Drone-AI & Pineapple Land Digitization',
        category: 'Real Project',
        tags: ['Computer Vision', 'Great Giant Foods', 'QGIS', 'Drone AI'],
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1400&auto=format&fit=crop',
        gallery: [
          'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1400&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1400&auto=format&fit=crop'
        ],
        summary: 'Digitalizing large-scale pineapple plantations using drone-captured imagery, QGIS shapefiles, and near real-time edge Computer Vision.',
        description: 'Developed in the Digital Innovation Department at Great Giant Foods under the MagangHub Kemnaker RI program. The solution pairs GIS shapefile (.shp) boundary management with edge AI inference directly on drone platforms, accelerating plot-level health diagnosis and automated yield monitoring.',
        service: 'Computer Vision, GIS Engineering',
        timeline: 'Ongoing (Aug 2026 — Present)',
        tools: ['Python', 'QGIS', 'Edge AI', 'Drone Telemetry', 'YOLO'],
        client: 'Great Giant Foods (GGF)',
        live_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
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
        live_url: 'https://huggingface.co/spaces/kevinndny/cassiterite-segmentation',
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
        live_url: 'https://pcd-nyolo-pcdlu.streamlit.app',
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
        live_url: 'https://github.com/kevinnaufaldany/fatique_aps',
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
        live_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
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
        live_url: 'https://batanghariogan.com',
        metrics: [
          { label: 'Public Services', value: '100% Online' },
          { label: 'Citizens Served', value: '2,500+' },
          { label: 'Status', value: 'Live' }
        ]
      }
    ];

    for (const p of projects) {
      await sql`
        INSERT INTO projects (
          slug, title, category, tags, image, gallery, summary, description,
          service, timeline, tools, client, live_url, metrics
        ) VALUES (
          ${p.slug}, ${p.title}, ${p.category}, ${JSON.stringify(p.tags)}, ${p.image},
          ${JSON.stringify(p.gallery)}, ${p.summary}, ${p.description}, ${p.service},
          ${p.timeline}, ${JSON.stringify(p.tools)}, ${p.client}, ${p.live_url},
          ${JSON.stringify(p.metrics)}
        )
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          image = EXCLUDED.image,
          gallery = EXCLUDED.gallery,
          summary = EXCLUDED.summary,
          description = EXCLUDED.description,
          service = EXCLUDED.service,
          timeline = EXCLUDED.timeline,
          tools = EXCLUDED.tools,
          client = EXCLUDED.client,
          live_url = EXCLUDED.live_url,
          metrics = EXCLUDED.metrics;
      `;
    }
    console.log(`Inserted/updated ${projects.length} projects.`);

    // Seed Services
    const services = [
      {
        id: 'computervision',
        title: 'COMPUTER VISION & AI',
        description: 'Engineering end-to-end deep learning pipelines for object detection, instance segmentation (Mask R-CNN, YOLOv8), and edge AI inference on drone & mobile hardware.',
        tags: ['PyTorch', 'YOLOv8', 'Mask R-CNN', 'OpenCV', 'Edge AI', 'Hugging Face'],
        mockup_images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop']
      },
      {
        id: 'cloud',
        title: 'CLOUD & ARCHITECTURE',
        description: 'Designing secure, scalable cloud infrastructure and deployment pipelines on AWS. Proficient in Linux system administration, storage optimization, and cloud reliability.',
        tags: ['AWS Certified', 'Cloud Infrastructure', 'Linux / Bash', 'CloudWatch', 'API Gateway'],
        mockup_images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop']
      },
      {
        id: 'gis',
        title: 'GIS & LAND DIGITIZATION',
        description: 'Processing remote sensing and drone-captured aerial imagery into precision QGIS shapefiles (.shp), automated plot segmentation, and spatial data analytics.',
        tags: ['QGIS', 'Shapefiles (.shp)', 'Drone Photogrammetry', 'Spatial Analysis', 'Agricultural AI'],
        mockup_images: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop']
      },
      {
        id: 'frontend',
        title: 'CREATIVE DEV & UI/UX',
        description: 'Building blazing-fast, accessible web and mobile platforms using React, TypeScript, Vite, Tailwind CSS, Mapbox SDK, and buttery smooth Framer Motion choreographies.',
        tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Mapbox SDK'],
        mockup_images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop']
      }
    ];

    for (const s of services) {
      await sql`
        INSERT INTO services (id, title, description, tags, mockup_images)
        VALUES (${s.id}, ${s.title}, ${s.description}, ${JSON.stringify(s.tags)}, ${JSON.stringify(s.mockup_images)})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          tags = EXCLUDED.tags,
          mockup_images = EXCLUDED.mockup_images;
      `;
    }
    console.log(`Inserted/updated ${services.length} services.`);

    // Seed Experiences
    const experiences = [
      {
        company: 'Great Giant Foods',
        role: 'Computer Vision Engineer (Internship)',
        period: 'Aug 2026 — Present',
        current: true,
        location: 'Terbanggi Besar, Central Lampung',
        description: 'Contributing to the MagangHub Kemnaker RI program in the Digital Innovation Department. Developing drone-based Computer Vision and edge AI solutions for automated pineapple plantation land digitization and real-time field monitoring.',
        sort_order: 1
      },
      {
        company: 'AWS re/Start Batch 14',
        role: 'Cloud Infrastructure & Architecture (Independent Study)',
        period: 'Mar 2026 — Jun 2026',
        current: false,
        location: 'Remote',
        description: 'Completed comprehensive cloud computing training covering Linux, networking, Python, databases, and AWS core services in preparation for AWS Certified Cloud Practitioner.',
        sort_order: 2
      },
      {
        company: 'PT. Timah Tbk',
        role: 'Information & Communication Technology Intern',
        period: 'Jun 2025 — Aug 2025',
        current: false,
        location: 'Pangkalpinang, Indonesia',
        description: 'Automated field asset survey reporting with an offline-first mobile architecture, embedded Mapbox GPS synchronization, and initiated Cassiterite mineral AI research with Exploration Labs.',
        sort_order: 3
      },
      {
        company: 'HMIF ITERA (Informatics Students Association)',
        role: 'Head of Technopreneur Division',
        period: 'Jan 2025 — Feb 2026',
        current: false,
        location: 'South Lampung, Indonesia',
        description: 'Led tech division operations, organizing national hackathons, tech seminars, and collaborative technology-based public services including village web systems.',
        sort_order: 4
      },
      {
        company: 'Sumatra Institute of Technology (ITERA)',
        role: 'Practicum Assistant (Data Structures, OOP, Intro to CS)',
        period: 'Sep 2023 — Jun 2025',
        current: false,
        location: 'South Lampung, Indonesia',
        description: 'Instructed undergraduate laboratory practicums in algorithms, object-oriented programming, and computer software fundamentals.',
        sort_order: 5
      }
    ];

    await sql`TRUNCATE TABLE experiences RESTART IDENTITY CASCADE;`;
    for (const e of experiences) {
      await sql`
        INSERT INTO experiences (company, role, period, current, location, description, sort_order)
        VALUES (${e.company}, ${e.role}, ${e.period}, ${e.current}, ${e.location}, ${e.description}, ${e.sort_order});
      `;
    }
    console.log(`Inserted/updated ${experiences.length} experiences.`);

    // Seed Certifications
    const certs = [
      {
        id: 'aws-ccp',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services (AWS)',
        issue_date: '2026',
        credential_id: 'AWS-CCP-CERT-2026',
        is_professional: true,
        badge_url: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
        description: 'Validates overall understanding of AWS Cloud platform concepts, security, architecture principles, core cloud services, and compliance frameworks.',
        skills: ['AWS Cloud', 'Cloud Architecture', 'Security & Compliance', 'Billing & Pricing', 'EC2 & S3'],
        credential_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
        sort_order: 1
      },
      {
        id: 'associate-data-scientist',
        name: 'Associate Data Scientist + Python',
        issuer: 'Digital Talent Academy (Digitalent) — Nasional',
        issue_date: '2025',
        credential_id: null,
        is_professional: false,
        badge_url: null,
        description: 'National certification on data science fundamentals, statistical modeling, machine learning algorithms, and predictive exploratory data analysis with Python.',
        skills: ['Python', 'Data Science', 'Machine Learning', 'Data Preprocessing'],
        credential_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
        sort_order: 2
      },
      {
        id: 'aws-restart',
        name: 'AWS re/Start Graduate — Cloud Infrastructure',
        issuer: 'Amazon Web Services & Orbit Future Academy',
        issue_date: '2026',
        credential_id: null,
        is_professional: false,
        badge_url: null,
        description: 'Rigorous 12-week cloud computing program covering Linux command line, networking fundamentals, databases, Python automation, and AWS infrastructure management.',
        skills: ['Linux', 'Cloud Infrastructure', 'SysAdmin', 'Networking'],
        credential_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
        sort_order: 3
      },
      {
        id: 'ms-elevate',
        name: 'Mastering AI & Data Science with Microsoft Fabric',
        issuer: 'Microsoft Elevate',
        issue_date: '2025',
        credential_id: null,
        is_professional: false,
        badge_url: null,
        description: 'Hands-on enterprise AI training covering end-to-end data pipelines, modern data analytics, and deep learning model operationalization.',
        skills: ['Artificial Intelligence', 'Microsoft Fabric', 'Deep Learning'],
        credential_url: 'https://www.linkedin.com/in/kevin-naufal-dany/',
        sort_order: 4
      }
    ];

    for (const c of certs) {
      await sql`
        INSERT INTO certifications (
          id, name, issuer, issue_date, credential_id, is_professional, badge_url,
          description, skills, credential_url, sort_order
        ) VALUES (
          ${c.id}, ${c.name}, ${c.issuer}, ${c.issue_date}, ${c.credential_id},
          ${c.is_professional}, ${c.badge_url}, ${c.description},
          ${JSON.stringify(c.skills)}, ${c.credential_url}, ${c.sort_order}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          issuer = EXCLUDED.issuer,
          issue_date = EXCLUDED.issue_date,
          credential_id = EXCLUDED.credential_id,
          is_professional = EXCLUDED.is_professional,
          badge_url = EXCLUDED.badge_url,
          description = EXCLUDED.description,
          skills = EXCLUDED.skills,
          credential_url = EXCLUDED.credential_url,
          sort_order = EXCLUDED.sort_order;
      `;
    }
    console.log(`Inserted/updated ${certs.length} certifications.`);

    console.log('✅ ALL DATA SUCCESSFULLY MIGRATED TO SUPABASE!');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

run();
