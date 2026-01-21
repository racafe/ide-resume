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
    name: 'Rafael Carrion',
    title: 'Software Engineer',
    email: 'contact@example.com',
    location: 'United States',
    linkedin: 'https://linkedin.com/in/rafaelcarrion',
    github: 'https://github.com/rafaelcarrion',
    website: 'https://rafaelcarrion.dev',
  },

  summary:
    'Experienced software engineer passionate about building high-quality, scalable applications. Focused on delivering clean, maintainable code and exceptional user experiences.',

  workExperience: [
    {
      company: 'Example Company',
      position: 'Senior Software Engineer',
      location: 'Remote',
      startDate: '2022-01',
      endDate: 'Present',
      highlights: [
        'Led development of key product features',
        'Mentored junior developers and conducted code reviews',
        'Improved system performance and reliability',
        'Collaborated with cross-functional teams to deliver projects',
      ],
      technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
    {
      company: 'Previous Company',
      position: 'Software Engineer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-12',
      highlights: [
        'Developed and maintained web applications',
        'Implemented RESTful APIs and microservices',
        'Participated in agile development processes',
        'Contributed to technical documentation',
      ],
      technologies: ['JavaScript', 'Python', 'AWS', 'Docker'],
    },
  ],

  education: [
    {
      institution: 'University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'United States',
      graduationDate: '2019',
      relevantCourses: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Systems',
        'Computer Networks',
      ],
    },
  ],

  skills: [
    {
      category: 'Programming Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
    },
    {
      category: 'Frontend',
      skills: ['React', 'Vue.js', 'Astro', 'Tailwind CSS', 'HTML/CSS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'],
    },
    {
      category: 'Practices',
      skills: ['Agile/Scrum', 'Test-Driven Development', 'Code Review', 'Technical Writing'],
    },
  ],

  projects: [
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
      name: 'Open Source Contributions',
      description: 'Active contributor to various open source projects in the JavaScript/TypeScript ecosystem.',
      technologies: ['TypeScript', 'JavaScript', 'Node.js'],
      highlights: [
        'Bug fixes and feature implementations',
        'Documentation improvements',
        'Community engagement and support',
      ],
    },
  ],

  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      dateObtained: '2023-01',
      expirationDate: '2026-01',
    },
  ],

  personalInterests: [
    {
      category: 'Technology',
      items: ['Open source software', 'AI and machine learning', 'Web technologies', 'Developer tools'],
    },
    {
      category: 'Hobbies',
      items: ['Reading', 'Hiking', 'Photography', 'Coffee brewing'],
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

// Default export for convenience
export default resume;
