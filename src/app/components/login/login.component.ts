import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private userAuth: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  errorMessage: string = '';

  onSubmit() {
    const response = this.userAuth.login(this.loginForm.value.email, this.loginForm.value.password);
    if (response.status === 401) {
      this.errorMessage = response.message;
      return;
    }
    this.router.navigate(['']);
  }
}
