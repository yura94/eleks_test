import { Injectable } from '@angular/core';
import { RequestSubscriptionInterface, SubscriptionWithIdInterface } from '../interfaces/subscription.interface';

@Injectable()
export class SubscriptionService {
  private getFromStore(): string | null {
    return localStorage.getItem('subscription');
  }
  private serialize(value: SubscriptionWithIdInterface[]) {
    localStorage.setItem('subscription', JSON.stringify(value));
  }
  private parseFromStore(value: string): SubscriptionWithIdInterface[] {
    return JSON.parse(value);
  }
  getSubscription(): RequestSubscriptionInterface[] | null {
    const subscriptions = this.getFromStore();
    if (subscriptions) {
      const result = this.parseFromStore(subscriptions);
      return result;
    }
    return null;
  }

  addSubscription(value: RequestSubscriptionInterface): void {
    const storedSubscriptions = this.getFromStore();
    if (storedSubscriptions) {
      const subscriptions = this.parseFromStore(storedSubscriptions);
      const id = subscriptions[subscriptions.length - 1].id + 1;
      subscriptions.push({ id, ...value });
      this.serialize(subscriptions);
    } else {
      const subscriptionWithKey: SubscriptionWithIdInterface[] = [{ id: 0, ...value }];
      this.serialize(subscriptionWithKey);
    }
  }

  editSubscription(id: number = 0, editedSubscription: RequestSubscriptionInterface): void {
    const subscriptions = this.getFromStore();
    if (subscriptions) {
      let subscription = this.parseFromStore(subscriptions);
      for (let i = 0; i < subscription.length; i++) {
        if (subscription[i].id == id) {
          const modifiedSubscription: SubscriptionWithIdInterface = { id, ...editedSubscription };
          subscription[i] = modifiedSubscription;
          this.serialize(subscription);
        }
      }
      this.serialize(subscription);
    }
  }

  deleteSubscription(id: number): void {
    const subscription = this.getFromStore();
    if (subscription) {
      let getSubscription = this.parseFromStore(subscription);
      let filteredSubscription = getSubscription.filter(selectedId => {
        return id !== selectedId.id;
      });
      this.serialize(filteredSubscription);
    }
  }
}
