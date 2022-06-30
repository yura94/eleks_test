import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { BeerIngridientFilter, BeerInterface, BeerIngridient } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './beer-builder-dropDown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerBuilderDropDownComponent implements OnInit {
  constructor(private beerservice: BeerService, private cd: ChangeDetectorRef) {}
  malt$?: Observable<string[]>;
  hops$?: Observable<string[]>;
  ibu$?: Observable<number[]>;
  name$?: Observable<string[]>;

  beersFilteredByMalt: BeerInterface[] = [];
  beersSelectedByHops: BeerInterface[] = [];
  beersSelectedByIbu: BeerInterface[] = [];
  beers: BeerInterface[] = [];

  beerBuilderForm = new FormGroup({
    beerMalt: new FormControl(null),
    beerHops: new FormControl({ value: null, disabled: true }),
    beerIbu: new FormControl({ value: null, disabled: true }),
    beerName: new FormControl({ value: null, disabled: true }),
  });

  filteredBeersBy(beers: BeerInterface[], filterValue: string, filterKey: keyof BeerIngridientFilter): BeerInterface[] {
    return beers.filter(beer => beer.ingredients[filterKey].some(el => el.name === filterValue));
  }
  getfilteredDropDown(beers: BeerInterface[], filterKey: keyof BeerIngridientFilter): string[] {
    return [...new Set(beers.flatMap(beer => beer.ingredients[filterKey].map(malt => malt.name)))];
  }
  getfilteredDropDownbyIbu(beers: BeerInterface[]): number[] {
    return [...new Set(beers.map((beer: BeerInterface) => beer.ibu))];
  }

  filterBeersBySelectedIbu(beers: BeerInterface[], selectedHops: number): BeerInterface[] {
    return beers.filter(beer => {
      return beer.ibu === selectedHops;
    });
  }

  ngOnInit(): void {
    this.malt$ = this.beerservice.beer(80, null).pipe(
      map(beers => {
        this.beers = beers;
        return this.getfilteredDropDown(beers, 'malt');
      })
    );

    const beerMalt = this.beerBuilderForm.get('beerMalt');
    if (beerMalt !== null) {
      this.hops$ = beerMalt.valueChanges.pipe(
        map((selectedValue: string) => {
          this.beerBuilderForm.get('beerHops')?.reset();
          this.beerBuilderForm.get('beerHops')?.enable();
          this.beerBuilderForm.get('beerIbu')?.disable();
          this.beerBuilderForm.get('beerName')?.disable();

          this.beersFilteredByMalt = this.filteredBeersBy(this.beers, selectedValue, 'malt');
          return this.getfilteredDropDown(this.beersFilteredByMalt, 'hops');
        })
      );
    }

    const beerHops = this.beerBuilderForm.get('beerHops');
    if (beerHops !== null) {
      this.ibu$ = beerHops.valueChanges.pipe(
        map((selectedValue: string) => {
          this.beerBuilderForm.get('beerIbu')?.reset();
          this.beerBuilderForm.get('beerIbu')?.enable();
          this.beerBuilderForm.get('beerName')?.disable();

          this.beersSelectedByHops = this.filteredBeersBy(this.beersFilteredByMalt, selectedValue, 'hops');
          return this.getfilteredDropDownbyIbu(this.beersSelectedByHops);
        })
      );
    }

    const beerIbu = this.beerBuilderForm.get('beerIbu');
    if (beerIbu !== null) {
      this.name$ = beerIbu.valueChanges.pipe(
        map((selectedValue: number) => {
          this.beerBuilderForm.get('beerName')?.reset();
          this.beerBuilderForm.get('beerName')?.enable();

          this.beersSelectedByIbu = this.filterBeersBySelectedIbu(this.beersSelectedByHops, selectedValue);
          return this.beersSelectedByIbu.map(beername => beername.name);
        })
      );
    }
  }
}
