import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';
import { LoginService } from './login.service';
import { RegistroRequest } from './registro-request';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRightPanelActive: boolean = false;

  constructor(private authService: AuthService) {}

  onSignInClick(): void {
    this.isRightPanelActive = false;
    this.onSubmit();
  }

  onSignUpClick(): void {
    this.isRightPanelActive = true;
    this.onSubmit();
  }

  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>();

  usuario : Usuario = new Usuario(); 
  registroRequest : RegistroRequest = new RegistroRequest();
  private loginService: LoginService;
  onSubmit(): void {
    // You can handle the login logic here
    if (this.isRightPanelActive) {
        this.registrar();
    } else {
      if (this.usuario.email === 'admin@gmail.com' && this.usuario.password === '1234') {
        console.log('Login successful');
        this.status.emit(true); // Emit true when login is successful
      } else {
        console.log('Invalid credentials. Please try again.');
        this.status.emit(false); // Emit false when login fails
      }
    }
  }
  registrar(){
    
    
    this.guardarToken(this.registroRequest)
    const token = localStorage.getItem('token')
    if (token != null){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);

      // Ahora, 'decodedToken' contiene los datos del token decodificado
      console.log(decodedToken.userId);
      console.log(decodedToken.userCorreo);
      console.log(decodedToken.userNombre);
      console.log(decodedToken.userApellido);
      console.log(decodedToken.userEdad)
      console.log('Rol:', this.registroRequest.roles);
      console.log('Directly entering the menu');
      this.authService.setUserRole(this.registroRequest.roles);
      this.status.emit(true); // Emit true when login panel is active
    }
    
  }
  guardarToken(registroRequest: RegistroRequest){
    this.loginService.registrar(registroRequest).subscribe(
      (token: string) => {
        // Almacena el token en localStorage
        localStorage.setItem('token', token);
    
        // Otras acciones después de registrar (si es necesario)
      },
      (error) => {
        // Maneja el error, si lo hay
        console.error('Error al registrar:', error);
      }
    );
    

  }
  
}
