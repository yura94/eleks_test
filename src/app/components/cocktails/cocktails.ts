import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { map, switchMap } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { ActivatedRoute } from '@angular/router';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { PictureCellRendererComponent } from '../ag-grid/picture-cell-renderer.component';
import { NameCocktailCellRendererComponent } from '../ag-grid/name-cocktail-cell-renderer.component';
import { CocktailInterface } from 'src/app/interfaces/cocktail.interface';

@Component({
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss'],
})
export class CocktailsComponent implements OnInit {
  constructor(
    private cocktailService: CocktailService,
    private route: ActivatedRoute
  ) {}

  cocktailCategories: SubCategory[] = [];
  spinerLoading: boolean = true;
  selectedCoctailCategory: CocktailInterface[] = [];

  columnDefs: ColDef[] = [
    {
      field: 'strDrink',
      cellRenderer: NameCocktailCellRendererComponent,
      cellRendererParams: {
        route: 'cocktails',
        uniqId: (data: CocktailInterface) => data.idDrink,
      },
    },
    { field: 'strDrinkThumb', cellRenderer: PictureCellRendererComponent },
    { field: 'abv' },
    { field: 'ibu' },
    { field: 'tagline' },
    { field: 'ph' },
    { field: 'first_brewed' },
  ];

  ngOnInit() {
    this.cocktailService
      .cocktailsCategory()
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
        this.cocktailCategories = categories;
        this.spinerLoading = false;
      });

    this.route.params
      .pipe(
        map(() => this.route.snapshot.paramMap.get('category')),
        switchMap(activeCocktailRoute =>
          this.cocktailService
            .cocktails(activeCocktailRoute)
            .pipe(map(category => category.drinks))
        )
      )
      .subscribe(categories => {
        this.selectedCoctailCategory = categories;
        console.log('cat', categories);
      });
  }
}
