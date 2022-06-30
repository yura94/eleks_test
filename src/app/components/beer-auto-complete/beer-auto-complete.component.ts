import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  scan,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { BeerInterface } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './beer-auto-complete.component.html',
  styleUrls: ['./beer-auto-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerAutoCompleteComponent implements OnInit {
  constructor(public http: HttpClient, private beerServise: BeerService, public ref: ChangeDetectorRef) {}
  beersObsarvable$?: Observable<BeerInterface[]>;
  public message?: string;
  private readonly loadMore$ = new Subject<void>();
  spinerLoading: boolean = false;
  isLoadMoreDisabled: boolean = true;
  beerSearchForm = new FormGroup({
    beerInput: new FormControl(),
  });
  beerInp = this.beerSearchForm.get('beerInput');
  ngOnInit(): void {
    if (this.beerInp === null) {
      return;
    }

    this.beersObsarvable$ = this.beerInp.valueChanges.pipe(
      filter((query: string) => query.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => {
        this.isLoadMoreDisabled = true;
        this.spinerLoading = true;
        this.ref.detectChanges();
      }),
      switchMap(query => {
        let page = 0;
        return this.loadMore$.pipe(
          startWith('any magic value'),
          tap(() => (this.spinerLoading = true)),
          map(() => {
            page = page + 1;
            return page;
          }),
          concatMap(page =>
            this.beerServise.beerAutocomplete(query, page).pipe(
              tap(page => {
                this.spinerLoading = false;
                this.message = '';
                if (page.length == 0) {
                  this.isLoadMoreDisabled = true;
                  this.message = 'no coincidence';
                } else if (page.length == 25) {
                  this.isLoadMoreDisabled = false;
                } else {
                  this.isLoadMoreDisabled = true;
                }
              }),
              catchError(err => {
                this.spinerLoading = false;
                this.isLoadMoreDisabled = true;
                this.message = 'somthing happened wrong';
                return of([]);
              })
            )
          ),
          scan((page, prPage) => {
            if (prPage.length == 0) {
              return (page = []);
            }
            return [...page, ...prPage];
          })
        );
      })
    );
  }
  loadMore(): void {
    this.loadMore$.next();
  }
}
