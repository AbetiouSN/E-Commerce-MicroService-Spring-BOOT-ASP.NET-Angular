import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Models/user.model";
import {Customer} from "../Models/customer.model";
import {catchError, map, Observable, throwError} from "rxjs";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | undefined;
  headers: HttpHeaders = new HttpHeaders();
  token: string = '';
  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
     this.headers=this.getHeaders();
     this.token=this.getToken();
  }


  registerClient(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/register-client`, customer);
  }



  login(credentials: { email: string; password: string }): Observable<any> {
    const loginUrl = `${this.apiUrl}/authenticate`;

    return this.http.post<any>(loginUrl, credentials).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('JwtToken', JSON.stringify(response.token));
        }
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('JwtToken');
  }

  getToken(): string {
    return JSON.parse(localStorage.getItem('JwtToken') || 'null');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUser();
    return !!currentUser && currentUser.role === role;
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  currentUser(): User | null {
    if (this.getToken()) {
      const tokenPayload: any = jwtDecode(this.getToken());
      if (tokenPayload) {
        const user: User = {
          role: tokenPayload.role[0].authority,
          email: tokenPayload.sub,
          password: ''
        };
        return user;
      }
    }
    return null;
  }

  autoLogout(dateExpiration: number): void {
    setTimeout(() => {
      this.logout();
    }, dateExpiration);
  }
}

