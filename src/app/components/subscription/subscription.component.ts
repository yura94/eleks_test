import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SubscriptionWithIdInterface } from 'src/app/interfaces/subscription.interface';
import { AddSubscriptionService } from 'src/app/services/add-subscription.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { DeleteBtnComponent } from '../ag-grid/delete-cell-renderer';
import { EditBtnComponent } from '../ag-grid/edit-cell-renderer.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./sbscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    public subscriptionService: SubscriptionService,
    public addSubscriptionService: AddSubscriptionService
  ) {}
  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'description' },
    { field: 'rooms' },
    { field: 'tenantLevel' },
    { field: 'dateEnd' },
    { field: 'dateStart' },
    {
      headerName: 'Delete Cell',
      field: 'id',
      cellRenderer: DeleteBtnComponent,
      cellRendererParams: {
        clicked: (id: number) => {
          this.addSubscriptionService.deleteById(id);
        },
      },
    },
    {
      headerName: 'Edit Cell',
      field: 'id',
      cellRenderer: EditBtnComponent,
      cellRendererParams: {
        clicked: (editedSubscription: SubscriptionWithIdInterface) => {
          this.addSubscriptionService.EditById(editedSubscription);
        },
      },
    },
  ];

  rowData = [{}];

  data() {
    this.rowData = this.subscriptionService.getSubscription() || [];
    this.addSubscriptionService.update$.subscribe(() => {
      this.rowData = this.subscriptionService.getSubscription() || [];
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.data();
  }
}
