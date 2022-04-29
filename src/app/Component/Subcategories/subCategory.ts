import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';
import { BeerService } from 'src/app/Services/beer.service';
import { CocktailService } from 'src/app/Services/cocktail.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subCategory.html',
  styleUrls: ['./subCategory.scss'],
})
export class SubCategoryComponent {
  constructor() {}

  @Input() categorylList: SubCategory[] = [];
}
