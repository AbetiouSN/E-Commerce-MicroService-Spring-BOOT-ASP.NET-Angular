import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from "../Services/product.service";

@Component({
  selector: 'app-ajouter-product',
  templateUrl: './ajouter-product.component.html',
  styleUrls: ['./ajouter-product.component.css']
})
export class AjouterProductComponent {
  pForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.pForm = this.formBuilder.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      prix: [0, [Validators.required, Validators.min(0)]],
      images: [[]] // To hold image strings
    });
  }


  onSubmit(): void {
    if (this.pForm.invalid) {
      return; // Do not proceed if the form is invalid
    }

    const productData = {
      nom: this.pForm.value.nom,
      description: this.pForm.value.description,
      quantity: this.pForm.value.quantity,
      prix: this.pForm.value.prix,
      images: this.pForm.value.images // Assuming you have a way to set this from your image upload logic
    };

    this.productService.addProduct(productData).subscribe(
      (response) => {
        alert('Produit enregistré avec succès.');
        this.router.navigate(['/ajouterimage', response.id]); // Navigate to ajouterimage with the new product ID
      },
      (error) => {
        console.error('Error registering product', error);
      }
    );
  }
}
