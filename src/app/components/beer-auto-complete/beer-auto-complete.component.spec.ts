import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { catchError, debounceTime, delay, of, scan, Subject, throwError } from 'rxjs';
import { BeerInterface } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer.service';
import { BeerAutoCompleteComponent } from './beer-auto-complete.component';

class MockUserService {
  beerAutocomplete(query: string, page: number) {}
}

const getBeers = (count: number) => {
  const data = [];
  const baseBeer = {
    name: 'Berliner Weisse With Yuzu - B-Sides',
  } as unknown as BeerInterface;

  for (var i = 0; i < count; i++) {
    data.push(baseBeer);
  }
  return data;
};

describe('AutoComplete Components', () => {
  let fixture: ComponentFixture<BeerAutoCompleteComponent>;
  let component: BeerAutoCompleteComponent;
  let beerService: BeerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeerAutoCompleteComponent],
      providers: [{ provide: BeerService, useClass: MockUserService }],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BeerAutoCompleteComponent);
    component = fixture.componentInstance;
    beerService = TestBed.inject(BeerService);
  });
  it('check  input to exist', () => {
    let input = fixture.debugElement.query(By.css('#beerInput'));
    expect(input).toBeTruthy();
  });
  it('input length must be min 3 symbols', fakeAsync(() => {
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of([]));
    fixture.detectChanges();
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: 'sss',
    });
    tick(1001);
    formGroup.setValue({
      beerInput: '12',
    });
    tick(1001);
    expect(beerService.beerAutocomplete).toHaveBeenCalledTimes(1);
  }));

  it('should show  message to be no coincidence', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of([]));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: '1234',
    });
    tick(1001);
    expect(component.message).toBe('no coincidence');
  }));

  it('spinner loading must show', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of([]).pipe(delay(1000)));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: 'sss',
    });
    tick(1001);
    expect(component.spinerLoading).toBeTruthy();
    tick(1001);
    expect(component.spinerLoading).toBeFalsy();
  }));

  it('loadMore must be true', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of(getBeers(25)));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: 'sss',
    });
    tick(1001);
    expect(component.loadMore).toBeTruthy();
  }));

  it('should message to be empty', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of(getBeers(20)));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: '1234',
    });
    tick(1001);
    expect(component.message).toBe('');
  }));

  it('should show error', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(throwError(() => new Error()));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: '1234',
    });
    tick(1001);
    expect(component.message).toBe('somthing happened wrong');
  }));

  it('when click on loadMore, trigger mast change from true to false', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of(getBeers(25)));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: 'sss',
    });
    tick(1001);
    expect(component.isLoadMoreDisabled).toBeFalsy();
    let loadMoreClick = fixture.debugElement.nativeElement.querySelector('#loadMore');
    loadMoreClick.click();
    expect(component.isLoadMoreDisabled).toBeFalsy();
  }));

  it('when click loadMore, check if array is concating', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(beerService, 'beerAutocomplete').and.returnValue(of(getBeers(25)));
    const formGroup = component.beerSearchForm;
    formGroup.setValue({
      beerInput: 'sss',
    });
    tick(1001);
    expect(beerService.beerAutocomplete).toHaveBeenCalledWith('sss', 1);
    fixture.detectChanges();
    let loadMoreClick = fixture.debugElement.nativeElement.querySelector('#loadMore');
    fixture.detectChanges();
    let beersElementsCount = fixture.debugElement.queryAll(By.css('.beers'));
    expect(beersElementsCount.length).toBe(25);
    loadMoreClick.click();
    expect(beerService.beerAutocomplete).toHaveBeenCalledWith('sss', 2);
    expect(beersElementsCount.length).toBe(50);
  }));
});
