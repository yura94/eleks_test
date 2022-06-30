import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type Params = ICellRendererParams & {
  route: string;
  uniqId: (params: unknown) => number | string;
};

@Component({
  template: `<a href="#" [routerLink]="['/', params?.route, params?.uniqId(params?.data)]">{{ params?.value }} </a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameCocktailCellRendererComponent implements ICellRendererAngularComp {
  public params: Params | null = null;

  agInit(params: Params): void {
    this.params = params;
  }

  refresh(params: Params): boolean {
    return false;
  }
}
