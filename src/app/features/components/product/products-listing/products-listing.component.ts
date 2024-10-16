import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ProductServiceService } from '../../../../core/services/product-service.service';
import { CategoryService } from '../../../../core/services/category.service';
import { IProduct } from '../../../../core/Models/iproduct';
import { ICCategory } from '../../../../core/Models/icategory';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductCardComponent } from "../../../../shared/components/product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule, MatSliderModule, ProductCardComponent],
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.css']
})
export class ProductsListingComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  pagedProducts: IProduct[] = [];
  categories: ICCategory[] = [];
  selectedCategory: string = 'All';
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize: number = 10; // Default page size
  currentPage: number = 0;
  noProductsFound: boolean = false;
  searchTerm: string = '';
  totalProducts: number = 0; // Track the total number of products in the database
    // Update or add these properties
    minPrice: number = 0;
    maxPrice: number = 1000;
    currentMinPrice: number = 0;
    currentMaxPrice: number = 1000;

  constructor(
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to query parameters for category and search filters
    this._route.queryParams.subscribe(params => {
      const category = params['category'];
      const search = params['search'];

      this.selectedCategory = category ? category : 'All';
      this.searchTerm = search ? search : '';
      this.loadProducts(); // Initial product load
    });

    // Fetch categories
    this.categoryService.getAllCategories().subscribe((categories: ICCategory[]) => {
      this.categories = categories;
    });
  }

  loadProducts(): void {
    // Fetch products with pagination
    this.productService.getProductsUsingPagination(this.currentPage, this.pageSize).subscribe(data => {
      this.products = data.items;
      this.totalProducts = data.recordes; // Total products in database
      this.applyFilters(); // Apply filters after loading products
    });

    this.productService.getProductsUsingPagination(0, 1000).subscribe(data => {
      if (data.items.length > 0) {
        const prices = data.items.map(p => p.price);
        this.minPrice = Math.min(...prices);
        this.maxPrice = Math.max(...prices);
        this.currentMinPrice = this.minPrice;
        this.currentMaxPrice = this.maxPrice;
      }
    });
  }

    // Update the applyFilters method
    applyFilters(): void {
      let filtered = this.products;
  
      if (this.selectedCategory !== 'All') {
        filtered = this.productService.filterByCategory(this.selectedCategory, filtered);
      }
  
      // Update price range filter
      filtered = filtered.filter(product => 
        product.price >= this.currentMinPrice && product.price <= this.currentMaxPrice
      );
  
      if (this.searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
  
      filtered = this.productService.sortByPrice(this.sortOrder, filtered);
  
      this.filteredProducts = filtered;
      this.noProductsFound = filtered.length === 0;
      this.totalProducts = this.filteredProducts.length;
      this.currentPage = 0;
      this.updatePagedProducts();
    }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 0; // Reset current page when category changes
    this.loadProducts(); // Reload products when category changes
  }

  onSortOrderChange(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.applyFilters();
  }

  onPriceRangeChange(): void {
    this.applyFilters();
  }

  onSearchTermChange(): void {
    this.applyFilters();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // Update current page from paginator
    this.pageSize = event.pageSize; // Update page size from paginator
    this.updatePagedProducts(); // Update the displayed products
  }

  updatePagedProducts(): void {
    // Calculate start and end index for current page
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Slice filtered products to get paged products
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);

    // Handle empty paged products
    if (this.pagedProducts.length === 0 && this.currentPage > 0) {
      // If there are no products, reset to the previous page
      this.currentPage--;
      this.updatePagedProducts(); // Update again to get the correct products for the previous page
    }
  }
}
