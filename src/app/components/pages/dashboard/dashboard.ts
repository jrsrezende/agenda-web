import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private http = inject(HttpClient);

  columnChart = signal<Chart | null>(null);
  donutChart = signal<Chart | null>(null);

  ngOnInit() {
    this.http.get(environment.apiTasks + "/groupby-priority").subscribe((response) => {

      const categories: string[] = [];
      const values: number[] = [];

      (response as any[]).forEach(item => {
        categories.push(item.priority);
        values.push(item.tasksQuantity);
      });

      this.columnChart.set(new Chart({
        chart: { type: 'column' },
        title: { text: 'Number of tasks by priority' },
        subtitle: { text: 'Task count in the agenda separated by priority.' },
        xAxis: {
          categories: categories,
          crosshair: true,
          title: { text: 'Task Priority' }
        },
        yAxis: {
          min: 0,
          title: { text: 'Quantity' }
        },
        plotOptions: {
          column: {
            borderRadius: 5,
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{ name: 'Tasks', type: 'column', data: values }],
        legend: { enabled: false },
        credits: { enabled: false }
      }));
    });

    this.http.get(environment.apiTasks + "/groupby-category").subscribe((response) => {

      const content: any[] = [];
      (response as any[]).forEach(item => {
        content.push([item.categoryName, item.tasksQuantity]);
      });

      this.donutChart.set(new Chart({
        chart: { type: 'pie' },
        title: { text: 'Number of tasks by category' },
        subtitle: { text: 'Task count in the agenda separated by category.' },
        plotOptions: {
          pie: {
            innerSize: '50%',
            dataLabels: { enabled: true }
          }
        },
        series: [{ data: content, type: 'pie', name: 'Tasks' }],
        legend: { enabled: false },
        credits: { enabled: false },
      }));
    });
  }
}
