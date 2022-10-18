import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-button',
  template: `
    <button mat-raised-button color="Warn" class="edit-button" (click)="btnClickedHandler()">...Edit</button>
  `,
})
export class EditBtnComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }
  refresh(params: Params): boolean {
    return false;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.data);
  }
}
