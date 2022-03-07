import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/Services/cocktail.service';

@Component({
  templateUrl: './cocktails.html',
  styleUrls: ['./cocktails.scss'],
})
export class CocktailsComponent {
  Data: any;

  constructor(private cocktailService: CocktailService) {}

  ngOnInit() {
    this.cocktailService.getCategories().subscribe(categories => {
      this.Data = categories;
    });
  }
}
