import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { BeerService } from 'src/app/services/beer.service';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent {
  constructor() {}

  @Input() categorylList: SubCategory[] = [];
}
