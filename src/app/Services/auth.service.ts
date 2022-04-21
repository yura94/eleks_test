import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}

  private readonly users: readonly User[] = [
    {
      name: 'Yura',
      surname: 'Lenko',
      email: 'Yura.lenko@gmail.com',
      password: '123456',
    },
    {
      name: 'Vasyl',
      surname: 'Lenko',
      email: 'Vasyl.lenko@gmail.com',
      password: '1234567',
    },
    {
      name: 'Ostap',
      surname: 'Lenko',
      email: 'Ostap.lenko@gmail.com',
      password: '12345678',
    },
  ];

  private findUser(email: string, password: string): User | undefined {
    return this.users.find(
      user => user.email === email && user.password === password
    );
  }

  login(email: string, password: string): { status: number; message: string } {
    if (!this.users.find(user => user.email === email)) {
      return { status: 401, message: 'Incorrect email' };
    }
    const user = this.findUser(email, password);
    if (!user) {
      return { status: 401, message: 'Incorrect password' };
    }
    this.autentifacate(user);
    return { status: 200, message: 'OK' };
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  get user(): User | null {
    const user: string | null = localStorage.getItem('userData');
    if (user === null) {
      return null;
    }
    return JSON.parse(user);
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['']);
  }

  private autentifacate(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
