import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {AjouterImageComponent} from "./ajouter-image/ajouter-image.component";
import {AjouterProductComponent} from "./ajouter-product/ajouter-product.component";

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Pas de slash ici
  { path: 'products', component: ProductComponent },
  {path: 'ajouterProduct', component: AjouterProductComponent},
  {path: 'ajouterimage/:id', component: AjouterImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
