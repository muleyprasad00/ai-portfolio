export interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image?: string;
    technologies: string[];
    link?: string;
    github?: string;
    featured: boolean;
    category?: string;
}
