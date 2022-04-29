import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { CategorylistInterface } from '../interfaces/category-list.interface';

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {}

  beerColor = [
    { label: 'Pale Straw', value: '4', url: '/beer' },
    { label: 'Straw', value: '5', url: '/beer' },
    { label: 'Pale Gold', value: '6', url: '/beer' },
    { label: 'Deep Gold', value: '7', url: '/beer' },
    { label: 'Pale Amber', value: '8', url: '/beer' },
    { label: 'Medium Amber', value: '10', url: '/beer' },
    { label: 'Deep Amber', value: '11', url: '/beer' },
    { label: 'Amber-Brown', value: '12', url: '/beer' },
    { label: 'Brown', value: '14', url: '/beer' },
    { label: 'Ruby Brown', value: '55', url: '/beer' },
    { label: 'ADeep Brown', value: '30', url: '/beer' },
    { label: 'ABlack', value: '40', url: '/beer' },
  ];

  getCategories(perPage: number, activeItem: string | null): Observable<any> {
    return this.http
      .get<CategorylistInterface>(
        `https://api.punkapi.com/v2/beers?page=1&per_page=${perPage}`
      )
      .pipe(
        map(list => {
          if (activeItem == null) {
            return list;
          }
          return this.filterBeerList(list, activeItem);
        })
      );
  }

  filterBeerList(list: any, activeItem: string) {
    return list.filter((item: any) => {
      return +activeItem === Math.floor(item.abv);
    });
  }
}
