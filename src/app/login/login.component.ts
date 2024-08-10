import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from '../api.service'; // Import the ApiService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiService.login(this.email, this.password)
      .pipe(
        tap(response => {
          if (response.success) {
            this.router.navigate(['/chat']);
          } else {
            this.showError = true;
            this.errorMessage = response.message || 'Login failed';
          }
        }),
        catchError(error => {
          this.showError = true;
          this.errorMessage = 'Login failed due to an error';
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed'));
        })
      )
      .subscribe();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
