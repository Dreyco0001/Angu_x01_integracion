import { RenderMode, ServerRoute } from '@angular/ssr';
import { LoginComponent } from './login/login.component';

export const serverRoutes: ServerRoute[] = [
  {path: 'login',
    component: LoginComponent,
    data: {
      // Aquí puedes controlar el renderizado
      // Esto sería útil si el login no necesita SEO
      renderMode: 'browser'  // Evita renderizado SSR},
      }
    },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
