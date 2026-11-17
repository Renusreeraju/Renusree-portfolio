export type ProjectCategory = 'all' | 'data-ml' | 'systems-web' | 'analytics';
export type ProjectTone = 'forest' | 'clay' | 'charcoal' | 'ice' | 'paperblue';

export interface ProjectItem {
  id: string;
  indexLabel: string;
  title: string;
  domain: string;
  category: Exclude<ProjectCategory, 'all'>;
  timeframe: string;
  tone: ProjectTone;
  eyebrow: string;
  posterLines: string[];
  stack: string[];
  headlineMetric: string;
  metricContext: string;
  summary: string;
  methodology: string[];
  outcomes: string[];
  sandboxType: 'solar-ml' | 'powerbi-sales' | 'student-crud' | 'weather-api' | 'portfolio-arch';
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  focusArea: string;
  summary: string;
  contributions: string[];
  tools: string[];
  impactMetric: string;
}

export interface CapabilityDomain {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: {
    name: string;
    application: string;
  }[];
  evidenceTitle: string;
  evidenceDetail: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  gpa: string;
  period: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  focus: string;
}

export const PROFILE = {
  name: 'Renusree Ayyapparaju',
  email: 'renusreeraju28@gmail.com',
  phone: '+91 9652854689',
  linkedin: 'https://www.linkedin.com/in/renusree-a-bb6b36298',
  github: 'https://github.com/Renusreeraju',
  resumePath: '/assets/aistudio/Renusree_Ayyapparaju_-_Resume_d0e225a0.pdf',
  kicker: 'Information Science & Technology · Data Systems · Web Engineering',
  headline: 'Turning raw data and systems logic into clear, accessible solutions.',
  summary:
    'Computer Science and Information Technology graduate with hands-on experience spanning predictive machine learning, interactive analytics, cloud infrastructure, and WCAG-compliant web engineering. Experienced in translating complex technical requirements into structured workflows for cross-functional stakeholders.',
};

export const HERO_METRICS = [
  {
    value: '96%',
    label: 'Solar Prediction Model Accuracy',
    context: 'Linear Regression, Random Forest & XGBoost',
  },
  {
    value: '20%',
    label: 'Faster Page Load Performance',
    context: 'Clean code & asset optimization at Strydo',
  },
  {
    value: '5 Tasks',
    label: 'Simulated Banking Backend',
    context: 'Kafka, H2 DB & REST APIs (J.P. Morgan Forage)',
  },
  {
    value: '4 Roles',
    label: 'Industry Internships & Programs',
    context: 'Web engineering, cloud infrastructure & backend',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'solar-radiation-ml',
    indexLabel: '01',
    title: 'Solar Radiation Prediction Using Machine Learning',
    domain: 'Predictive Modeling & Exploratory Data Analysis',
    category: 'data-ml',
    timeframe: 'Dec 2023 – Feb 2024',
    tone: 'forest',
    eyebrow: 'PYTHON · SCIKIT-LEARN · XGBOOST',
    posterLines: ['96%', 'SOLAR', 'MODEL.'],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'XGBoost'],
    headlineMetric: '96% Accuracy',
    metricContext: 'Validated via RMSE and R² across three regression architectures',
    summary:
      'Built an end-to-end predictive pipeline to forecast solar radiation levels from historical weather variables, comparing Linear Regression, Random Forest, and XGBoost ensembles.',
    methodology: [
      'Performed missing-value handling, outlier inspection, feature engineering, and exploratory correlation analysis using Pandas and NumPy.',
      'Trained and benchmarked Linear Regression, Random Forest, and XGBoost models under consistent train-test splits.',
      'Evaluated predictive fit using RMSE and R² metrics, systematically tuning hyperparameters to reduce variance.',
      'Generated clear diagnostic plots with Matplotlib and Seaborn to communicate seasonal and meteorological patterns.',
    ],
    outcomes: [
      'Achieved 96% prediction accuracy with the tuned final machine learning model.',
      'Documented comparative model performance to support transparent algorithm selection.',
    ],
    sandboxType: 'solar-ml',
  },
  {
    id: 'power-bi-sales',
    indexLabel: '02',
    title: 'Power BI Sales Analytics Dashboard',
    domain: 'Business Intelligence & Decision Support',
    category: 'analytics',
    timeframe: 'Data Analytics Showcase',
    tone: 'clay',
    eyebrow: 'POWER BI · EXCEL · KPI MODELING',
    posterLines: ['SALES', 'DRILL', 'DOWN.'],
    stack: ['Power BI', 'Microsoft Excel', 'Data Cleaning', 'KPI Modeling'],
    headlineMetric: 'Multi-Region Drill-Down',
    metricContext: 'Interactive filtering across regions, periods, and revenue drivers',
    summary:
      'Structured raw transactional sales records into a clean analytical schema and built an interactive Power BI dashboard for executive and operational decision-making.',
    methodology: [
      'Audited, normalized, and cleaned raw sales tables to eliminate inconsistencies prior to visualization.',
      'Modeled hierarchical time and regional dimensions to support seamless drill-down exploration.',
      'Designed clear, high-contrast charts highlighting revenue trends, category contribution, and period-over-period variance.',
    ],
    outcomes: [
      'Enabled stakeholders to inspect performance across regions and time horizons without manual spreadsheet lookups.',
      'Established a repeatable data preparation checklist for reliable reporting.',
    ],
    sandboxType: 'powerbi-sales',
  },
  {
    id: 'student-result-management',
    indexLabel: '03',
    title: 'Student Result Management System',
    domain: 'Information Systems & Structured CRUD Architecture',
    category: 'systems-web',
    timeframe: 'Sep 2023 – Oct 2023',
    tone: 'charcoal',
    eyebrow: 'HTML · CSS · JAVASCRIPT · CRUD',
    posterLines: ['RECORD', 'SYSTEM', 'CRUD.'],
    stack: ['HTML', 'CSS', 'JavaScript', 'DOM Optimization', 'Form Validation'],
    headlineMetric: 'Full CRUD Lifecycle',
    metricContext: 'Validated academic record creation, retrieval, updates, and search',
    summary:
      'Engineered a browser-based academic record management application enabling instructors and administrators to record, update, validate, and search student examination results reliably.',
    methodology: [
      'Implemented strict client-side form validation and structured storage logic to protect record integrity.',
      'Optimized DOM update cycles and event delegation for responsive rendering across growing record tables.',
      'Designed an intuitive search-and-edit workflow tested across edge cases such as duplicate IDs and boundary marks.',
    ],
    outcomes: [
      'Reduced friction in entering, verifying, and querying student academic records.',
      'Verified data accuracy across common administrative test scenarios.',
    ],
    sandboxType: 'student-crud',
  },
  {
    id: 'weather-application',
    indexLabel: '04',
    title: 'Live Weather & Forecast Application',
    domain: 'Asynchronous API Integration & State Handling',
    category: 'systems-web',
    timeframe: 'Front-End Engineering',
    tone: 'ice',
    eyebrow: 'REST API · ASYNC STATE · UI',
    posterLines: ['LIVE', 'WEATHER', 'FLOW.'],
    stack: ['HTML', 'CSS', 'JavaScript', 'REST Weather API', 'Async State UI'],
    headlineMetric: 'Resilient Async States',
    metricContext: 'Graceful loading, live telemetry parsing, and network error recovery',
    summary:
      'Developed a responsive weather web application consuming live meteorological APIs to present current conditions and upcoming forecasts with resilient loading and error feedback.',
    methodology: [
      'Integrated a third-party weather data API to fetch real-time location-based conditions and multi-day forecasts.',
      'Structured explicit loading indicators, empty states, and retryable error messages for varying network reliability.',
      'Organized forecast metrics into scannable cards optimized for both desktop and mobile viewports.',
    ],
    outcomes: [
      'Delivered dependable real-time lookups with clear user feedback under degraded network conditions.',
    ],
    sandboxType: 'weather-api',
  },
  {
    id: 'responsive-portfolio-v1',
    indexLabel: '05',
    title: 'Responsive Academic & Technical Portfolio Architecture',
    domain: 'Modular UI Systems & Automated Deployment',
    category: 'systems-web',
    timeframe: 'Jun 2023 – Aug 2023',
    tone: 'paperblue',
    eyebrow: 'BOOTSTRAP · WCAG · GITHUB PAGES',
    posterLines: ['MODULAR', 'WEB', 'SYSTEM.'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'GitHub Pages'],
    headlineMetric: 'WCAG & CI Deployment',
    metricContext: 'Modular CSS layout system published via GitHub Pages',
    summary:
      'Designed and deployed a mobile-responsive web showcase featuring custom modular CSS components, accessibility best practices, and automated version-tracked publishing.',
    methodology: [
      'Created reusable CSS layout primitives and responsive grid breakpoints using Bootstrap and custom stylesheets.',
      'Applied semantic HTML landmarks and accessible contrast/focus patterns for keyboard and screen-reader navigation.',
      'Configured GitHub Pages for automated deployment and clean version tracking across iterations.',
    ],
    outcomes: [
      'Established a maintainable, version-controlled publishing workflow for academic and technical artifacts.',
    ],
    sandboxType: 'portfolio-arch',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'jpmorgan',
    role: 'Software Engineering Simulation',
    organization: 'J.P. Morgan Chase (Forage)',
    period: 'Dec 2025',
    focusArea: 'Backend Systems & Event-Driven Integration',
    summary:
      'Completed an end-to-end banking system simulation covering event streaming, embedded relational persistence, and REST controller architecture under professional Git workflows.',
    contributions: [
      'Completed end-to-end project environment setup inside a simulated enterprise banking codebase.',
      'Implemented Apache Kafka message integration, H2 relational database persistence, and REST API controllers.',
      'Built backend endpoints serving processed transaction data to frontend clients across 5 core technical tasks.',
      'Adhered to structured version control and engineering verification practices throughout delivery.',
    ],
    tools: ['Kafka', 'H2 Database', 'REST APIs', 'Git Workflows', 'Backend Controllers'],
    impactMetric: '5 core banking engineering tasks completed end-to-end',
  },
  {
    id: 'besant',
    role: 'DevOps and Cloud Trainee',
    organization: 'Besant Technologies',
    period: 'Apr 2025 – Oct 2025',
    focusArea: 'Cloud Infrastructure & Deployment Reliability',
    summary:
      'Completed intensive practical training in cloud computing fundamentals, AWS core services, deployment pipelines, and environment monitoring.',
    contributions: [
      'Gained hands-on experience with cloud computing fundamentals, AWS (EC2, S3, Lambda basics), and infrastructure provisioning.',
      'Assisted in configuring and monitoring cloud-hosted environments to support application reliability and uptime.',
      'Collaborated with cross-functional peer teams to design and verify DevOps deployment pipelines and service integrations.',
    ],
    tools: ['AWS EC2', 'AWS S3', 'AWS Lambda', 'DevOps Pipelines', 'Environment Monitoring'],
    impactMetric: '7 months of hands-on cloud & deployment workflow training',
  },
  {
    id: 'strydo',
    role: 'Web Development Intern',
    organization: 'Strydo Technologies Pvt. Ltd.',
    period: 'Oct 2024 – Dec 2024',
    focusArea: 'WCAG Accessibility & Front-End Performance',
    summary:
      'Engineered and optimized responsive front-end interfaces for live business websites in Agile sprint cycles, improving both page speed and accessibility compliance.',
    contributions: [
      'Developed responsive front-end interfaces using HTML, CSS, and JavaScript for production business websites.',
      'Tested and debugged UI components across browsers to guarantee consistent rendering and interaction reliability.',
      'Incorporated stakeholder and user feedback to strengthen interface accessibility in alignment with WCAG standards.',
      'Collaborated via Git and GitHub within Agile sprint cycles to improve feature turnaround.',
      'Reduced page load time by 20% through structured code cleanup and asset minification.',
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'WCAG Accessibility', 'Git & GitHub', 'Agile Sprints'],
    impactMetric: '20% reduction in page load time on live production sites',
  },
  {
    id: 'swentic',
    role: 'Web Development Intern',
    organization: 'Swentic Educo Pvt. Ltd.',
    period: 'Jun 2024 – Aug 2024',
    focusArea: 'Cross-Device UI & Collaborative Feature Delivery',
    summary:
      'Built responsive, usability-focused web interfaces for educational technology workflows alongside the core engineering team.',
    contributions: [
      'Built responsive web interfaces using semantic HTML and modular CSS focused on cross-device usability.',
      'Partnered with the development team to implement, test, and refine front-end product features.',
    ],
    tools: ['HTML', 'CSS', 'Responsive Design', 'UI Testing'],
    impactMetric: 'Cross-device interface delivery for educational web workflows',
  },
];

export const CAPABILITY_DOMAINS: CapabilityDomain[] = [
  {
    id: 'data-ml',
    title: 'Data Analytics & Machine Learning',
    subtitle: 'Quantitative modeling, feature engineering & decision intelligence',
    description:
      'Structured analytical workflow from raw data cleaning and exploratory statistics to supervised modeling, hyperparameter tuning, and executive visualization.',
    skills: [
      {
        name: 'Python, Pandas & NumPy',
        application: 'Data ingestion, missing-value imputation, feature engineering, and matrix transformations.',
      },
      {
        name: 'Scikit-learn & XGBoost',
        application: 'Regression & ensemble benchmarking evaluated systematically with RMSE and R².',
      },
      {
        name: 'Matplotlib & Seaborn',
        application: 'Exploratory distribution plots, residual diagnostics, and pattern communication.',
      },
      {
        name: 'Power BI, SQL & Excel',
        application: 'Relational querying, normalized data tables, and interactive drill-down reporting.',
      },
    ],
    evidenceTitle: 'Applied Evidence: Solar Radiation Prediction & Sales BI',
    evidenceDetail:
      'Delivered 96% predictive accuracy on meteorological datasets and built multi-region Power BI drill-down views for stakeholder decision-making.',
  },
  {
    id: 'systems-cloud',
    title: 'Information Systems, Backend & Cloud',
    subtitle: 'APIs, event streams, relational storage & deployment pipelines',
    description:
      'Foundational systems engineering across RESTful backend endpoints, message-driven pipelines, relational databases, and AWS cloud environments.',
    skills: [
      {
        name: 'REST APIs & Kafka Integration',
        application: 'Serving processed transaction records across decoupled producer/consumer endpoints.',
      },
      {
        name: 'SQL & H2 Relational Persistence',
        application: 'Structured schema design, record integrity validation, and deterministic querying.',
      },
      {
        name: 'AWS (EC2, S3, Lambda basics)',
        application: 'Compute instance setup, object storage workflows, and serverless trigger fundamentals.',
      },
      {
        name: 'DevOps & Git Version Control',
        application: 'Branch-based team collaboration, deployment monitoring, and continuous publishing.',
      },
    ],
    evidenceTitle: 'Applied Evidence: J.P. Morgan Simulation & Besant Cloud Training',
    evidenceDetail:
      'Completed 5 enterprise banking integration tasks using Kafka/H2/REST and 7 months of hands-on cloud monitoring and deployment practice.',
  },
  {
    id: 'web-accessibility',
    title: 'Web Engineering & Human-Centered Accessibility',
    subtitle: 'WCAG compliance, responsive systems & measurable performance',
    description:
      'Building inclusive, fast-loading web applications grounded in semantic markup, cross-browser reliability, and user-feedback iteration.',
    skills: [
      {
        name: 'HTML5, CSS3, JavaScript & Bootstrap',
        application: 'Modular layouts, clean DOM manipulation, and asynchronous API state management.',
      },
      {
        name: 'WCAG Accessibility Standards',
        application: 'Keyboard navigation, contrast verification, and semantic structure guided by user feedback.',
      },
      {
        name: 'Performance Optimization',
        application: 'Asset minification and streamlined DOM rendering to cut load latency.',
      },
      {
        name: 'Cross-Browser & Device QA',
        application: 'Systematic debugging and edge-case testing across desktop and mobile viewports.',
      },
    ],
    evidenceTitle: 'Applied Evidence: Strydo Technologies & Student Result System',
    evidenceDetail:
      'Cut live website load times by 20% at Strydo Technologies while applying WCAG usability improvements across Agile sprints.',
  },
  {
    id: 'leadership-communication',
    title: 'Technical Communication, Mentorship & Leadership',
    subtitle: 'Translating technical systems for diverse teams & learners',
    description:
      'Strong interpersonal foundation combining stakeholder alignment, structured documentation, and collaborative problem-solving suited for technical teams and instructional environments.',
    skills: [
      {
        name: 'Stakeholder Management & Rapport Building',
        application: 'Gathering user feedback, aligning requirements, and presenting data-backed findings clearly.',
      },
      {
        name: 'People Management & Effective Leadership',
        application: 'Coordinating cross-functional sprint workflows and supporting peer onboarding.',
      },
      {
        name: 'Analytical Documentation & Briefing',
        application: 'Writing clear model evaluations, test cases, and visual walkthroughs using Excel, Word & PowerPoint.',
      },
      {
        name: 'Structured Problem Decomposition',
        application: 'Breaking complex data and software workflows into verifiable step-by-step modules.',
      },
    ],
    evidenceTitle: 'Applied Evidence: edX Leadership Credential & Agile Sprints',
    evidenceDetail:
      'Certified in Becoming an Effective Leader (edX) and experienced in synthesizing user feedback across Strydo, Swentic Educo, and Besant teams.',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech, Computer Science & Information Technology',
    institution: 'Siddharth Institute of Engineering & Technology',
    location: 'Puttur, A.P.',
    gpa: '7.21 GPA',
    period: 'Nov 2021 – Jun 2025',
    highlights: [
      'Core coursework across Data Structures, Database Management Systems, Software Engineering, Cloud Fundamentals, and Machine Learning.',
      'Applied academic training through a 96%-accuracy solar radiation ML capstone and full-stack CRUD information systems.',
    ],
  },
  {
    degree: 'Intermediate (MPC — Mathematics, Physics, Chemistry)',
    institution: 'Viswa Sai Junior College',
    location: 'Tirupati',
    gpa: '72 GPA',
    period: 'Jun 2019 – Apr 2021',
    highlights: [
      'Quantitative foundation in calculus, linear algebra, probability, and analytical problem-solving.',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'JPMorgan Software Engineering Job Simulation',
    issuer: 'J.P. Morgan Chase / Forage',
    focus: 'Kafka, H2 Database & REST API Architecture',
  },
  {
    title: 'Web Development',
    issuer: 'Coursera',
    focus: 'Responsive Front-End Systems & Web Standards',
  },
  {
    title: 'Cloud Computing',
    issuer: 'Simplilearn',
    focus: 'Cloud Architecture, Virtualization & AWS Basics',
  },
  {
    title: 'Python for Beginners',
    issuer: 'Simplilearn',
    focus: 'Core Python Programming & Data Structures',
  },
  {
    title: 'Becoming an Effective Leader',
    issuer: 'edX',
    focus: 'Team Leadership, Communication & Mentorship',
  },
  {
    title: 'Visual Effects (VFX)',
    issuer: 'SFX Animation',
    focus: 'Visual Storytelling & Digital Media Precision',
  },
];
