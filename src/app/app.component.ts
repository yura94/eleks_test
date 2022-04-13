import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService){}
  authTogle:boolean = true
  ngOnInit(): void {
    this.authTogle = this.authservice.isAuthenticated
  }

  signOut(){
    this.authservice.logout()
  }
}
