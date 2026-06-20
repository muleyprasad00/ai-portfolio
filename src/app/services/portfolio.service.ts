import { Injectable, inject } from '@angular/core';
import { signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Skill } from '../models/skill.model';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { MOCK_SKILLS, MOCK_PROJECTS, MOCK_EXPERIENCE } from '../core/constants/mock-data';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private skillsSubject = new BehaviorSubject<Skill[]>(MOCK_SKILLS);
  private projectsSubject = new BehaviorSubject<Project[]>(MOCK_PROJECTS);
  private experienceSubject = new BehaviorSubject<Experience[]>(MOCK_EXPERIENCE);

  readonly skills$ = this.skillsSubject.asObservable();
  readonly projects$ = this.projectsSubject.asObservable();
  readonly experience$ = this.experienceSubject.asObservable();

  getSkills(): Observable<Skill[]> {
    return this.skills$;
  }

  getSkillsSync(): Skill[] {
    return this.skillsSubject.value;
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectsSync(): Project[] {
    return this.projectsSubject.value;
  }

  getExperience(): Observable<Experience[]> {
    return this.experience$;
  }

  getExperienceSync(): Experience[] {
    return this.experienceSubject.value;
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return new Observable((observer) => {
      this.skills$.subscribe((skills) => {
        observer.next(skills.filter((s) => s.category === category));
      });
    });
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return new Observable((observer) => {
      this.projects$.subscribe((projects) => {
        observer.next(projects.filter((p) => p.category === category));
      });
    });
  }

  getFeaturedProjects(): Observable<Project[]> {
    return new Observable((observer) => {
      this.projects$.subscribe((projects) => {
        observer.next(projects.filter((p) => p.featured));
      });
    });
  }
}
