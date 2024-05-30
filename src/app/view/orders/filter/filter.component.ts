import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';
import { OrderFilter, OrderSorting } from 'src/app/shared/configurations/filters/order.filter';
import { stockStatusFilter, stockSorting } from 'src/app/shared/configurations/filters/stock.filter';
import { CategoryService } from 'src/app/shared/controller/admin/category/category.service';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';
import { iNameValue } from 'src/app/shared/interface/common/name-value.interface';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';

@Component({
  selector: 'order-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss', '../../stocks/filter/filter.component.scss']
})
export class FilterComponent {

  @Output() onFilterChange: EventEmitter<iStockFilters> = new EventEmitter<iStockFilters>();

  public categories: iCategory[] = [];
  public statusOptions: iNameValue[] = OrderFilter;
  public sortOptions: iNameValue[] = OrderSorting;

  public filter: string = '';
  public category: string = '';
  public status: string = '';
  public sortBy: string = '';
  public onlyFavorite: boolean = false;

  private typingTimer: any;
  private doneTypingInterval: number = 1000;

  public onSearchChange(): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => { this.applyFilter() }, this.doneTypingInterval);
  }

  public onSearchType(): void {
    clearTimeout(this.typingTimer);
  }

  public clearFilter(): void {
    this.filter = '';
    this.category = '';
    this.sortBy = '';
    this.status = '';
    this.applyFilter();
  }

  public applyFilter(): void {
    this.onFilterChange.emit({
      category: this.category,
      searchKey: this.filter,
      showOnlyFavorites: this.onlyFavorite,
      sortby: this.sortBy,
      status: this.status
    });
  }

}
