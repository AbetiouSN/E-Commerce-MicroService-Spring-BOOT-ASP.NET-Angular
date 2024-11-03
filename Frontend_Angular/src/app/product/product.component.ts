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
// import { Component } from '@angular/core';
// import { ProductService } from '../Services/product.service';
//
//
// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent {
//   products: any[] = [];
//
//
//
//   constructor(private productService: ProductService) {
//
//   }
//
//
//
//
//   getImage(base64String: string): string {
//     return base64String; // Adjust this if your images are in a different format
//   }
//
//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(
//       (data) => {
//         this.products = data;
//         this.products.forEach(product => {
//           // Initialize each product's selectedImage to the first image
//           product.selectedImage = this.getImage(product.images[0]?.source);
//         });
//       },
//       (error) => {
//         console.error('Error fetching products:', error);
//       }
//     );
//   }
//
//   showImage(product: any, imageSource: string) {
//     product.selectedImage = this.getImage(imageSource); // Update the selected image for the specific product
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../Services/product.service';
// import { AuthService } from '../Services/auth.service'; // Import AuthService
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//
// @Component({
//   selector: 'app-product',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   products: any[] = [];
//   userId: string | null = null; // Variable to hold the user ID
//   pForm: FormGroup; // Declare form group
//
//   constructor(private productService: ProductService, private authService: AuthService, private fb: FormBuilder) {
//     // Initialize form
//     this.pForm = this.fb.group({
//       id: ['', Validators.required],
//       userId: ['', Validators.required] // User ID form control
//     });
//   }
//
//   ngOnInit(): void {
//     // Get user ID from AuthService
//     const user = this.authService.currentUser();
//     this.userId = user ? user.email : null; // Assuming email is used as user ID; adjust as necessary
//
//     this.productService.getProducts().subscribe(
//       (data) => {
//         this.products = data;
//         this.products.forEach(product => {
//           product.selectedImage = this.getImage(product.images[0]?.source);
//         });
//       },
//       (error) => {
//         console.error('Error fetching products:', error);
//       }
//     );
//   }
//
//   getImage(base64String: string): string {
//     return base64String; // Adjust this if your images are in a different format
//   }
//
//   showImage(product: any, imageSource: string) {
//     product.selectedImage = this.getImage(imageSource); // Update the selected image for the specific product
//   }
//
//
//   onSubmit(productId: string): void {
//     console.log('Form submitted with product ID:', productId);
//     console.log('Form valid:', this.pForm.valid); // Vérifiez la validité du formulaire
//     console.log('Form values:', this.pForm.value); // Affichez les valeurs du formulaire
//     if (this.pForm.valid) {
//       // Check if userId is null
//       if (!this.userId) {
//         console.error('User ID is not available. User might not be logged in.');
//         // Optionally show an error message to the user
//         return; // Prevent further execution
//       }
//
//       const cartData = {
//         productId: productId,
//         userId: this.userId // Cela doit correspondre aux noms des propriétés attendues par le backend
//       };
//
//       // Call the service to add the product to the cart
//       this.productService.addToCart(cartData).subscribe(
//         response => {
//           console.log('Product added to cart:', response);
//           // Handle success (e.g., show a success message or update the UI)
//         },
//         error => {
//           console.error('Error adding product to cart:', error);
//           // Handle error (e.g., show an error message)
//         }
//       );
//     }
//   }
//
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  userId: number | null = null; // Variable to hold the user ID
  pForm: FormGroup; // Declare form group

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Initialize form
    this.pForm = this.fb.group({
      id: ['', Validators.required],
      userId: ['', Validators.required] // User ID form control
    });
  }

  ngOnInit(): void {
    // Get user ID from AuthService
    this.authService.userId().subscribe(
      id => {
        this.userId = id; // Store the user ID as a number
        this.pForm.get('userId')?.setValue(this.userId); // Set userId in the form control
      },
      error => {
        console.error('Error fetching user ID:', error);
        this.userId = null; // Set to null if there's an error fetching user ID
      }
    );

    // Fetch products
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.products.forEach(product => {
          product.selectedImage = this.getImage(product.images[0]?.source);
        });
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getImage(base64String: string): string {
    return base64String; // Adjust this if your images are in a different format
  }

  showImage(product: any, imageSource: string) {
    product.selectedImage = this.getImage(imageSource); // Update the selected image for the specific product
  }

  onSubmit(productId: string): void {
    // Set the product ID in the form control
    this.pForm.get('id')?.setValue(Number(productId)); // Ensure the productId is a number

    if (this.pForm.valid) {
      // Ensure userId is not null before proceeding
      if (this.userId === null) {
        console.error('User ID is not available. User might not be logged in.');
        return; // Prevent further execution
      }

      const cartData = {
        productId: Number(productId), // Convert to number
        userId: this.userId // Ensure this is a number
      };

      // Call the service to add the product to the cart
      this.productService.addToCart(cartData).subscribe(
        response => {
          console.log('Product added to cart:', response);
          // Handle success (e.g., show a success message or update the UI)
        },
        error => {
          console.error('Error adding product to cart:', error);
          // Handle error (e.g., show an error message)
        }
      );
    } else {
      console.error('Form is not valid:', this.pForm.value);
    }
  }
}



