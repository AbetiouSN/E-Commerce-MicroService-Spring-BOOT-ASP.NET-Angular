import { Component } from '@angular/core';
import { Image } from "../Models/image.model";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from "../Services/product.service";

@Component({
  selector: 'app-ajouter-image',
  templateUrl: './ajouter-image.component.html',
  styleUrls: ['./ajouter-image.component.css']
})
export class AjouterImageComponent {
  sections: Image[] = [{ source: "" }];
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
  }

  onImageUpload(event: any, sectionIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      const file: File = input.files[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result; // This now includes the 'data:image/jpeg;base64,' prefix
        this.sections[sectionIndex].source = base64Image; // Directly assign the full result
      };
      reader.readAsDataURL(file);
    }
  }

  submitAndAddImage(): void {
    this.sections.push({ source: "" });
  }

  onSubmit(): void {
    const images = this.sections.map(section => section.source);

    this.productService.uploadImages(this.productId, images).subscribe(
      () => {
        alert('Images ajoutées avec succès.');
        this.router.navigate(['/']); // Ensure this points to your main page
      },
      (error) => {
        console.error('Error uploading images', error);
        alert('Une erreur est survenue lors de l\'ajout des images.'); // Show an error alert
      }
    );
  }
}
