import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class BeerService {

  
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get('https://api.punkapi.com/v2/beers');
  }
}
