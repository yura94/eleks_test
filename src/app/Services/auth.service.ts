import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

   private readonly users: readonly User[] = [ 
    { name: "Yura", surname: "Lenko" , email: 'Yura.lenko@gmail.com', password: '123456' },
    { name: "Vasyl", surname: "Lenko" , email: 'Vasyl.lenko@gmail.com', password: '1234567'  },
    { name: "Ostap", surname: "Lenko" , email: 'Ostap.lenko@gmail.com', password: '12345678'  },  
  ];

  private currentUser: User | null = null;

  private findUser(email: string , password:string): User | undefined{
    return this.users.find(
        user =>user.email === email && user.password === password 
    ) 
  }

  login(email: string , password:string): boolean{
    const user = this.findUser(email, password);
    if(user){
         this.authenticate(user);
         this.router.navigate([''])
         return true; 
    } else{
        return false;
    }
  }

  get isAuthenticated(): boolean {
     return this.currentUser !== null 
  }

  get user(): User | null{
      return this.currentUser
  }

  logout(): void{
      this.currentUser = null;
      this.router.navigate([''])
  }

  private authenticate(user: User): void{
      this.currentUser = user;
  }
}
