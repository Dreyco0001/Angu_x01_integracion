import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: 'alto' | 'medio';
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  private http = inject(HttpClient);

  productosOriginal: Producto[] = [
    {
      nombre: 'Ryzen 9 7950X',
      descripcion: '16 núcleos, 32 hilos, ideal para cargas extremas.',
      precio: 699,
      imagen: '🧠', // icono representativo
      categoria: 'alto'
    },
    {
      nombre: 'Intel Core i9 13900K',
      descripcion: 'Lo último de Intel con rendimiento híbrido brutal.',
      precio: 619,
      imagen: '⚙️',
      categoria: 'alto'
    },
    {
      nombre: 'RTX 4090',
      descripcion: 'El monstruo de Nvidia para gaming y edición 8K.',
      precio: 1599,
      imagen: '🎮',
      categoria: 'alto'
    },
    {
      nombre: 'Intel Core i5 12400F',
      descripcion: 'Rinde bien sin romper el bolsillo.',
      precio: 180,
      imagen: '🔧',
      categoria: 'medio'
    },
    {
      nombre: 'RTX 3060',
      descripcion: 'Para jugar en 1080p sin problemas.',
      precio: 329,
      imagen: '🖥️',
      categoria: 'medio'
    },
    {
      nombre: 'Kingston Fury Beast 16GB',
      descripcion: 'Memoria DDR4, buen rendimiento en multitarea.',
      precio: 60,
      imagen: '💾',
      categoria: 'medio'
    }
  ];

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categoriaFiltro: string = 'todos';
  moneda: string = 'USD';
  monedaSimbolo: string = '$';
  monedasDisponibles = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];

  constructor() {
    this.productos = [...this.productosOriginal];
    this.productosFiltrados = [...this.productosOriginal];
  }

  cambiarFiltro(filtro: string) {
    this.categoriaFiltro = filtro;
    this.filtrarProductos();
  }

  cambiarMoneda(moneda: string) {
    this.moneda = moneda;
    this.convertirPrecios(moneda);
  }

  filtrarProductos() {
    if (this.categoriaFiltro === 'todos') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(p => p.categoria === this.categoriaFiltro);
    }
  }

  convertirPrecios(moneda: string) {
    if (moneda === 'USD') {
      this.productos = [...this.productosOriginal];
      this.monedaSimbolo = this.obtenerSimbolo('USD');
      this.filtrarProductos();
      return;
    }

    const url = `https://api.frankfurter.app/latest?from=USD&to=${moneda}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        if (!data || !data.rates || !data.rates[moneda]) {
          console.error(`No se encontró tasa para la moneda ${moneda}`);
          this.restaurarPreciosDefault();
          return;
        }
        const tasa = data.rates[moneda];
        this.productos = this.productosOriginal.map(p => ({
          ...p,
          precio: +(p.precio * tasa).toFixed(2)
        }));
        this.monedaSimbolo = this.obtenerSimbolo(moneda);
        this.filtrarProductos();
      },
      error: (err) => {
        console.error('Error al convertir moneda', err);
        this.restaurarPreciosDefault();
      }
    });
  }

  restaurarPreciosDefault() {
    this.productos = [...this.productosOriginal];
    this.monedaSimbolo = this.obtenerSimbolo('USD');
    this.filtrarProductos();
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

  comprar(producto: Producto) {
    alert(`Simulando compra de: ${producto.nombre} - ${this.monedaSimbolo}${producto.precio}`);
  }

  agregarAlCarrito(producto: Producto) {
    const carritoGuardado = localStorage.getItem('carrito');
    let carrito: any[] = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    const existente = carrito.find(p => p.nombre === producto.nombre);
    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito.`);
  }
}
