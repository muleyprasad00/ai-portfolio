export interface Skill {
    id: string;
    name: string;
    category: 'Frontend' | 'Backend' | 'DevOps' | 'Other';
    proficiency: number; // 0-100
    icon?: string;
    description?: string;
}

export interface SkillCategory {
    name: string;
    skills: Skill[];
}
