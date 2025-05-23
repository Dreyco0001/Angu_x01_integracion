import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductoCarrito {
  nombre: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: ProductoCarrito[] = [];

  agregar(producto: ProductoCarrito) {
    const existente = this.carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  eliminar(producto: ProductoCarrito) {
    this.carrito = this.carrito.filter(p => p.nombre !== producto.nombre);
  }

  limpiar() {
    this.carrito = [];
  }
    volver() {
    window.history.back();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }
}
