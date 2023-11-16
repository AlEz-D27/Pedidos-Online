import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';
import { LoginService } from './login.service';
import { RegistroRequest } from './registro-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRightPanelActive: boolean = false;
  

  constructor(private authService: AuthService, private router: Router,private loginService: LoginService, private cookieService : CookieService ) {}

  onSignInClick(): void {
    this.isRightPanelActive = false;
    this.onSubmit;
  }

  onSignUpClick(): void {
    this.isRightPanelActive = true;
    this.onSubmit;
  }

  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>();

  usuario : Usuario = new Usuario(); 
  registroRequest : RegistroRequest = new RegistroRequest();
  
  onSubmit(): void {
    // You can handle the login logic here
    if (this.isRightPanelActive) {
        this.registrar();
    } else {
      if (this.usuario.email === 'admin@gmail.com' && this.usuario.password === '1234') {
        console.log('Login successful');
        this.status.emit(true); // Emit true when login is successful
        this.router.navigate(['/menu']); // Navigate to MenuComponent after 
      } else {
        console.log('Invalid credentials. Please try again.');
        this.status.emit(false); // Emit false when login fails
      }
    }
  }
  registrar() {
    console.log("Este registrar funciona");
    this.loginService.registrar(this.registroRequest).subscribe({
      next: (response: any) => {
        console.log('response', response);
  
        // Almacena el token en localStorage
        this.cookieService.set('token', response.token);
  
        // Procesa el token decodificado
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.token);
        console.log('Claims del Token:', decodedToken);
        const token = localStorage.getItem('token');
        console.log(decodedToken);

        console.log(response.token);
        console.log(decodedToken.userId);
        console.log(decodedToken.userCorreo);
        console.log(decodedToken.userNombre);
        console.log(decodedToken.userApellido);
        console.log(decodedToken.userEdad);
        console.log('Rol:', this.registroRequest.roles);
        console.log('Directly entering the menu');
        this.authService.setUserRole(this.registroRequest.roles);
        this.status.emit(true); // Emit true when login panel is active
      },
      error: (error: any) => {
        console.error('Error al registrar:', error);
        // Manejar el error, si es necesario
      }
    });
  }
  

  
}
