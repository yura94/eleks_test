import { Component, Input, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subCategory.html',
  styleUrls: ['./subCategory.scss'],
})
export class SubCategoryComponent {
  @Input() categorylList: SubCategory[] = [];
}
