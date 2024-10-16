import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthServiceService } from '../../../core/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductServiceService } from '../../../core/services/product-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogged!: boolean;
  searchTerm: string = '';

  constructor(private _authService: AuthServiceService, private _router: Router, private _productService:ProductServiceService) {}

  ngOnInit(): void {
    // Subscribe to the authentication state from the BehaviorSubject
    this._authService.getUserAuthBehaviorSubject().subscribe({
      next: (status) => {
        this.isLogged = status;
      }
    });

    // Ensure the state is updated on component initialization (useful for page refresh)
    this.isLogged = this._authService.isAuthenticated();

    this._productService.currentSearchTerm.subscribe((term=> {this.searchTerm = term}))
  }

  logOut(): void {
    this._authService.logout();
    this._router.navigate(['/Login']);
  }

  updateSearchTerm(searchTerm: string): void {
    this._productService.updateSearchTerm(searchTerm); // Update the search term in the service

    // Navigate to the products page with the search term as a query parameter
    if (searchTerm) {
      this._router.navigate([`/Products/${searchTerm}`], { queryParams: { search: searchTerm } });
    }
  }
}
