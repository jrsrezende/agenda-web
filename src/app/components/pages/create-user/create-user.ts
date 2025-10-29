import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser {
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  private http = inject(HttpClient);

  formCreate = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.requiredTrue]),
  });

  createUser() {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.formCreate.value.password != this.formCreate.value.confirmPassword) {
      this.errorMessage.set('The passwords do not match');
      return;
    }

    this.http.post(environment.apiUsers + '/create', this.formCreate.value).subscribe({
      next: () => {
        this.successMessage.set('Your account has been created successfully');
        this.formCreate.reset();
      },
      error: (e) => {
        if (e.status === 0) {
          this.errorMessage.set('Error connecting to the server'); // Servidor não está respondendo
        } else if (e.error && e.error.message) {
          this.errorMessage.set(e.error.message); // Servidor não está respondendo
        } else {
          this.errorMessage.set('An unexpected error occurred'); // Fallback
        }
      },
    });
  }
}
