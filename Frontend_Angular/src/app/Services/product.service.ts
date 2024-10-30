import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../Models/product.model';
import {AuthService} from "./auth.service"; // Adjust the import according to your project structure

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5281/api/Products'; // Ensure this matches your backend API

  constructor(private http: HttpClient,private authService: AuthService) {}

  getProducts(): Observable<Produit[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Produit[]>(this.apiUrl, { headers });
  }


  addProduct(product: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}`, product);
  }
  uploadImages(productId: number, images: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/images`, images); // No need to wrap in an object
  }


}
