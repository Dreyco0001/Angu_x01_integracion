import { Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './admin/admin.component';
import { GestionComponent } from './gestion/gestion.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { NoticiasListaComponent } from './noticias/noticias-lista.component';

export const routes: Routes = [
  { path: 'tienda', component: TiendaComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'gestion', component: GestionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'noticias', component: NoticiasListaComponent },
  { path: '', redirectTo: 'tienda', pathMatch: 'full' },  // Tienda es el nuevo home
  { path: '**', redirectTo: 'tienda' }  // Catch-all
];
