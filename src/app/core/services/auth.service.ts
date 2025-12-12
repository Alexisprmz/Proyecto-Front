import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiNode ? `${environment.apiNode}/auth` : 'http://localhost:3000/auth';
  private simpleAuthHash = '5f4dcc3b5aa765d61d8327deb882cf99';

  constructor(private http: HttpClient) { }
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'simple': this.simpleAuthHash 
    });

    return this.http.post(`${this.apiUrl}/signup`, userData, { headers });
  }
  
  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'simple': this.simpleAuthHash
    });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  public recoveryEmail: string = ''; 

  sendRecoveryCode(email: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'simple': this.simpleAuthHash });
    return this.http.post(`${this.apiUrl}/recover/code`, { email }, { headers });
  }

  verifyRecoveryCode(email: string, code: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'simple': this.simpleAuthHash });
    return this.http.post(`${this.apiUrl}/recover/verify`, { email, code }, { headers });
  }

  resetPassword(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'simple': this.simpleAuthHash });
    return this.http.post(`${this.apiUrl}/recover/reset`, { email, password }, { headers });
  }
}