import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';

class MockUserService {
  login(email: string, password: string) {}
}

class RouterMock {
  navigate(a: string[]) {}
}

describe('Login Components', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authservice: AuthService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockUserService },
        { provide: Router, useClass: RouterMock },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authservice = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });
  it('check email input to exist', () => {
    let email = fixture.debugElement.query(By.css('#email'));
    expect(email).toBeTruthy();
  });

  it('check password input to exist', () => {
    let password = fixture.debugElement.query(By.css('#password'));
    expect(password).toBeTruthy();
  });

  it('check login button to exist', () => {
    let login = fixture.debugElement.query(By.css('#login'));
    expect(login).toBeTruthy();
  });

  it('check form is submitted', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    let loginClick = fixture.debugElement.nativeElement.querySelector('#login');
    loginClick.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('check method login is exist', () => {
    fixture.detectChanges();
    spyOn(authservice, 'login').and.returnValue({ status: 200, message: 'OK' });
    component.onSubmit();
    expect(authservice.login).toHaveBeenCalled();
  });

  it('should show input validation  error', () => {
    spyOn(authservice, 'login').and.returnValue({
      status: 401,
      message: 'Incorrect email',
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Incorrect email');
  });

  it('check if login is called with arguments from form group', () => {
    spyOn(authservice, 'login').and.returnValue({ status: 200, message: 'OK' });
    const formGroup = component.loginForm;
    formGroup.setValue({
      email: 'email',
      password: 'password',
    });
    component.onSubmit();
    fixture.detectChanges();
    expect(authservice.login).toHaveBeenCalledOnceWith('email', 'password');
  });

  it('should navigate', () => {
    spyOn(authservice, 'login').and.returnValue({ status: 200, message: 'OK' });
    let spy = spyOn(router, 'navigate');
    component.onSubmit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledOnceWith(['']);
  });

  it(' error element should exist', () => {
    component.errorMessage = 'incorect';
    fixture.detectChanges();
    let errorEl = fixture.debugElement.query(By.css('.error'));
    expect(errorEl).toBeTruthy();
  });
});
