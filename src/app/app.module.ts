import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module'; // Import the AppRoutingModule

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './Interceptors/auth-interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AgregarProductosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // Include the AppRoutingModule here
    RouterModule,
     HttpClientModule
  ],
  providers: [
    CookieService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
