import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   title = 'anguV2';
  isLoggedIn = false; // Aquí pon la lógica real para saber si el usuario está logueado
  activeRoute: string = '';

  constructor(private router: Router) {
    // Para actualizar la ruta activa y que cambie la clase active en el menú
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta]);
  }
}