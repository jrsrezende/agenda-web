import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Navbar } from '../../shared/navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-tasks',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './search-tasks.html',
  styleUrl: './search-tasks.css',
})
export class SearchTasks {
  tasks = signal<any[]>([]);

  private router = inject(Router);
  private http = inject(HttpClient);

  formConsulta = new FormGroup({
    minDate: new FormControl('', [Validators.required]),
    maxDate: new FormControl('', [Validators.required]),
  });

  searchTasks() {
    const dataMin = this.formConsulta.value.minDate;
    const dataMax = this.formConsulta.value.maxDate;
    this.http.get(environment.apiTasks + '/' + dataMin + '/' + dataMax).subscribe({
      next: (response) => {
        this.tasks.set(response as any[]);
      },
    });
  }

  editTask(item: any): void {
    this.router.navigate(['/pages/edit-tasks', item.id], {
      queryParams: {
        taskName: item.name,
        taskDate: item.date,
        taskPriority: item.priority,
        taskCategory: item.categoryId,
        taskFinished: item.finished
      },
    });
  };

  deleteTask(id: string) {
    if (confirm('Do you really want to delete the task?')) {
      this.http.delete(environment.apiTasks + '/' + id, { responseType: 'text' }).subscribe({
        next: (response) => {
          alert(response);
          this.searchTasks();
        },
      });
    };
  };
}
