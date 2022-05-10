import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.html'],
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
