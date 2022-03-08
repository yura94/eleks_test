import { Component, OnInit } from '@angular/core';
import { CocktailService } from 'src/app/Services/cocktail.service';
import { map } from 'rxjs';

@Component({
  templateUrl: './cocktails.html',
  styleUrls: ['./cocktails.scss'],
})
export class CocktailsComponent {
  constructor(private cocktailService: CocktailService) {}
   coctailCategory: any;
    

  ngOnInit() {
    this.cocktailService.getCategories().pipe(map((categoryes:any)  => categoryes = categoryes.drinks)).subscribe(categories => {
      this.coctailCategory = categories;
    });
  }
  
}
