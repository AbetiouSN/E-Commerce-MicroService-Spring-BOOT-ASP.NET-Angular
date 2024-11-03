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
  private adToCart = 'http://localhost:8090/api/cart';
  constructor(private http: HttpClient,private authService: AuthService) {}

  getProducts(): Observable<Produit[]> {
    const headers = this.authService.getHeaders();
    return this.http.get<Produit[]>(this.apiUrl, { headers });
  }

  // Update method to accept numbers instead of strings
  addToCart(cartData: { productId: number; userId: number }): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.adToCart}/add`, cartData, { headers }); // Adjust the endpoint as necessary
  }
  addProduct(product: Produit): Observable<Produit> {
    const headers = this.authService.getHeaders();
    return this.http.post<Produit>(`${this.apiUrl}`, product, { headers });
  }
  uploadImages(productId: number, images: string[]): Observable<any> {
    const headers = this.authService.getHeaders();
    return this.http.post(`${this.apiUrl}/${productId}/images`, images,{ headers }); // No need to wrap in an object
  }



}
