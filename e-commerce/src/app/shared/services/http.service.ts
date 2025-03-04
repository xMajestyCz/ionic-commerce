import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getProductsList(): Observable<any> {
    return this.http.get(`${this.apiUrl}products`).pipe(
      tap(data => console.log('Productos obtenidos:', data)),
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('Error en la API'));
      })
    );
  }

  getProductDetails(id: number){
    return this.http.get(`${this.apiUrl}products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}products/categories`).pipe(
      tap(data => console.log('Categorías obtenidas:', data)),
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return throwError(() => new Error('Error en la API'));
      })
    );
  }

  getProductById(id: string) {
    return this.http.get(`${this.apiUrl}products/${id}`);
  }
}
