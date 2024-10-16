import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { ILogin } from '../Models/ilogin';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import { Router } from '@angular/router'; // Import Router service for navigation
import { IRegister } from '../Models/IRegister';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userAuthBehaviorSubject: BehaviorSubject<boolean>;

  constructor(
    private _apiService: ApiServiceService,
    private router: Router, // Inject Router for redirection
    private http:HttpClient
  ) {
    // Check if the token exists in either localStorage or sessionStorage
    const tokenExists = !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
    this.userAuthBehaviorSubject = new BehaviorSubject<boolean>(tokenExists);
  }

  // Login method with "Remember Me" logic and token decoding
  login(loginData: ILogin, rememberMe: boolean): Observable<boolean> {
    return this._apiService.post<any>(`${environment.baseURL}Account/Login`, loginData).pipe(
      map(response => {
        if (response.success) {
          const token = response.data.token;

          // Store token in localStorage if "Remember Me" is checked, otherwise use sessionStorage
          if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', response.data.validTo);
          } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokenExpiration', response.data.validTo);
          }

          // Decode the token
          const decodedToken = this.decodeToken(token);
          console.log('Decoded Token:', decodedToken);

          // Extract role and redirect accordingly
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          console.log(role);
          
          this.redirectBasedOnRole(role);

          this.userAuthBehaviorSubject.next(true);
          return true;
        }

        this.userAuthBehaviorSubject.next(false);
        return false;
      })
    );
  }

  // Method to decode JWT and return the decoded payload
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token provided:', error);
      return null;
    }
  }

  // Redirect the user based on their role
  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/RetrieveOwners']);
        break;
      case 'Owner':
        this.router.navigate(['/Admin']);
        break;
      case 'Customer':
        this.router.navigate(['/Home']);
        break;
      default:
        this.router.navigate(['/Home']);
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return token != null;
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');

    this.userAuthBehaviorSubject.next(false);
  }

  // Expose the BehaviorSubject as an Observable for components to subscribe to
  getUserAuthBehaviorSubject(): BehaviorSubject<boolean> {
    return this.userAuthBehaviorSubject;
  }

  Register(RegisterForm: IRegister): Observable<any> {
    return this.http.post<any>("https://localhost:44322/api/Account/Register", RegisterForm).pipe(
      map(response => {
        return response;
      })
    );
  }
}
