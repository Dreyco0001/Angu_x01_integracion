import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // IMPORTA EL DIRECTIVE, NO EL MODULE
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], // IMPORTA EL DIRECTIVE
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  ventasChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril'];
  ventasChartData = [
    { label: 'Ganancias', data: [5000, 7000, 6000, 8000], backgroundColor: '#4caf50' },
    { label: 'Pérdidas', data: [2000, 3000, 2500, 1000], backgroundColor: '#f44336' }
  ];
  ventasChartType: ChartType = 'bar';

  productosChartLabels: string[] = ['GPU', 'CPU', 'RAM', 'SSD'];
  productosChartData = [
    { label: 'Stock', data: [20, 15, 30, 10], backgroundColor: ['#2196f3', '#ff9800', '#9c27b0', '#009688'] }
  ];
  productosChartType: ChartType = 'doughnut';

  exportarPDF() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      html2canvas(dashboard).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('reporte-ventas.pdf');
      });
    }
  }
}
