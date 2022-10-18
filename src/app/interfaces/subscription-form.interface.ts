export interface SubscrForminterface extends CompaignForminterface {
  dateEnd?: Date;
  dateStart?: Date;
}
export interface CompaignForminterface {
  name: string;
  description: string;
  rooms: string;
  tenantLevel: string;
}
