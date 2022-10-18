export interface SubscriptionWithIdInterface extends RequestSubscriptionInterface {
  id: number;
}

export interface RequestSubscriptionInterface {
  name: string;
  description: string;
  rooms: string;
  tenantLevel: string;
  dateEnd?: string;
  dateStart?: string;
}
