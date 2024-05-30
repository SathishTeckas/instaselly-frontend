import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { iStockDetails, iStocks } from 'src/app/shared/interface/stock/stock.interface';

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnChanges {

  @Input() products: iStocks[] = [];
  @Input() clearSelection: string = '';
  @Input() hideSelection: boolean = false;

  @Output() onSelectionChange: EventEmitter<iStocks[]> = new EventEmitter<iStocks[]>();
  @Output() markFavorite: EventEmitter<{ id: string, isFav: boolean }> = new EventEmitter<{ id: string, isFav: boolean}>();

  public showDetails: boolean = false;
  public selectedRows: iStocks[] = [];
  public quickViewStock: Partial<iStocks> = {};

  constructor(
    private router: Router
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['clearSelection'] && changes['clearSelection'].currentValue) {
      this.clearSelections();
    }
  }

  public getTotal(product: iStockDetails[], key: string): number {
    let total: number = 0;
    product.forEach((info: any) => {
      total = total + info[key];
    });
    return total;
  }

  public onSelection(event: MatCheckboxChange, i: number): void {
    if (event.checked) {
      this.selectedRows.push({...this.products[i], index: i});
    } else {
      const unSelectedProduct: iStocks = this.products[i];
      const index: number = this.selectedRows.findIndex((value: iStocks) => value.productId === unSelectedProduct.productId);
      if (index === -1) return;
      this.selectedRows.splice(index, 1);
    }
    this.onSelectionChange.emit(this.selectedRows);
  }

  public markAsFav(id: string, isFav: boolean): void {
    this.markFavorite.emit({ id, isFav });
  }

  private clearSelections(): void {
    this.products.forEach((val: iStocks) => val.checked = false);
    this.selectedRows = [];
    this.onSelectionChange.emit(this.selectedRows);
  }

  public openStockDetails(product: iStocks): void {
    this.showDetails = true;
    this.quickViewStock = product;
  }

  public manageStockDetails(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['stock/manage'], {queryParams: { id }})
    this.close();
  }

  public close(): void {
    this.showDetails = false;
  }
}
