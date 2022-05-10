import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() selectedCategory: any = null;
  @Input() categoryRoute: string = '';
  @Input() columDef: any = null;
}
