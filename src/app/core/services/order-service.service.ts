import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { map, Observable } from 'rxjs';
import { IOrder } from '../Models/iorder';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private _apiService:ApiServiceService) { }

  getOrders(): Observable<IOrder[]> {
    return this._apiService.getAll<IOrder[]>("Orders").pipe(
      map(orders => {
        // Process orders if needed before returning
        orders.forEach(order => {
          console.log(`Product: ${order.productName}, Price: ${order.price}, Address: ${order.address}, Quantity: ${order.quantity}`);
          // Add more processing logic here if needed
        });
        return orders; // Return the processed orders
      })
    );
  }

}
