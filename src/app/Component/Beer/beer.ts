import { Component, OnInit } from '@angular/core';
import { BeerService } from 'src/app/Services/beer.service';

@Component({
  templateUrl: './beer.html',
  styleUrls: ['./beer.scss'],
})
export class BeerComponent {
  beerColor: any = [
    { label: 'Pale Straw', value: 2 },
    { label: 'Straw', value: 3 },
    { label: 'Pale Gold', value: 4 },
    { label: '	Deep Gold', value: 6 },
    { label: '	Pale Amber', value: 9 },
    { label: 'Medium Amber', value: 12 },
    { label: 'Deep Amber', value: 15 },
    { label: 'Amber-Brown', value: 18 },
    { label: 'Brown', value: 20 },
    { label: 'Ruby Brown', value: 24 },
    { label: 'ADeep Brown', value: 30 },
    { label: 'ABlack', value: 40 },
  ];

  beercategory: any = {
    beerCategory: '',
  };

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getCategories().subscribe(categories => {
      this.beercategory.beerCategory = categories;
    });
  }
}
