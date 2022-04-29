import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategorylistInterface } from '../interfaces/category-list.interface';
import { CocktailCategoryInterface } from '../interfaces/cocktail-category.interface';

@Injectable()
export class CocktailService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CocktailCategoryInterface> {
    return this.http.get<CocktailCategoryInterface>(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
  }

  getCocktailsCategoriesList(category: string | null): Observable<any> {
    if (category == null) {
      return this.http.get<CategorylistInterface>(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      );
    } else {
      return this.http.get<CategorylistInterface>(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + category
      );
    }
  }
}
