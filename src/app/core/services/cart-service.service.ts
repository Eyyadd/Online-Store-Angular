import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { map, Observable } from 'rxjs';
import { CartItems } from '../Models/icart-items';
import { IUpdateCartItem } from '../Models/iupdate-cart-item';
import { ICreateCartItem } from '../Models/icreate-cart-item'; // Adjust the import path accordingly
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartEndpoint = 'Cart'; // Define your API endpoint
  headers:HttpHeaders = {} as HttpHeaders;

  constructor(private apiService: ApiServiceService,private _http:HttpClient) {}

  getCartItems() {
    return this.apiService.getAll<{success:boolean,data:CartItems[],message:string}>(this.cartEndpoint)
    .pipe(map(res=>res.data));
  }

  updateCartItem(updateDto: IUpdateCartItem): Observable<void> {
    return this.apiService.update<void>(`${this.cartEndpoint}/UpdateCartItem`, updateDto);
  }

  removeCartItem(cartItemId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.cartEndpoint}/DeleteCartItem/${cartItemId}`);
  }

  // createCartItem(createDto: ICreateCartItem): Observable<void> {
  //   return this.apiService.post<void>(this.cartEndpoint, createDto);
  // }
  AddToCart(RequestBody:any )
  {
      return this._http.post("https://localhost:44322/api/Cart/AddToCart" , RequestBody,
        {headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        })}
      )
}
}
