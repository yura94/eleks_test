import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { map, switchMap } from 'rxjs';
import { BeerInterface } from 'src/app/interfaces/beer.interface';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { BeerService } from 'src/app/services/beer.service';
import { NameCocktailCellRendererComponent } from '../ag-grid/name-cocktail-cell-renderer.component';

@Component({
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss'],
})
export class BeersComponent implements OnInit {
  beerCategory: SubCategory[] = [];
  beers: BeerInterface[] = [];

  constructor(
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.route.snapshot.paramMap.get('category');
    });
  }

  columnDefs: ColDef[] = [
    {
      field: 'name',
      cellRenderer: NameCocktailCellRendererComponent,
      cellRendererParams: {
        route: 'beer',
        uniqId: (data: BeerInterface) => data.id,
      },
    },
    { field: 'description' },
    { field: 'abv' },
    { field: 'ibu' },
    { field: 'tagline' },
    { field: 'ph' },
    { field: 'first_brewed' },
  ];

  ngOnInit() {
    this.route.params
      .pipe(
        map(() => this.route.snapshot.paramMap.get('category')),
        switchMap(beer => this.beerService.beer(80, beer))
      )
      .subscribe(beers => {
        this.beers = beers;
        this.beerCategory = this.beerService.beerCategory;
      });
  }
}
