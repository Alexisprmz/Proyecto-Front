import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiNode ? `${environment.apiNode}/users` : 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
  }
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, data, { headers: this.getHeaders() });
  }
  requestPasswordChange(email: string, nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password/request`, { email, nombre }, { headers: this.getHeaders() });
  }
  confirmPasswordChange(email: string, code: number, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password/confirm`, { email, code, newPassword }, { headers: this.getHeaders() });
  }
}