import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `
    <div *ngIf="maltName">
      <span *ngFor="let malt of maltName"> {{ malt.name }} </span>
    </div>
  `,
  styles: [
    'div { overflow-x:scroll;overflow-y:hidden; height: 45px; display: flex; flex-direction: row;}',
    'span::before{content:"#"}',
    'span::after{content:","; padding-right: 10px}',
    'span:last-of-type::after{content:""}',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaltBeerCellRendererComponent implements ICellRendererAngularComp {
  public maltName: { name: string }[] | null = null;
  agInit(params: ICellRendererParams): void {
    this.maltName = params.data.ingredients.malt;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
