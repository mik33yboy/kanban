import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost/chatmeyt/php'; // Base URL for the PHP scripts

  constructor(private http: HttpClient) { }

  // Method to register a new user
  register(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register/register.php`;
    const body = { email, password };
    return this.http.post<any>(url, body, this.getHttpOptions());
  }

  // Method to log in a user (example, you might need to adjust this according to your login.php)
  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login/login.php`;
    const body = { email, password };
    return this.http.post<any>(url, body, this.getHttpOptions());
  }

  // Helper method to set HTTP options
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
