import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
}

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  categorias = ['Todos', 'CPU', 'GPU', 'RAM', 'Placa Madre', 'Almacenamiento'];
  categoriaSeleccionada = 'Todos';

  productos: Producto[] = [
    { nombre: 'Ryzen 5 5600X', categoria: 'CPU', stock: 15, precio: 190 },
    { nombre: 'RTX 3060 Ti', categoria: 'GPU', stock: 8, precio: 400 },
    { nombre: 'Corsair Vengeance 16GB', categoria: 'RAM', stock: 20, precio: 75 },
    { nombre: 'ASUS B550', categoria: 'Placa Madre', stock: 10, precio: 120 },
    { nombre: 'Samsung 970 EVO 1TB', categoria: 'Almacenamiento', stock: 12, precio: 110 }
  ];

  get productosFiltrados(): Producto[] {
    if (this.categoriaSeleccionada === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(p => p.categoria === this.categoriaSeleccionada);
  }
}
