import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerInterface } from 'src/app/interfaces/beer.interface';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss'],
})
export class BeerItemComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private beerservice: BeerService
  ) {}
  beer: BeerInterface | null = null;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null) {
    } else {
      this.beerservice.getBeerById(id).subscribe(beer => {
        this.beer = beer;
      });
    }
  }
}
