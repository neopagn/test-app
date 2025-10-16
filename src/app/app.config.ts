import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBe } from './services/mockBE/mock-be';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import MyPreset from '../customTheme';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),  
    provideAnimationsAsync(),
    providePrimeNG({theme: {
      preset: Aura,
      
  }}),
    
    // importProvidersFrom(
    //   HttpClientInMemoryWebApiModule.forRoot(MockBe, { dataEncapsulation: false })
    // ),
  ]
};
