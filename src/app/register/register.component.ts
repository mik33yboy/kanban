import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RegistrationResponse {
  success?: string;
  error?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const registrationData = {
      email: this.email,
      password: this.password
    };

    this.http.post<RegistrationResponse>('http://localhost/chatmeyt/php/register/register.php', registrationData).subscribe(
      response => {
        console.log('Registration successful:', response);
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          console.error('Registration error:', response.error);
        }
      },
      error => {
        console.error('Registration HTTP error:', error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
