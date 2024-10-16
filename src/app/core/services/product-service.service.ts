import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { IProduct } from '../Models/iproduct';
import { map } from 'rxjs/operators';
import { IProudctDetails } from '../Models/IProudctDetails';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private _apiService: ApiServiceService) { }

  private productsSource = new BehaviorSubject<IProduct[]>([]);
  currentProducts = this.productsSource.asObservable();
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSource.asObservable();

  // New method for pagination
  getProductsUsingPagination(pageIndex: number, pageSize: number) {
    return this._apiService.getAll<{
      success: boolean,
      data: {
        items: IProduct[],
        noOfPages: number,
        recordes:number
      },
      message: string
    }>(`Product?pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .pipe(map(res => {
        this.productsSource.next(res.data.items); // Update products in the BehaviorSubject
        return res.data;
      }));
  }

  getAllProducts() {
    return this.productsSource.asObservable(); // Return the BehaviorSubject
  }

  // Other methods...
  getSeller() {
    return this._apiService.getAll<{ success: boolean, data: string[], message: string }>("Product/Seller")
      .pipe(map(res => res.data));
  }

  getBestSellerProducts() {
    return this._apiService.getAll<{ success: boolean, data: IProduct[], message: string }>("Product/BestSeller?size=4")
      .pipe(map(res => res.data));
  }

  getNewArrivalProducts() {
    return this._apiService.getAll<{ success: boolean, data: IProduct[], message: string }>("Product/NewArrival?size=4")
      .pipe(map(res => res.data));
  }

  getProudctDetails(id: number) {
    return this._apiService.getAll<{ success: boolean, data: IProudctDetails, message: string }>(`Product/${id}`)
      .pipe(map(res => res.data));
  }

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  // Filter products by category
  filterByCategory(category: string, products: IProduct[]) {
    if (category === 'All') return products;
    return products.filter(product => product.categoryName === category);
  }

  // Sort products by price
  sortByPrice(order: 'asc' | 'desc', products: IProduct[]) {
    return products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
  }

  // Filter products by price range
  filterByPriceRange(min: number, max: number, products: IProduct[]) {
    return products.filter(product => product.price >= min && product.price <= max);
  }

  resetSearchTerm() {
    this.searchTermSource.next('');
  }
}
