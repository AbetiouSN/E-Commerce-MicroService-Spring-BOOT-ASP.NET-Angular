import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {AjouterImageComponent} from "./ajouter-image/ajouter-image.component";
import {AjouterProductComponent} from "./ajouter-product/ajouter-product.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {NavbarUserComponent} from "./navbar-user/navbar-user.component";
import {FooterComponent} from "./footer/footer.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register',component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'navbaruser' , component: NavbarUserComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'products', component: ProductComponent },
  { path: 'ajouterProduct', component: AjouterProductComponent},
  { path: 'ajouterimage/:id', component: AjouterImageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
