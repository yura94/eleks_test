import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from "src/app/Services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.container.scss']
})
export class LoginComponent{
    constructor(private userAuth : AuthService){}
    loginForm = new FormGroup({
        'email': new FormControl(null, [Validators.required , Validators.email]),
        'password': new FormControl(null, [Validators.required , Validators.minLength(6)]),
      });

      onSubmit(){
        this.userAuth.login(this.loginForm.value.email , this.loginForm.value.password)     
      }

}