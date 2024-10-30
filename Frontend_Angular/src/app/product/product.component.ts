import { Component } from '@angular/core';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css' ]// Change here to styleUrls
})
export class ProductComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  getImage(base64String: string): string {
    return `${base64String}`; // Adjust this if your images are in a different format
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }
}
