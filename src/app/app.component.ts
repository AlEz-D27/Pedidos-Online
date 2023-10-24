import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin: boolean = true;
  isLoggedIn: boolean = false;

  updateLoginStatus(status: boolean) {
    this.isLoggedIn = status;
    this.showLogin = !status; // Hide the login component if the user is logged in
  }
}