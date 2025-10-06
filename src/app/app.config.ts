import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockBe } from './services/mockBE/mock-be';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
     provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),  
    // importProvidersFrom(
    //   HttpClientInMemoryWebApiModule.forRoot(MockBe, { dataEncapsulation: false })
    // ),
  ]
};
