import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navBar.html',
  styleUrls: ['./navBar.scss'],
})
export class NavBarComponent implements DoCheck {
  constructor(private authservice: AuthService) {}

  ngDoCheck(): void {
    this.authTogle = this.authservice.isAuthenticated;
  }
  authTogle: boolean = false;

  signOut() {
    this.authservice.logout();
  }
}
