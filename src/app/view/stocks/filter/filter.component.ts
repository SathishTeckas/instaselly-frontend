import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { stockSorting, stockStatusFilter } from 'src/app/shared/configurations/filters/stock.filter';
import { CategoryService } from 'src/app/shared/controller/admin/category/category.service';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';
import { iNameValue } from 'src/app/shared/interface/common/name-value.interface';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';

@Component({
  selector: 'stock-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {

  @Input() isMobile: boolean = false;
  @Input() appliedFilter: Partial<iStockFilters> = {};

  @Output() onFilterChange: EventEmitter<iStockFilters> = new EventEmitter<iStockFilters>();

  public categories: iCategory[] = [];
  public statusOptions: iNameValue[] = stockStatusFilter;
  public sortOptions: iNameValue[] = stockSorting;

  public filter: string = '';
  public category: string = '';
  public status: string = '';
  public sortBy: string = '';
  public onlyFavorite: boolean = false;

  private typingTimer: any;
  private doneTypingInterval: number = 1000;

  constructor(
    private cs: CategoryService
  ) {
    // this.getCategories();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['appliedFilter'] && changes['appliedFilter'].currentValue && this.appliedFilter) {
      this.filter = this.appliedFilter.searchKey ?? '';
      this.category = this.appliedFilter.category ?? '';
      this.status = this.appliedFilter.status ?? '';
      this.sortBy = this.appliedFilter.sortby ?? '';
      this.onlyFavorite = this.appliedFilter.showOnlyFavorites ?? false; 
    }
  }

  public onSearchChange(): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => { this.applyFilter() }, this.doneTypingInterval);
  }

  public onSearchType(): void {
    clearTimeout(this.typingTimer);
  }

  private getCategories(): void {
    this.cs.getCategories().subscribe({
      next: (res: iCategory[]) => {
        if (!res) return;
        this.categories = res;
      }
    });
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
