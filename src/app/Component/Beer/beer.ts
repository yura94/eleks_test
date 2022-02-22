import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './beer.html',
    styleUrls: ['./beer.scss'],
  })

  export class BeerComponent{
    constructor(private http : HttpClient){
    }

    ngOnInit(){
      this.http.get("https://api.punkapi.com/v2/beers/")
      .subscribe((data) => console.log(data))
    }
  }