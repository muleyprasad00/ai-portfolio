import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Detect system preference or saved preference from localStorage
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      this.setTheme(isDark);
    }
  }

  toggleTheme(): void {
    this.setTheme(!this.isDarkMode());
  }

  private setTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
