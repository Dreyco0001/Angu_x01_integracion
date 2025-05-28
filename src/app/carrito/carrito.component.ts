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
  monedaSimbolo: string = '$';

  constructor() {
    // Cargar carrito desde localStorage al iniciar
    const carritoGuardado = localStorage.getItem('carrito');
    this.carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Cargar moneda del localStorage o default a USD
    const moneda = localStorage.getItem('moneda') || 'USD';
    this.monedaSimbolo = this.obtenerSimbolo(moneda);
  }

  agregar(producto: ProductoCarrito) {
    const existente = this.carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.guardarCarrito();
  }

  eliminar(producto: ProductoCarrito) {
    this.carrito = this.carrito.filter(p => p.nombre !== producto.nombre);
    this.guardarCarrito();
  }

  limpiar() {
    this.carrito = [];
    this.guardarCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  volver() {
    window.history.back();
  }
  pagar() {
  if (this.carrito.length === 0) {
    alert('El carrito está vacío, no hay nada que pagar.');
    return;
  }
  const total = this.obtenerTotal();
  alert(`Pago simulado de ${total.toFixed(2)} exitoso. Gracias por tu compra.`);
  this.limpiar();
}


  obtenerSimbolo(moneda: string): string {
    switch (moneda) {
      case 'USD': return '$';
      case 'MXN': return 'MX$';
      case 'EUR': return '€';
      case 'CLP': return 'CLP$';
      case 'COP': return 'COL$';
      case 'GBP': return '£';
      case 'JPY': return '¥';
      case 'AUD': return 'A$';
      case 'CAD': return 'C$';
      case 'CHF': return 'CHF';
      case 'CNY': return '¥';
      default: return '$';
    }
  }
}
