import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceService {

  constructor(private _apiService:ApiServiceService) { }

  retrieveAllWishListItems(){
    this._apiService.getAll<{}>
  }
}
