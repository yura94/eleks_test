import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { BeerService } from 'src/app/Services/beer.service';

@Component({
  templateUrl: './beer.html',
  styleUrls: ['./beer.scss'],
})
export class BeerComponent implements OnInit {
  beerColor: SubCategory[] = [];
  beerCategory: any;

  constructor(
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.route.snapshot.paramMap.get('category');
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        map(() => this.route.snapshot.paramMap.get('category')),
        switchMap(activebeerRoute =>
          this.beerService.getCategories(80, activebeerRoute).pipe(
            map(category => {
              return category.map(
                (value: {
                  description: string | null;
                  name: string | null;
                  abv: string | null;
                }) => ({
                  category: null,
                  description: value.description,
                  name: value.name,
                  beerAbv: value.abv,
                })
              );
            })
          )
        )
      )
      .subscribe(categories => {
        this.beerCategory = categories;
        this.beerColor = this.beerService.beerColor;
      });
  }
}
