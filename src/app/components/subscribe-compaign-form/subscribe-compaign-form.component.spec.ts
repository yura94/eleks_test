import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SubscriptionType } from 'src/app/enum/subscriptionForm';
import { AddNewFormComponent } from './subscribe-compaign-form.component';

describe('AddNewFormComponent Components', () => {
  let fixture: ComponentFixture<AddNewFormComponent>;
  let component: AddNewFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFormComponent);
    component = fixture.componentInstance;
    component.subscriptionType = SubscriptionType.subscription;
    fixture.detectChanges();
  });
  it('check subscription form field to be exist', () => {
    let name = fixture.debugElement.query(By.css('.nameField'));
    expect(name).toBeTruthy();
    let password = fixture.debugElement.query(By.css('.passwordField'));
    expect(password).toBeTruthy();
    let rooms = fixture.debugElement.query(By.css('.roomsField'));
    expect(rooms).toBeTruthy();
    let level = fixture.debugElement.query(By.css('.levelField'));
    expect(level).toBeTruthy();
    let submit = fixture.debugElement.query(By.css('.submit'));
    expect(submit).toBeTruthy();
  });

  xit('if all form fiel is correct, form must be submitted', () => {
    const formGroup = component.subscriptionFormGroup;
    const event = spyOn(component.formSubmit, 'emit');
    component.subscriptionType = SubscriptionType.subscription;
    fixture.detectChanges();
    formGroup.setValue({
      name: 'email',
      tenantLevel: 'tenant1',
      password: 'password',
      rooms: 'sdsd',
      dateStart: '1/1/2022',
      dateEnd: '1/2/2022',
    });
    fixture.detectChanges();
    console.log(formGroup);
    let buttonSubmit = fixture.debugElement.query(By.css('.submit'));
    buttonSubmit.nativeElement.click();
    expect(event).toHaveBeenCalled();
  });
  it('if form fiel is empty, form must  be invalid', () => {
    fixture.detectChanges();
    const formGroup = component.subscriptionFormGroup;
    formGroup.setValue({
      name: '',
      tenantLevel: '',
      password: '',
      rooms: '',
      dateStart: '',
      dateEnd: '',
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(formGroup.valid).toBeFalse();
  });
  xit('if subscription level is subscription, data picker field must be show', () => {
    component.subscriptionType = SubscriptionType.subscription;
    fixture.detectChanges();
    let dataPicker = fixture.debugElement.query(By.css('.dateField'));
    expect(dataPicker).toBeTruthy();
  });
  it('if subscription level is compaign, data picker field must not be show', () => {
    component.subscriptionType = SubscriptionType.compaign;
    fixture.detectChanges();
    let datePickre = fixture.debugElement.query(By.css('.dateField'));
    expect(datePickre).toBeNull();
  });
});
