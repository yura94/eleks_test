import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BeerCategoryInterface, BeerInterface } from '../interfaces/beer.interface';

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {}

  beerCategory: BeerCategoryInterface[] = [
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

  beer(perPage: number, beerAvb: string | null): Observable<BeerInterface[]> {
    return this.http.get<BeerInterface[]>(`https://api.punkapi.com/v2/beers?page=1&per_page=${perPage}`).pipe(
      map(beers => {
        if (beerAvb == null) {
          return beers;
        }
        return this.filterBeerByAvb(beers, beerAvb);
      })
    );
  }

  filterBeerByAvb(beers: BeerInterface[], beerAvb: string): BeerInterface[] {
    return beers.filter((beer: BeerInterface) => {
      return +beerAvb === Math.floor(+beer.abv);
    });
  }

  getBeerById(id: string): Observable<BeerInterface> {
    return this.http.get<BeerInterface[]>(`https://api.punkapi.com/v2/beers/${id}`).pipe(
      map(beer => {
        return beer[0];
      })
    );
  }

  beerAutocomplete(query: string, page: number): Observable<BeerInterface[]> {
    return this.http.get<BeerInterface[]>('https://api.punkapi.com/v2/beers?page=' + page + '&beer_name=' + query);
  }
}
