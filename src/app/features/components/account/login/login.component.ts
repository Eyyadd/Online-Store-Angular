import { Component } from '@angular/core';
import { AuthServiceService } from '../../../../core/services/auth-service.service';
import { ILogin } from '../../../../core/Models/ilogin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false; // "Remember Me" checkbox
  errorMessage: string = '';

  constructor(private _authService: AuthServiceService) {}

  // Handle the login action
  login() {
    if (this.username && this.password) {
      const loginData: ILogin = { userName: this.username, password: this.password };

      this._authService.login(loginData, this.rememberMe).subscribe(
        success => {
          if (!success) {
            this.errorMessage = 'Login failed. Please check your credentials.';
          }
        },
        error => {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
}
