import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { ICCategory } from '../Models/icategory';
import { map } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { CategoryAdmin } from '../Models/category-admin';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _apiService:ApiServiceService) { }

  getAllCategories(){
    return this._apiService.getAll<{success:boolean,data:ICCategory[],message:string}>("Categories/GetAll")
    .pipe(map(res=>res.data));
  }

  getAllCategory()
  {
    return this._apiService.getAll<{ success: boolean, data: CategoryAdmin[], message: string }>("Categories/GetAll").pipe(
      map(res => res.data)
    )
  }

  getAllProductsByCategoryType(type:string){
    return this ._apiService.getAll<{success:boolean,data:IProduct[],message:string}>(`Product/GetByCategoryType?categoryType=${type}`)
    .pipe(map(res=>res.data));
  }
}
