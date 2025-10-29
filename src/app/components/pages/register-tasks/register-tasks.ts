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

@Component({
  selector: 'app-register-tasks',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Navbar],
  templateUrl: './register-tasks.html',
  styleUrl: './register-tasks.css',
})
export class RegisterTasks {
  categories = signal<any[]>([]);
  message = signal<string>('');

  formCadastro = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    date: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
  });

  private initialValue = this.formCadastro.value;

  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get(environment.apiCategories).subscribe((response) => {
      this.categories.set(response as any[]);
    });
  }

  registerTask() {
    this.http
      .post(environment.apiTasks, this.formCadastro.value)
      .subscribe({
        next: () => {
          this.formCadastro.reset(this.initialValue);
          this.message.set("Task successfully registered!");
        },
        error: (e) => {
          if (e.status === 0) {
            // Servidor não está respondendo
            this.message.set('Error connecting to the server');
          } else {
            this.message.set('An unexpected error occurred');
          }
        },
      });
  }
}
