import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'; // Assure-toi que le chemin est correct
import { ProductService } from './Services/product.service';
import { AjouterProductComponent } from './ajouter-product/ajouter-product.component';
import { AjouterImageComponent } from './ajouter-image/ajouter-image.component';
import {ReactiveFormsModule} from "@angular/forms"; // Assure-toi que le chemin est correct

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AjouterProductComponent,
    AjouterImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService], // Assure-toi que ProductService est ajouté ici si nécessaire
  bootstrap: [AppComponent]
})
export class AppModule { }
