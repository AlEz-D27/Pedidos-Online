import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', component: LoginComponent }, // Set the root path to the LoginComponent
  { path: 'app', component: AppComponent },
  {path:"productos", component:AgregarProductosComponent},
  {path:"", redirectTo:"/productos", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
