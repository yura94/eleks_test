import { Component, OnInit } from '@angular/core';
import { BeerService } from 'src/app/Services/beer.service';

@Component({
  templateUrl: './beer.html',
  styleUrls: ['./beer.scss'],
})
export class BeerComponent {
  Data: any;

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getCategories().subscribe((categories) => {
      this.Data = categories;
    });
  }
}
