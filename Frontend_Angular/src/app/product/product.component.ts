// import { Component } from '@angular/core';
// import { ProductService } from '../Services/product.service';
//
// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css' ]// Change here to styleUrls
// })
// export class ProductComponent {
//   products: any[] = [];
//
//   constructor(private productService: ProductService) {}
//
//   getImage(base64String: string): string {
//     return `${base64String}`; // Adjust this if your images are in a different format
//     // return `data:image/jpeg;base64,${base64String}`;
//   }
//
//
//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(
//       (data) => {
//         this.products = data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des produits :', error);
//       }
//     );
//   }
// }
import { Component } from '@angular/core';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  getImage(base64String: string): string {
    return base64String; // Adjust this if your images are in a different format
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.products.forEach(product => {
          // Initialize each product's selectedImage to the first image
          product.selectedImage = this.getImage(product.images[0]?.source);
        });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  showImage(product: any, imageSource: string) {
    product.selectedImage = this.getImage(imageSource); // Update the selected image for the specific product
  }
}


