import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-cell-renderer.html',
})
export class DeleteBtnComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }
  refresh(params: Params): boolean {
    return false;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }
}
