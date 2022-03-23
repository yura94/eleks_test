import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CocktailsCategory } from '../interfaces/cocktails-category.interface';

@Injectable()
export class CocktailService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<CocktailsCategory> {
    return this.http.get<CocktailsCategory>(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
  }
}
