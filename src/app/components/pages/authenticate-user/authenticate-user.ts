import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-authenticate-user',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './authenticate-user.html',
  styleUrl: './authenticate-user.css'
})
export class AuthenticateUser {
  errorMessage = signal<string>('');

  private http = inject(HttpClient);
  private router = inject(Router)

  formAuthentication = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  authenticateUser() {
    this.http.post(environment.apiUsers + '/authenticate', this.formAuthentication.value).subscribe({
      next: (response) => {
        sessionStorage.setItem('auth', JSON.stringify(response));
        this.router.navigate(['/pages/dashboard']);
      },
      error: (e) => {this.errorMessage.set(e.error.error)}
    });
  }
}
