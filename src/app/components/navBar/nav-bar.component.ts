import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { observable, Observable, startWith, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.html'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  constructor(private authservice: AuthService, public ref: ChangeDetectorRef) {}
  public isAuthenticated$?: Observable<boolean>;
  ngOnInit(): void {
    this.isAuthenticated$ = this.authservice.source$.pipe(tap(e => console.log(e)));
  }

  signOut() {
    this.authservice.logout();
  }
}
