import {Image} from "./image.model";

export interface Produit {
  id?: number; // Make id optional
  nom: string;
  description: string;
  quantity: number; // Quantity of the product
  prix: number; // Price of the product
  images: Image[]; // Use the Image interface for images
}
