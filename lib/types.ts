// Core type definitions for the portfolio

export interface Link {
    label: string;
    url: string;
    icon?: string; // Optional icon name from lucide-react
  }
  
  export interface ReservedTag {
    id: string;
    label: string;
    backgroundColor: string;
    textColor: string;
    borderColor?: string;
    icon?: string; // Optional icon name from lucide-react
  }
  
  export type MediaType = 'gallery' | 'video' | 'iframe' | 'grid';
  
  export interface MediaContent {
    type: MediaType;
    // For galleries and grids
    images?: string[];
    // For videos
    videoUrl?: string;
    platform?: 'youtube' | 'vimeo';
    // For iframes
    iframeUrl?: string;
    aspectRatio?: string; // e.g., '16/9', '4/3', '1/1'
    height?: string; // e.g., '600px'
  }
  
  export interface Project {
    id: string;
    title: string;
    tags: string[];
    description: string;
    links: Link[];
    year: string;
    month: string;
    media?: MediaContent;
    featured?: boolean; // Optional: highlight certain projects
  }
  
  export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    bio: string[];
    email: string;
    location?: string;
    links: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      scholar?: string; // Google Scholar
      custom?: Link[];
    };
  }
  
  export interface PortfolioData {
    personal: PersonalInfo;
    projects: Project[];
    skills?: string[]; // Optional: list of key skills
  }