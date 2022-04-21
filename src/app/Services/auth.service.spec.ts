import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RouterMock {
  navigate(a: string[]) {}
}

describe('authService', () => {
  let service: AuthService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthService, { provide: Router, useClass: RouterMock }],
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('if is incorect email, message mast ruturn incorect email', () => {
    let response = service.login('email', 'password');
    expect(response.status).toBe(401);
    expect(response.message).toBe('Incorrect email');
  });

  it('if is incorect email, message mast ruturn incorect passwor', () => {
    let response = service.login('Yura.lenko@gmail.com', 'password');
    expect(response.status).toBe(401);
    expect(response.message).toBe('Incorrect password');
  });

  it('if is correct email and password', () => {
    let response = service.login('Yura.lenko@gmail.com', '123456');
    expect(response.status).toBe(200);
    expect(response.message).toBe('OK');
  });

  it('if user logout, isAuthenticated user must be null', () => {
    let spy = spyOn(router, 'navigate');
    service.login('Yura.lenko@gmail.com', '123456');
    expect(service.isAuthenticated).toBeTruthy();
    service.logout();
    expect(service.isAuthenticated).not.toBeTruthy();
    expect(spy).toHaveBeenCalledOnceWith(['']);
  });

  it('if user login, should return currentUser data', () => {
    service.login('Yura.lenko@gmail.com', '123456');
    expect(service.user).toEqual({
      name: 'Yura',
      surname: 'Lenko',
      email: 'Yura.lenko@gmail.com',
      password: '123456',
    });
  });
});
