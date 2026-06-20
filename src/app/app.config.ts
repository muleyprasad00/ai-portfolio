import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch())
    ,
    // Register custom SVG icons for social links so <mat-icon>github</mat-icon> works
    {
      provide: 'APP_ICONS',
      useFactory: () => {
        const registry = inject(MatIconRegistry);
        const sanitizer = inject(DomSanitizer);
        return true;
      },
      multi: true,
    }
  ],
};
