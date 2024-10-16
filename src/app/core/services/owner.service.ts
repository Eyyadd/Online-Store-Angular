import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl='https://localhost:44322/api/Owner/GetAllOwners';
  constructor(private http:HttpClient) { }

  getOwners(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
