import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';
import { iStockResponse, iStocks, iStockDetails } from 'src/app/shared/interface/stock/stock.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements AfterViewInit {

  public products: iStocks[] = [];
  public totalProducts: number = 0;
  public selectedProducts: iStocks[] = [];
  public clearSelection: string = '';
  public pageSize: number = 10;
  public pageNumber: number = 0;
  public filter: iStockFilters | undefined = undefined;
  
  public isMobile: boolean = false;
  public showFilter: boolean = false;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {}

  public ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
    this.getDummyProducts(); // Call the method to load dummy data
    this.cdRef.detectChanges();
  }

  private getDummyProducts(): void {
    // Dummy data for products
    this.products = [
      {
        productId: 'prod123',
        name: 'Product 1',
        categoryId: 'cat123',
        category: 'Category 1',
        favourite: false,
        instagramCaption: 'This is a dummy product on Instagram',
        createdOrders: 5,
        placedOrders: 10,
        revenueAmount: 500,
        revenuePercentage: 10,
        shareToInsta: true,
        status: 'Available',
        stocksAvailable: 20,
        totalStocks: 50,
        images: ['https://via.placeholder.com/150'],
        variants: [
          {
            purchaseAmount: 50,
            properties: [{ name: 'Color', value: 'Red' }],
            minimumOrderQuantity: 1,
            minimumStocks: 10,
            sellingPrice: 100,
            totalStocks: 50,
            quantity: 10
          }
        ]
      },
      {
        productId: 'prod124',
        name: 'Product 2',
        categoryId: 'cat124',
        category: 'Category 2',
        favourite: true,
        instagramCaption: 'Another dummy product',
        createdOrders: 3,
        placedOrders: 8,
        revenueAmount: 400,
        revenuePercentage: 15,
        shareToInsta: true,
        status: 'Available',
        stocksAvailable: 10,
        totalStocks: 30,
        images: ['https://via.placeholder.com/150'],
        variants: [
          {
            purchaseAmount: 60,
            properties: [{ name: 'Size', value: 'M' }],
            minimumOrderQuantity: 2,
            minimumStocks: 5,
            sellingPrice: 120,
            totalStocks: 30,
            quantity: 5
          }
        ]
      }
    ];
    this.totalProducts = this.products.length; // Set the total products based on dummy data
  }

  public updateFavorite(event: { id: string, isFav: boolean }): void {
    // Mock function to simulate marking a product as favorite
    alert(`Product ${event.id} marked as favorite: ${event.isFav}`);
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    // Simulate fetching products based on pagination
    this.getDummyProducts();
  }

  public onStockSelectionChange(event: iStocks[]): void {
    this.selectedProducts = event;
  }

  public onFilter(event: iStockFilters): void {
    this.filter = event;
    // Filter logic can be added here
    this.getDummyProducts();
  }

  public deleteStocks(): void {
    // Simulate the deletion of selected products
    alert('Deleted selected products');
    this.selectedProducts = [];
    this.clearSelections();
  }

  public clearSelections(): void {
    this.clearSelection = new Date().getTime().toString();
  }

  public clearFilter(): void {
    this.filter = {
      category: '',
      searchKey: '',
      showOnlyFavorites: false,
      sortby: '',
      status: ''
    };
    this.showFilter = false;
  }

  public createOrder(): void {
    this.router.navigate(['stock/create-order'], { queryParams: { id: this.selectedProducts.map(prod => prod.productId).toString() } });
  }
}
