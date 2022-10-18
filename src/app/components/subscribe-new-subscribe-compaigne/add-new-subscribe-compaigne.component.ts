import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SubscrForminterface } from 'src/app/interfaces/subscription-form.interface';
import { RequestSubscriptionInterface } from 'src/app/interfaces/subscription.interface';
import { AddSubscriptionService } from 'src/app/services/add-subscription.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { SubscriptionType } from '../../enum/subscriptionForm';
import { DialogComponent } from '../confirm/confirm.component';

import { AddNewFormComponent } from '../subscribe-compaign-form/subscribe-compaign-form.component';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new-subscribe-compaigne.component.html',
  styleUrls: ['./add-new-subscribe-compaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewComponent implements OnInit, OnDestroy {
  constructor(
    public subscriptionService: SubscriptionService,
    private addSubscriptionService: AddSubscriptionService,
    private dialog: MatDialog
  ) {}
  @ViewChild('drawer') drawer: MatDrawer | null = null;
  @ViewChild(AddNewFormComponent) AddNewFormComponent: AddNewFormComponent | null = null;

  private subscription?: Subscription;
  selectedSubscriptionType: SubscriptionType | null = null;
  subscriptionControl = new FormControl();
  isFormFieldEmpty: boolean = false;
  subscriptionType = SubscriptionType;
  toggleSideNavButton: string = 'add new';
  isFormVisible: boolean = false;
  editSubscription?: SubscrForminterface;
  id?: number;

  ngOnInit(): void {
    this.addSubscriptionService.delete$.subscribe(id => {
      let dialogRef = this.dialog.open(DialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'true') {
          this.subscriptionService.deleteSubscription(id);
          this.addSubscriptionService.update$.next();
        }
      });
    });
    this.subscription = this.subscriptionControl.valueChanges.subscribe(control => {
      this.selectedSubscriptionType = control;
    });
    this.addSubscriptionService.edit$.subscribe(subscription => {
      subscription.dateEnd
        ? this.subscriptionControl.setValue('subscription')
        : this.subscriptionControl.setValue('compaign');
      if (subscription) {
        this.id = subscription.id;
      }
      this.editSubscription = {
        description: subscription.description,
        name: subscription.name,
        rooms: subscription.rooms,
        tenantLevel: subscription.tenantLevel,
      };
      if (subscription.dateEnd && subscription.dateStart) {
        this.editSubscription.dateStart = new Date(subscription.dateStart);
        this.editSubscription.dateEnd = new Date(subscription.dateEnd);
      }
      this.drawToggle();
      this.isFormVisible = true;
      this.isFormFieldEmpty = true;
    });
  }

  hideForm(value: SubscrForminterface) {
    let subscriptionValue: RequestSubscriptionInterface;
    if (value.dateEnd && value.dateStart) {
      subscriptionValue = {
        ...value,
        dateEnd: value.dateEnd.toISOString().split('T')[0],
        dateStart: value.dateStart.toISOString().split('T')[0],
      };
    } else {
      subscriptionValue = { ...value, dateStart: undefined, dateEnd: undefined };
    }
    this.isFormVisible = false;
    this.isFormFieldEmpty = false;
    if (this.drawer !== null) {
      this.drawer.toggle();
    }
    if (this.editSubscription) {
      this.subscriptionService.editSubscription(this.id, subscriptionValue);
      this.editSubscription = undefined;
    } else {
      this.subscriptionService.addSubscription(subscriptionValue);
    }
    this.addSubscriptionService.update$.next();
  }
  showForm() {
    this.isFormVisible = true;
  }
  isFormEmpty(value: boolean): boolean {
    return (this.isFormFieldEmpty = value);
  }
  drawToggle() {
    if (!this.isFormFieldEmpty) {
      this.drawer?.toggle();
      this.isFormVisible = false;
    } else {
      if (confirm('do you want exit')) {
        if (this.AddNewFormComponent !== null) {
          this.AddNewFormComponent.resetForm();
        }
        this.drawer?.toggle();
        this.isFormFieldEmpty = false;
        this.isFormVisible = false;
        this.editSubscription = undefined;
      }
    }
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
