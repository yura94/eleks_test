import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/Services/cocktail.service';
import { map } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  templateUrl: './cocktails.html',
  styleUrls: ['./cocktails.scss'],
})
export class CocktailsComponent {
  constructor(private cocktailService: CocktailService) {}
  cocktailCategory: SubCategory[] = [];

  ngOnInit() {
    this.cocktailService
      .getCategories()
      .pipe(
        map(category => {
          return category.drinks.map(value => ({
            label: value.strCategory,
            value: value.strCategory,
          }));
        })
      )
      .subscribe(categories => {
        this.cocktailCategory = categories;
      });
  }
}
