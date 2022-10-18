import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subscription } from 'rxjs';

import { SubscrForminterface, CompaignForminterface } from 'src/app/interfaces/subscription-form.interface';
import { SubscriptionType } from '../../enum/subscriptionForm';

@Component({
  selector: 'app-add-form',
  templateUrl: './subscribe-compaign-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewFormComponent implements OnInit, OnDestroy {
  @Input() data?: SubscrForminterface;
  @Input() subscriptionType: SubscriptionType | null = SubscriptionType.subscription;
  @Output() formSubmit = new EventEmitter<SubscrForminterface | CompaignForminterface>();
  @Output() isFormEmpty = new EventEmitter<boolean>();
  private subscription?: Subscription;
  submit?: string = 'create';

  subscriptionFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    rooms: new FormControl('', [Validators.required]),
    tenantLevel: new FormControl('', [Validators.required]),
    dateEnd: new FormControl([Validators.required]),
    dateStart: new FormControl([Validators.required]),
  });
  tenantLevelType: { value: string }[] = [{ value: 'tenant1' }, { value: 'tenant2' }, { value: 'tenant3' }];

  ngOnInit() {
    let editSubscription: SubscrForminterface;
    if (this.data) {
      this.submit = 'save';
      if (this.data.dateEnd && this.data.dateStart) {
        editSubscription = {
          ...this.data,
        };
        return this.subscriptionFormGroup.patchValue(editSubscription);
      }
      editSubscription = {
        description: this.data.description,
        name: this.data.name,
        rooms: this.data.rooms,
        tenantLevel: this.data.tenantLevel,
      };
      this.subscriptionFormGroup.patchValue(editSubscription);
    }
    if (this.subscriptionType === SubscriptionType.compaign) {
      this.subscriptionFormGroup.controls['dateStart'].disable();
      this.subscriptionFormGroup.controls['dateEnd'].disable();
    }
    this.subscription = this.subscriptionFormGroup.valueChanges
      .pipe(
        map(form => {
          return Object.values(form).every(value => value === '');
        })
      )
      .subscribe(value => {
        value ? this.isFormEmpty.emit(false) : this.isFormEmpty.emit(true);
      });
  }

  resetForm(): void {
    this.subscriptionFormGroup.reset();
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  onSubmit() {
    if (this.subscriptionFormGroup.invalid) {
      return;
    }
    this.formSubmit.emit(this.subscriptionFormGroup.value);
  }
}
