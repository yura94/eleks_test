import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/Services/cocktail.service';
import { map, switchMap } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { ActivatedRoute } from '@angular/router';
import { CategorylistInterface } from 'src/app/interfaces/category-list.interface';

@Component({
  templateUrl: './cocktails.html',
  styleUrls: ['./cocktails.scss'],
})
export class CocktailsComponent implements OnInit {
  constructor(
    private cocktailService: CocktailService,
    private route: ActivatedRoute
  ) {}

  cocktailCategory: SubCategory[] = [];
  spinerLoading: boolean = true;
  selectedCoctailCategory: CategorylistInterface[] = [];

  ngOnInit() {
    this.cocktailService
      .getCategories()
      .pipe(
        map(category => {
          return category.drinks.map(value => ({
            label: value.strCategory,
            value: value.strCategory,
            url: '/cocktails',
          }));
        })
      )
      .subscribe(categories => {
        this.cocktailCategory = categories;
        this.spinerLoading = false;
      });

    this.route.params
      .pipe(
        map(() => this.route.snapshot.paramMap.get('category')),
        switchMap(activeCocktailRoute =>
          this.cocktailService
            .getCocktailsCategoriesList(activeCocktailRoute)
            .pipe(
              map(category => {
                return category.drinks.map(
                  (value: {
                    strCategory: string | null;
                    strInstructions: string | null;
                    strDrink: string | null;
                  }) => ({
                    category: value.strCategory,
                    description: value.strInstructions,
                    name: value.strDrink,
                    beerAbv: null,
                  })
                );
              })
            )
        )
      )
      .subscribe(categories => {
        this.selectedCoctailCategory = categories;
      });
  }
}
