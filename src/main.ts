import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),      // Provee el router con tus rutas
    provideHttpClient()         // Provee HttpClient para las peticiones HTTP
  ]
}).catch(err => console.error(err));
