import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subCategory.html',
  styleUrls: ['./subCategory.scss'],
})
export class subCategoryComponent {
  @Input() data: any;
}
