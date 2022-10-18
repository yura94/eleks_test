import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewFormComponent } from '../subscribe-compaign-form/subscribe-compaign-form.component';
import { AddNewComponent } from './add-new-subscribe-compaigne.component';

describe('add new subscribe component', () => {
  let fixture: ComponentFixture<AddNewComponent>;
  let component: AddNewComponent;
  const SpyReset = jasmine.createSpy('resetForm');
  @Component({
    selector: 'app-add-form',
    template: '<p>Mock Form Component</p>',
    providers: [
      {
        provide: AddNewFormComponent,
        useClass: MockAddNewFormComponent,
      },
    ],
  })
  class MockAddNewFormComponent {
    resetForm() {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewComponent, MockAddNewFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSidenavModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        MatRadioModule,
      ],
    })
      .overrideComponent(AddNewComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('when click on button add new, radio button must show', () => {
    component.isFormVisible = true;
    component.drawToggle();
    fixture.detectChanges();
    let radioButton = fixture.debugElement.query(By.css('.radioButton'));
    expect(radioButton).toBeTruthy();
  });
  it('when form is empty and click on add new, form should be hidden', () => {
    component.isFormFieldEmpty = false;
    fixture.detectChanges();
    component.drawToggle();
    let formCompoennt = fixture.debugElement.query(By.css('.app-form-component'));
    expect(formCompoennt).toBeFalsy();
  });
  it('form must be visiable', () => {
    component.showForm();
    expect(component.isFormVisible).toBe(true);
  });
  // it('describe', () => {
  //   component.hideForm();
  //   expect(component.isFormVisible).toBe(false);
  //   expect(component.isFormFieldEmpty).toBe(false);
  // });
  it('describe', () => {
    component.isFormEmpty(true);
    expect(component.isFormFieldEmpty).toBe(true);
    component.isFormEmpty(false);
    expect(component.isFormFieldEmpty).toBe(false);
  });
  it('if form field in not empty, form field must be reseted', () => {
    // fixture.detectChanges();
    // let spy = spyOn(window, 'confirm').and.returnValue(true);
    // // let spyResetForm = spyOn(component.AddNewFormComponent, 'resetForm');
    // fixture.detectChanges();
    // component.isFormFieldEmpty = false;
    // component.drawToggle();
    // expect(component.isFormVisible).toBe(false);
    // component.isFormFieldEmpty = true;
    // fixture.detectChanges();
    // component.drawToggle();
    // expect(spy).toHaveBeenCalled();
    // let subscription = component.subscriptionControl;
    //subscription.setValue('subscription');
    //fixture.detectChanges();
    //component.showForm();
    component.isFormFieldEmpty = true;
    component.AddNewFormComponent = { resetForm() {} } as AddNewFormComponent;
    spyOn(component.AddNewFormComponent, 'resetForm');
    spyOn(window, 'confirm').and.returnValue(true);
    component.drawToggle();
    expect(component.AddNewFormComponent?.resetForm).toHaveBeenCalled();
    // component.AddNewFormComponent !== null;
    // component.drawToggle();
    // component.AddNewFormComponent !== null;
    // fixture.detectChanges();
    // component.drawToggle();
    // expect(SpyReset).toHaveBeenCalled();
    // expect(component.isFormVisible).toBe(false);
  });
});
