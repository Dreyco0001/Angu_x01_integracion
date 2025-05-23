import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  // Datos para Ganancias y Pérdidas
  ventasMeses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  ganancias: number[] = [5000, 7000, 6000, 8000];
  perdidas: number[] = [2000, 3000, 2500, 1000];

  // Datos para Inventario
  productos: string[] = ['GPU', 'CPU', 'RAM', 'SSD'];
  stock: number[] = [20, 15, 30, 10];

  // Función para volver atrás
  volver() {
    window.history.back();
  }

  // Función para exportar PDF simple con tablas
  exportarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Reporte de Ventas y Stock', 14, 20);

    // Ventas y pérdidas
    doc.setFontSize(14);
    doc.text('Ganancias y Pérdidas por mes:', 14, 35);

    const ventasData = [
      ['Mes', 'Ganancias', 'Pérdidas'],
      ...this.ventasMeses.map((mes, i) => [
        mes,
        this.ganancias[i].toString(),
        this.perdidas[i].toString()
      ])
    ];

    this.imprimirTabla(doc, ventasData, 14, 40);

    // Inventario
    doc.text('Inventario por Tipo:', 14, 95);

    const inventarioData = [
      ['Producto', 'Stock'],
      ...this.productos.map((prod, i) => [
        prod,
        this.stock[i].toString()
      ])
    ];

    this.imprimirTabla(doc, inventarioData, 14, 100);

    doc.save('reporte-admin.pdf');
  }

  // Función auxiliar para imprimir tablas básicas
  private imprimirTabla(doc: jsPDF, data: string[][], startX: number, startY: number) {
    const cellWidth = 50;
    const cellHeight = 10;

    data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const x = startX + colIndex * cellWidth;
        const y = startY + rowIndex * cellHeight;

        doc.rect(x, y - cellHeight + 2, cellWidth, cellHeight); // dibuja celda
        doc.text(cell, x + 2, y);
      });
    });
  }
}
