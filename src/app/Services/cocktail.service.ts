import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class CocktailService {

  constructor(private http: HttpClient ) {}

  

  getCategories() {
    return this.http.get(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );
  }
}
