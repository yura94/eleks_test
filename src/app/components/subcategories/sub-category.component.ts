import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SubCategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  selector: 'app-subcategory',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubCategoryComponent {
  constructor() {}

  @Input() categorylList: SubCategory[] = [];
}
