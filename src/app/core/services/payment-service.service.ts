import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private _apiService:ApiServiceService) { }

  createOrUpdatePaymentIntent(): Observable<any> {
    return this._apiService.getAll(`Payment`);
  }

  createOrder(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this._apiService.post(`/CreateOrder`, {headers});
  }
}
