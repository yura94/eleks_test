import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './cocktails.html',
    styleUrls: ['./cocktails.scss'],
  })

  export class CocktailsComponent{
    constructor(private http : HttpClient){
    }

    ngOnInit(){
      this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass')
      .subscribe((data) => console.log(data))
    }
  }