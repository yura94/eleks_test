import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { TestBed } from '@angular/core/testing';
import { RequestSubscriptionInterface } from '../interfaces/subscription.interface';
import { SubscriptionService } from './subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  const mockData: RequestSubscriptionInterface = {
    dateEnd: '2022-09-31',
    dateStart: '2022-09-30',
    description: 'а',
    name: 'о',
    rooms: 'sава',
    tenantLevel: 'tenaваваnt1',
  };
  const mockDataWithId = [
    {
      id: 0,
      dateEnd: '2022-09-29',
      dateStart: '2022-09-29',
      description: 's',
      name: 's',
      rooms: 's',
      tenantLevel: 'tenant1',
    },
    {
      id: 1,
      dateEnd: '2022-09-29',
      dateStart: '2022-09-29',
      description: 's',
      name: 's',
      rooms: 's',
      tenantLevel: 'tenant1',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionService],
    });
    service = TestBed.inject(SubscriptionService);
  });

  fit('empty local storage getAll should return []', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    let getSubscription = service.getSubscription();
    expect(getSubscription).toEqual(null);
  });

  fit('getAll should return all data items', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(mockDataWithId));
    let getSubscription = service.getSubscription();
    expect(getSubscription).toEqual(mockDataWithId);
  });

  fit('add id to subscription in empty local storage', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    let spy = spyOn(window.localStorage, 'setItem');
    service.addSubscription(mockData);
    expect(spy).toHaveBeenCalledWith('subscription', JSON.stringify([{ id: 0, ...mockData }]));
  });

  fit('add id to subscription in exist local storage', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(mockDataWithId));
    let spy = spyOn(window.localStorage, 'setItem');
    service.addSubscription(mockData);
    expect(spy).toHaveBeenCalledWith('subscription', JSON.stringify([...mockDataWithId, { id: 2, ...mockData }]));
  });

  fit('delete subscription by id in exist local storage', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(mockDataWithId));
    let spy = spyOn(window.localStorage, 'setItem');
    service.deleteSubscription(0);
    expect(spy).toHaveBeenCalledWith('subscription', JSON.stringify([mockDataWithId[1]]));
  });

  fit('edit subscription by id from exist storage', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(mockDataWithId));
    let spy = spyOn(window.localStorage, 'setItem');
    const editedSubscription = service.editSubscription(0, mockData);
    expect(spy).toHaveBeenCalledWith('subscription', JSON.stringify([{ id: 0, ...mockData }, mockDataWithId[1]]));
  });
});
