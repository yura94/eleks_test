import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type Params = ICellRendererParams & {
  route: string;
  uniqId: (params: unknown) => number | string;
};

@Component({
  template: `<a
    href="#"
    [routerLink]="['/', params?.route, params?.uniqId(params?.data)]"
    >{{ params?.value }}
  </a>`,
})
export class NameCocktailCellRendererComponent
  implements ICellRendererAngularComp
{
  public params: Params | null = null;

  // gets called once before the renderer is used
  agInit(params: Params): void {
    this.params = params;
    console.log('key', params.uniqId);
  }

  refresh(params: Params): boolean {
    return false;
  }
}
