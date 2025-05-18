import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  productos: Producto[] = [
    {
      nombre: 'Ryzen 7 5800X',
      descripcion: 'Procesador 8 núcleos, 16 hilos para alto rendimiento.',
      precio: 299,
      imagen: 'https://m.media-amazon.com/images/I/61vXq8F6fDL._AC_SL1000_.jpg'
    },
    {
      nombre: 'RTX 4070',
      descripcion: 'Tarjeta gráfica para gaming 2K/4K con Ray Tracing.',
      precio: 599,
      imagen: 'https://m.media-amazon.com/images/I/71l2iBSyywL._AC_SL1500_.jpg'
    },
    {
      nombre: 'Corsair Vengeance 32GB',
      descripcion: '2x16GB DDR4 3200MHz, ideal para multitarea y gaming.',
      precio: 125,
      imagen: 'https://m.media-amazon.com/images/I/71PbZGcMGkL._AC_SL1500_.jpg'
    },
    {
      nombre: 'SSD NVMe 1TB',
      descripcion: 'Samsung 980 PRO, velocidades altísimas de lectura/escritura.',
      precio: 139,
      imagen: 'https://m.media-amazon.com/images/I/71YHfvdpTjL._AC_SL1500_.jpg'
    }
  ];

  comprar(producto: Producto) {
    alert(`Simulando compra de: ${producto.nombre} - $${producto.precio}`);
  }
}
