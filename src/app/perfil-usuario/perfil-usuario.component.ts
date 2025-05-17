import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  nombre = 'Juan Pérez';
  correo = 'juan@example.com';
  direccion = 'Calle Falsa 123, Springfield';

  editarDireccion() {
    alert('Función para editar dirección (a implementar)');
  }

  volver() {
    window.history.back();
  }

  verListaDeseos() {
    alert('Lista de deseos (a implementar)');
  }

  verPedidos() {
    alert('Pedidos (a implementar)');
  }
}
