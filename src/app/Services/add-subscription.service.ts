import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SubscriptionWithIdInterface } from '../interfaces/subscription.interface';

@Injectable()
export class AddSubscriptionService {
  edit$ = new Subject<SubscriptionWithIdInterface>();
  EditById(subscription: SubscriptionWithIdInterface) {
    this.edit$.next(subscription);
  }
  update$ = new Subject<void>();

  delete$ = new Subject<number>();
  deleteById(id: number) {
    this.delete$.next(id);
  }
}
