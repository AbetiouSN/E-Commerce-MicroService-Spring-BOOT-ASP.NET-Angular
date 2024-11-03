import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'; // Assure-toi que le chemin est correct
import { ProductService } from './Services/product.service';
import { AjouterProductComponent } from './ajouter-product/ajouter-product.component';
import { AjouterImageComponent } from './ajouter-image/ajouter-image.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AjouterProductComponent,
    AjouterImageComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarUserComponent,
    FooterComponent,
    CartComponent
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
