import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CocktailInterface } from 'src/app/interfaces/cocktail.interface';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  templateUrl: './cocktails-item.component.html',
  styleUrls: ['./cocktail-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailItemComponent implements OnInit {
  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private cocktailService: CocktailService) {}
  item$: Observable<CocktailInterface> | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
    } else {
      this.item$ = this.cocktailService.getCocktailById(id);
    }
  }
}
