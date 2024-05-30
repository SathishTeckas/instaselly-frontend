import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { iStocks } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'stock-details-compact',
  templateUrl: './stock-details-compact.component.html',
  styleUrls: ['./stock-details-compact.component.scss']
})
export class StockDetailsCompactComponent implements OnChanges {

  @Input() products: iStocks[] = [];
  @Input() clearSelection: string = '';
  @Input() hideSelection: boolean = false;

  @Output() onSelectionChange: EventEmitter<iStocks[]> = new EventEmitter<iStocks[]>();
  @Output() markFavorite: EventEmitter<{ id: string, isFav: boolean }> = new EventEmitter<{ id: string, isFav: boolean}>();

  public selectedRows: iStocks[] = [];

  constructor(
    private router: Router
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['clearSelection'] && changes['clearSelection'].currentValue) {
      this.clearSelections();
    }
  }

  public markAsFav(id: string, isFav: boolean): void {
    this.markFavorite.emit({ id, isFav });
  }

  public onSelect(event: boolean, index: number): void {
    this.products[index].checked = event;
    this.selectedRows = this.products.filter(product => product.checked);
    this.onSelectionChange.emit(this.selectedRows);
  }

  private clearSelections(): void {
    this.products.forEach((val: iStocks) => val.checked = false);
    this.selectedRows = [];

    setTimeout(() => {
      this.onSelectionChange.emit(this.selectedRows);
    }, 10);
    
  }

  public manageStockDetails(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['stock/manage'], {queryParams: { id }});
  }
}
