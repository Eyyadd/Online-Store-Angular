import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _httpClient:HttpClient) { }

  getAll<T>(endPoint:string,size?:number):Observable<T>{
    const headers = this.createHeaders();
    return this ._httpClient.get<T>(`${environment.baseURL}${endPoint}`,{ headers });
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');  // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
    });
  
    return this._httpClient.post<T>(endPoint, body, { headers });
  }

  update<T>(endPoint: string, body: any): Observable<T> {
    const headers = this.createHeaders();
    return this._httpClient.put<T>(`${environment.baseURL}${endPoint}`, body, { headers });
  }

  delete<T>(endPoint: string): Observable<T> {
    const headers = this.createHeaders();
    return this._httpClient.delete<T>(`${environment.baseURL}${endPoint}`, { headers });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');  // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
    });
  }

  
}
