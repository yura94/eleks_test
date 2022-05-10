import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CocktailInterface } from 'src/app/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  templateUrl: './cocktails-item.component.html',
  styleUrls: ['./cocktail-item.component.scss'],
})
export class CocktailItemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService
  ) {}
  cocktail: CocktailInterface | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
    } else {
      this.cocktailService.getCocktailById(id).subscribe(item => {
        this.cocktail = item;
        console.log(item);
      });
    }
  }
}
