import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail.service';
import { map, Observable, switchMap } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { ActivatedRoute } from '@angular/router';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { PictureCellRendererComponent } from '../ag-grid/picture-cell-renderer.component';
import { NameCocktailCellRendererComponent } from '../ag-grid/name-cocktail-cell-renderer.component';
import { CocktailInterface } from 'src/app/interfaces/cocktail.interface';

@Component({
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailsComponent implements OnInit {
  constructor(private cocktailService: CocktailService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {}

  cocktailCategories$?: Observable<SubCategory[]>;
  spinerLoading: boolean = true;
  selectedCoctailCategory$?: Observable<CocktailInterface[]>;

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
    let cocktailCategories = this.cocktailService.cocktailsCategory();
    if (cocktailCategories === null) {
      return;
    } else {
      this.cocktailCategories$ = this.cocktailService.cocktailsCategory().pipe(
        map(category => {
          this.spinerLoading = false;
          return category.drinks.map(value => ({
            label: value.strCategory,
            value: value.strCategory,
            url: '/cocktails',
          }));
        })
      );
    }

    this.selectedCoctailCategory$ = this.route.params.pipe(
      map(() => this.route.snapshot.paramMap.get('category')),
      switchMap(activeCocktailRoute =>
        this.cocktailService.cocktails(activeCocktailRoute).pipe(map(category => category.drinks))
      )
    );
  }
}
