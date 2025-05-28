import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'  // Aquí es "styleUrls", con s al final, no "styleUrl"
})
export class AppComponent {
  title = 'anguV2';
  isLoggedIn = false; // lógica real para logueo pendiente
  activeRoute: string = '';

  constructor(private router: Router) {
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
