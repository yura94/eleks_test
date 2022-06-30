import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BeerInterface } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerItemComponent implements OnInit {
  constructor(private route: ActivatedRoute, private beerservice: BeerService) {}
  beer$: Observable<BeerInterface> | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
    } else {
      this.beer$ = this.beerservice.getBeerById(id);
    }
  }
}
