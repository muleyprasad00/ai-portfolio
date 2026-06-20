import { Skill } from '../../models/skill.model';
import { Project } from '../../models/project.model';
import { Experience } from '../../models/experience.model';

export const MOCK_SKILLS: Skill[] = [
    {
        id: '1',
        name: 'Angular',
        category: 'Frontend',
        proficiency: 95,
        icon: 'angular',
        description: 'Expert in Angular framework, standalone components, and signals',
    },
    {
        id: '2',
        name: 'TypeScript',
        category: 'Frontend',
        proficiency: 95,
        icon: 'typescript',
        description: 'Strong typing and advanced TypeScript patterns',
    },
    {
        id: '3',
        name: 'RxJS',
        category: 'Frontend',
        proficiency: 90,
        icon: 'rxjs',
        description: 'Reactive programming and observables',
    },
    {
        id: '4',
        name: 'AG Grid',
        category: 'Frontend',
        proficiency: 85,
        icon: 'grid',
        description: 'Advanced data grid implementations',
    },
    {
        id: '5',
        name: 'GraphQL',
        category: 'Backend',
        proficiency: 80,
        icon: 'graphql',
        description: 'GraphQL queries and mutations',
    },
    {
        id: '6',
        name: 'NGINX',
        category: 'DevOps',
        proficiency: 75,
        icon: 'server',
        description: 'Web server configuration and optimization',
    },
    {
        id: '7',
        name: 'GitHub Actions',
        category: 'DevOps',
        proficiency: 85,
        icon: 'github',
        description: 'CI/CD pipeline automation',
    },
    {
        id: '8',
        name: 'AI Development',
        category: 'Other',
        proficiency: 80,
        icon: 'smart_toy',
        description: 'AI integration and LLM implementations',
    },
];

export const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        title: 'Demand Planning app',
        description: 'Demand Planning is a web application that helps manufacturers and supply chain planners to plan and forecast the demand of the product.  ',
        shortDescription: 'Demand Planning is a web application that helps manufacturers and supply chain planners to plan and forecast the demand of the product.',
        technologies: ['Angular', 'ag-Grid', 'GraphQL'],
        link: 'Not Available',
        github: 'Not Available',
        featured: true,
        category: 'Angular + ag-Grid + GraphQL',
    },
    {
        id: '2',
        title: 'Allocation (FARS)',
        description: 'Allocation (FARS) is an web application that helps manufacturers and supply chain planners to plan and allocate the demand of the product.',
        shortDescription: 'Allocation (FARS) is an web application that helps manufacturers and supply chain planners to plan and allocate the demand of the product.',
        technologies: ['Angular', 'Ag-Grid', 'GraphQL'],
        link: 'Not Available',
        github: 'Not Available',
        featured: false,
        category: 'Angular + Ag-Grid + GraphQL',
    },
    {
        id: '3',
        title: 'Mytrux web app',
        description: 'This is a web app mainly for transporter to manage their business. Transporter can manage their truck and load information.',
        shortDescription: 'Web app that help transporter to manage their business.',
        technologies: ['Angular', 'AG Grid'],
        link: 'https://mytrux.com',
        github: 'https://github.com',
        featured: true,
        category: 'Angular + AG Grid',
    },
    {
        id: '4',
        title: 'Mytrux fasttag management',
        description: 'This is FastTag web Application manage fasttag for the user.  ',
        shortDescription: 'FastTag web Application manage fasttag for the user.',
        technologies: ['Angular', 'LLM'],
        link: 'https://mytrux.com',
        github: 'https://github.com',
        featured: false,
        category: 'Angular + LLM',
    },
    {
        id: '5',
        title: 'Mytrux Hub',
        description: 'Mytrux Hub is a web application that helps truck owners to find loads and load owners to find trucks.  ',
        shortDescription: 'Mytrux Hub is a web application that helps truck owners to find loads and load owners to find trucks.',
        technologies: ['Angular', 'LLM'],
        link: 'https://mytrux.com',
        github: 'https://github.com',
        featured: false,
        category: 'Mobile + AI',
    },

    {
        id: '6',
        title: 'LCP web app',
        description: 'LCP is a web application that helps users to plan and allocate the demand of the product.',
        shortDescription: 'LCP is a web application that helps users to plan and allocate the demand of the product.',
        technologies: ['Angular', 'GraphQL'],
        link: 'Not Available',
        github: 'Not Available',
        featured: true,
        category: 'Angular + GraphQL',
    }

];

export const MOCK_EXPERIENCE: Experience[] = [
    {
        id: '1',
        company: 'Kanaka Software Solutions',
        position: 'Senior Frontend Developer',
        duration: {
            start: new Date('2020-09-21'),
            end: undefined,
        },
        description: 'Led frontend development team, architected scalable Angular applications, mentored junior developers',
        technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'RxJS', 'Material', 'Ag-Grid'],
        isCurrentRole: true,
    },
    {
        id: '2',
        company: 'Mytrux Infotech',
        position: 'Frontend Developer',
        duration: {
            start: new Date('2016-09-17'),
            end: new Date('2020-09-20')
        },
        description: 'Developed responsive web applications, implemented UI components, optimized performance',
        technologies: ['Angularjs', 'JavaScript', 'HTML', 'CSS'],
        isCurrentRole: false,
    }
];

export const contactInfo = {
    name: 'Prasad Muley',
    email: 'muleyprasad01@gmail.com',
    phone: '+91 8275231881',
    address: 'Pune, Maharashtra, India',
};

export const ABOUT_INFO = {
    subtitle: 'Senior Frontend Developer passionate about building amazing web experiences',
    summary: 'I am a Senior Frontend Developer with 10 years of experience building scalable, performant, and accessible web applications. Specialized in Angular, TypeScript, and modern web technologies. I\'m passionate about writing clean, maintainable code and delivering exceptional user experiences. Throughout my career, I\'ve worked with diverse teams and technologies, always focusing on delivering high-quality solutions that meet and exceed business requirements. I believe in continuous learning and staying up-to-date with the latest industry trends and best practices. I thrive in collaborative environments and enjoy mentoring junior developers to help them grow their skills and advance their careers.',
    experienceOverview: [{ title: '10+ Years', description: 'Professional Development' }, { title: '50+ Projects', description: 'Successfully Delivered' }, { title: '20+ Clients', description: 'Across Industries' }, { title: '100%', description: 'Client Satisfaction' }],
    technologyStack: [
        { category: 'Frontend', technologies: ['Angular 21+', 'TypeScript', 'RxJS', 'Material', 'SCSS'] },
        { category: 'Backend', technologies: ['Node.js', 'GraphQL'] },
        { category: 'DevOps', technologies: ['NGINX', 'GitHub Actions'] },
        { category: 'Other', technologies: ['AI Development'] }
    ]
}
