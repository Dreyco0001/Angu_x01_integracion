import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'registro',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client
  },
  {
    path: 'gestion',
    renderMode: RenderMode.Client
  },
  {
    path: 'carrito',
    renderMode: RenderMode.Client
  },
  {
    path: 'perfil-usuario',
    renderMode: RenderMode.Client
  },
  {
    path: 'tienda',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
