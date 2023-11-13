import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

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
    this.onSubmit;
  }

  onSignUpClick(): void {
    this.isRightPanelActive = true;
    this.onSubmit;
  }

  @Output() status: EventEmitter<boolean> = new EventEmitter<boolean>();

  nombre: string = '';
  apellido: string = '';
  edad: number;
  rol: string = '';
  email: string = '';
  password: string = '';

  onSubmit(): void {
    // You can handle the login logic here
    if (this.isRightPanelActive) {
      console.log('Rol:', this.rol);
      console.log('Directly entering the menu');
      this.authService.setUserRole(this.rol);
      this.status.emit(true); // Emit true when login panel is active
    } else {
      if (this.email === 'admin@gmail.com' && this.password === '1234') {
        console.log('Login successful');
        this.status.emit(true); // Emit true when login is successful
      } else {
        console.log('Invalid credentials. Please try again.');
        this.status.emit(false); // Emit false when login fails
      }
    }
  }

}
