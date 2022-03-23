import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {}

  beerColor = [
    { label: 'Pale Straw', value: '2' },
    { label: 'Straw', value: '3' },
    { label: 'Pale Gold', value: '4' },
    { label: '	Deep Gold', value: '6' },
    { label: '	Pale Amber', value: '9' },
    { label: 'Medium Amber', value: '12' },
    { label: 'Deep Amber', value: '15' },
    { label: 'Amber-Brown', value: '18' },
    { label: 'Brown', value: '20' },
    { label: 'Ruby Brown', value: '24' },
    { label: 'ADeep Brown', value: '30' },
    { label: 'ABlack', value: '40' },
  ];

  getCategories() {
    return this.http.get('https://api.punkapi.com/v2/beers');
  }
}
