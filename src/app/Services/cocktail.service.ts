import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CocktailCategoryesInterface,
  CocktailInterface,
  CocktailsInterface,
} from '../interfaces/cocktail.interface';

@Injectable()
export class CocktailService {
  constructor(private http: HttpClient) {}

  cocktailsCategory(): Observable<CocktailCategoryesInterface> {
    return this.http.get<CocktailCategoryesInterface>(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
  }

  cocktails(category: string | null): Observable<CocktailsInterface> {
    if (category == null) {
      return this.http.get<CocktailsInterface>(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      );
    } else {
      return this.http.get<CocktailsInterface>(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + category
      );
    }
  }

  getCocktailById(id: string | number): Observable<CocktailInterface> {
    return this.http
      .get<CocktailsInterface>(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      .pipe(
        map(item => {
          return item.drinks[0];
        })
      );
  }
}
