// Resume Data - Single source of truth for all resume information
// This file provides structured data that can be used by AI assistants and throughout the site

// ============================================================================
// Type Definitions
// ============================================================================

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  xing?: string;
  instagram?: string;
  twitter?: string;
  bsky?: string;
  github?: string;
  website?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  highlights: string[];
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  dateObtained: string;
  expirationDate?: string;
  credentialId?: string;
  url?: string;
}

export interface PersonalInterest {
  category: string;
  items: string[];
}

export interface Resume {
  contact: ContactInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  personalInterests: PersonalInterest[];
  languages?: { language: string; proficiency: string }[];
}

// ============================================================================
// Resume Data
// ============================================================================

export const resume: Resume = {
  contact: {
    name: 'Rafael Carrión',
    title: 'Senior Software Engineer / Solution Architect / CTO',
    email: 'rafael@rafaelcarrion.dev',
    location: 'Nuremberg, Germany',
    linkedin: 'https://linkedin.com/in/rafaelcarrion',
    xing: 'https://www.xing.com/profile/Rafael_CarrionFerraez/cv',
    instagram: 'https://www.instagram.com/racafe',
    twitter: 'https://www.twitter.com/rafael_carrion',
    bsky: 'https://bsky.app/profile/racafe.bsky.social',
    github: 'https://github.com/racafe',
    website: 'https://rafaelcarrion.dev',
  },

  summary:
    'Senior Software Engineer at noris network AG and CTO/Co-owner of Technit Solutions México with 15+ years of experience in solution architecture, full-stack development, and mobile app development. Led development of 30+ mobile applications and enterprise software solutions. Expert in system design, cloud architecture, and leading technical teams.',

  workExperience: [
    {
      company: 'noris network AG',
      position: 'Senior Software Engineer',
      location: 'Nuremberg, Germany',
      startDate: '2021-01',
      endDate: 'Present',
      highlights: [
        'Developing and maintaining enterprise software solutions',
        'Collaborating with cross-functional teams on complex technical challenges',
        'Served as ServiceNow developer with primary focus on Customer Service Management (CSM) Portal development',
        'Collaboratively designed and developed internal phone directory application using Angular framework',
        'Collaboratively designed and developed internal employee timesheet and vacation management system using Angular framework',
        'Collaboratively maintained customer-facing portal application built with Angular framework',
      ],
      technologies: ['JavaScript', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'ServiceNow', 'Angular', 'AngularJS'],
    },
    {
      company: 'Schulte & Schmidt GmbH',
      position: 'Solution Architect',
      location: 'Germany',
      startDate: '2018-01',
      endDate: '2021-12',
      highlights: [
        'Developed Intranet from zero to production using MariaDB, SQL Server, Sybase, and LDAP integration',
        'Maintained and upgraded Datawarehouse (SQL Server) with optimized SQL views for controlling department',
        'Deployed real-time data dashboards from multiple sources/APIs using Docker and Ruby',
        'Configured and deployed Icinga2 for computer system and network monitoring',
        'Developed iOS and Android mobile applications for administration board',
        'Implemented user and role level security across all systems',
      ],
      technologies: ['MariaDB', 'SQL Server', 'Sybase', 'LDAP', 'Docker', 'Ruby', 'Icinga2', 'iOS', 'Android'],
    },
    {
      company: 'Technit Solutions México',
      position: 'CTO / Co-owner',
      location: 'Veracruz, México',
      startDate: '2010-01',
      endDate: 'Present',
      highlights: [
        'Co-owner and CTO of IT & graphic design company specialized in mobile applications and cloud-based solutions',
        'Launched more than 30 mobile applications with many others in development or update status',
        'Technology infrastructure and IT operations manager',
        'IT software projects budget management and strategic decision making',
        'Technology stack decision maker and software solutions architect',
        'Client requirements analysis, software solutions planning, deploying, testing and supervising',
        'Software development life cycle planning and supervising',
        'Interviewing clients and prospects for defining software requirements and presenting solutions',
      ],
      technologies: [
        'Ionic',
        'Angular',
        'React',
        'Laravel',
        'PHP',
        'JavaScript',
        'TypeScript',
        'MySQL',
        'MongoDB',
        'AWS',
        'Firebase',
      ],
    },
    {
      company: 'T-Systems Puebla',
      position: 'Project Developer',
      location: 'Puebla, México',
      startDate: '2009-09',
      endDate: '2009-12',
      highlights: [
        'Developed Project Management online course based on PMBOK of Project Management Institute (PMI) on Moodle platform',
      ],
      technologies: ['Moodle', 'PHP', 'MySQL'],
    },
  ],

  education: [
    {
      institution: 'Tec de Monterrey',
      degree: 'Master',
      field: 'eCommerce',
      location: 'México',
      graduationDate: '2011',
      honors: ['Master in eCommerce'],
    },
    {
      institution: 'Tec de Monterrey',
      degree: 'Bachelor',
      field: 'Computer Engineering',
      location: 'México',
      graduationDate: '2009',
      gpa: '95/100',
      honors: ['Magna Cum Laude', 'Outstanding grade in CENEVAL final global examination'],
      relevantCourses: [
        'Project Management Specialization',
        'Software Engineering Specialization',
        'Computer Engineering Core Curriculum',
      ],
    },
    {
      institution: 'Boston University',
      degree: 'Certificate',
      field: 'Advanced English for Science',
      location: 'Boston, USA',
      graduationDate: '2005',
    },
  ],

  skills: [
    {
      category: 'Programming Languages',
      skills: ['JavaScript', 'TypeScript', 'HTML5', 'Modern CSS', 'PHP', 'SQL', 'Python'],
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        'Angular',
        'Ionic',
        'NestJS',
        'React',
        'Laravel',
        'Bootstrap',
        'Materialize',
        'Cordova',
        'Capacitor',
        'Tailwind CSS',
        'Astro',
        'Next.js',
        'TanStack',
      ],
    },
    {
      category: 'Testing',
      skills: ['Jasmine', 'Jest', 'Vitest', 'Cypress', 'Playwright', 'Selenium'],
    },
    {
      category: 'Databases',
      skills: ['MySQL/MariaDB', 'SQL Server', 'SQLite', 'Firebase', 'MongoDB'],
    },
    {
      category: 'OS & Server',
      skills: ['Windows', 'Mac', 'Ubuntu', 'CentOS', 'Porteus'],
    },
    {
      category: 'Cloud & DevOps',
      skills: [
        'AWS (EC2, S3, RDS, Lambda, EB, Amplify)',
        'Firebase',
        'Docker',
        'CI/CD',
        'Git',
        'Monolithic Architecture',
        'Microservices Architecture',
        'GitLab CI/CD',
        'GitHub Actions',
        'Nixpack',
        'Coolify',
        'Vercel',
      ],
    },
  ],

  projects: [
    {
      name: 'Tec Service PWA',
      description: 'Progressive Web App for service management and tracking, part of Technit Solutions portfolio.',
      technologies: ['Ionic', 'Angular', 'TypeScript', 'Laravel', 'MySQL'],
      highlights: [
        'Progressive Web App with offline capabilities',
        'Service tracking and management system',
        'Real-time updates and notifications',
      ],
    },
    {
      name: 'ClustERP PWA',
      description: 'Enterprise Resource Planning system delivered as a Progressive Web Application.',
      technologies: ['Ionic', 'React', 'Laravel', 'MySQL', 'Firebase'],
      highlights: [
        'Full ERP functionality in PWA format',
        'Multi-platform support (iOS, Android, Web)',
        'Real-time data synchronization',
      ],
      url: 'https://clusterp.com.mx',
    },
    {
      name: 'ClustERP Admin Panel',
      description: 'Administrative interface for managing ClustERP system configuration and users.',
      technologies: ['Angular', 'TypeScript', 'Laravel', 'MySQL'],
      highlights: ['Comprehensive admin dashboard', 'User and role management', 'System configuration and monitoring'],
    },
    {
      name: 'Technit Mobile Apps Portfolio',
      description: 'Collection of 30+ mobile applications developed and launched through Technit Solutions.',
      technologies: ['Ionic', 'Cordova', 'Capacitor', 'Angular', 'React', 'Laravel', 'PHP', 'NestJS'],
      highlights: [
        '30+ mobile applications launched',
        'Cross-platform development (iOS, Android)',
        'Custom solutions for various industries',
        'Ongoing maintenance and updates',
      ],
    },
    {
      name: 'Personal Portfolio',
      description: 'Modern portfolio website built with Astro and Tailwind CSS, featuring AI-assisted interactions.',
      technologies: ['Astro', 'TypeScript', 'Tailwind CSS'],
      highlights: [
        'Responsive design with dark mode support',
        'Optimized for performance and SEO',
        'Integrated AI chat functionality',
      ],
      url: 'https://rafaelcarrion.dev',
    },
    {
      name: 'Tuquinielita.com',
      description: 'A hobby project between friends to bet on sport events and share the results with friends.',
      technologies: ['Angular', 'TypeScript', 'Ionic', 'NestJS', 'Laravel', 'MySQL', 'Tailwind CSS'],
      highlights: ['Bet on sport events and share the results with friends', 'Share the results with friends'],
      url: 'https://tuquinielita.com',
    },
  ],

  certifications: [
    {
      name: 'Certified Application Developer (CAD)',
      issuer: 'ServiceNow',
      dateObtained: '2026',
    },
    {
      name: 'Certified ServiceNow Administrator (CSA)',
      issuer: 'ServiceNow',
      dateObtained: '2024',
    },
  ],

  personalInterests: [
    {
      category: 'Strengths',
      items: [
        'Teamwork',
        'Active listening & communication',
        'Leadership',
        'Forward thinking',
        'Comfortable working with deadlines',
        'Creative',
        'Adaptability',
        'Problem-solving',
        'Think outside the box',
      ],
    },
    {
      category: 'Technology',
      items: ['Software architecture', 'Mobile development', 'Cloud solutions', 'System design'],
    },
  ],

  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Professional' },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all skills as a flat array
 */
export function getAllSkills(): string[] {
  return resume.skills.flatMap((category) => category.skills);
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(categoryName: string): string[] {
  const category = resume.skills.find((c) => c.category === categoryName);
  return category?.skills ?? [];
}

/**
 * Get current work experience (positions with "Present" as end date)
 */
export function getCurrentPositions(): WorkExperience[] {
  return resume.workExperience.filter((exp) => exp.endDate === 'Present');
}

/**
 * Get total years of experience (approximate)
 */
export function getYearsOfExperience(): number {
  const firstJob = resume.workExperience[resume.workExperience.length - 1];
  if (!firstJob) return 0;

  const startYear = parseInt(firstJob.startDate.split('-')[0], 10);
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
}

/**
 * Format date range for display (e.g., "Jan 2021 - Present" or "Jan 2018 - Dec 2021")
 */
export function formatDateRange(startDate: string, endDate: string | 'Present'): string {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Parse start date (format: YYYY-MM)
  const [startYear, startMonth] = startDate.split('-').map(Number);
  const startFormatted = `${monthNames[startMonth - 1]} ${startYear}`;

  if (endDate === 'Present') {
    return `${startFormatted} - Present`;
  }

  // Parse end date (format: YYYY-MM)
  const [endYear, endMonth] = endDate.split('-').map(Number);
  const endFormatted = `${monthNames[endMonth - 1]} ${endYear}`;

  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Estimate education period from graduation date and degree type
 * Returns a period string like "2010 - 2011" or "2005 - 2009"
 */
export function formatEducationPeriod(graduationDate: string, degree: string): string {
  const gradYear = parseInt(graduationDate, 10);

  // Estimate duration based on degree type
  let duration = 1; // Default 1 year
  if (degree === 'Bachelor') {
    duration = 4; // Typically 4 years
  } else if (degree === 'Master') {
    duration = 1; // Typically 1-2 years, using 1 as default
  } else if (degree === 'Certificate') {
    duration = 1; // Typically 1 year or less
  }

  const startYear = gradYear - duration;
  return `${startYear} - ${gradYear}`;
}

/**
 * Get skills mapped to display categories used in skills.ts section
 * Maps categorized skills to: languages, frameworks, databases, os, cloud
 */
export function getSkillsByDisplayCategory(): {
  languages: string[];
  frameworks: string[];
  databases: string[];
  os: string[];
  cloud: string[];
} {
  const categoryMap: Record<string, keyof ReturnType<typeof getSkillsByDisplayCategory>> = {
    'Programming Languages': 'languages',
    'Frameworks & Libraries': 'frameworks',
    'Databases': 'databases',
    'OS & Server': 'os',
    'Cloud & DevOps': 'cloud',
  };

  const result = {
    languages: [] as string[],
    frameworks: [] as string[],
    databases: [] as string[],
    os: [] as string[],
    cloud: [] as string[],
  };

  resume.skills.forEach((category) => {
    const displayKey = categoryMap[category.category];
    if (displayKey && result[displayKey]) {
      result[displayKey] = category.skills;
    }
  });

  return result;
}

// Default export for convenience
export default resume;
