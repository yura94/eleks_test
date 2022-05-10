import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  template: `<img [src]="params?.value" />`,
  styles: ['img { width: 40px;}'],
})
export class PictureCellRendererComponent implements ICellRendererAngularComp {
  public params: ICellRendererParams | null = null;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
