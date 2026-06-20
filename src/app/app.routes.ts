import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layouts/layout.component';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { AiAssistantComponent } from './features/ai-assistant/ai-assistant.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'ai-assistant', component: AiAssistantComponent },
      { path: '**', redirectTo: '/home' },
    ],
  },
];
