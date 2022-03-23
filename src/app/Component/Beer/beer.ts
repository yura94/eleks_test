import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { BeerService } from 'src/app/Services/beer.service';

@Component({
  templateUrl: './beer.html',
  styleUrls: ['./beer.scss'],
})
export class BeerComponent {

  beerColor : SubCategory[]= [];
  
  beercategory: any = {
    beerCategory: '',
  };

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getCategories().subscribe(categories => {
      this.beercategory.beerCategory = categories;
    });
    this.beerColor = this.beerService.beerColor
  }
}
