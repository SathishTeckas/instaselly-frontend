import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { iOrders } from 'src/app/shared/interface/order/order.interface';
import { iOrderStats } from 'src/app/shared/interface/dashboard/stats.interface';
import { iStockFilters } from 'src/app/shared/interface/stock/stock.filter.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../stocks/stocks.component.scss']
})
export class OrdersComponent implements AfterViewInit {

  public orders: iOrders[]  = [];
  public pageNumber: number = 0;
  public pageSize: number = 10;
  public totalOrders: number = 0;
  public orderStats: Partial<iOrderStats> = {};
  public filter: iStockFilters | undefined = undefined;

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    // Simulate fetching data for orders and stats
    this.getOrders();
    this.getOrderStats();
    this.cdRef.detectChanges();
  }

  // Simulated order data
// Simulated order data
public getOrders(filter: iStockFilters | undefined = undefined): void {
  // Mocked data for demonstration
  this.orders = [
    {
      orderId: 'ORD1234',
      customerName: 'John Doe',
      variants: [
        {
          attributes: [{ name: 'Size', value: 'L' }],
          quantity: 2,
          sellingPrice: 200,
          productName: 'T-Shirt',
          images: ['https://via.placeholder.com/150']
        }
      ],
      trackingId: 'TRACK1234',
      trackingUrl: 'https://example.com/track/1234',
      shippedFrom: 'Warehouse A',
      status: 'Shipped',
      totalAmount: 400,
      createdAt: Date.now(),
      customer: {
        billingAddress: {
          addressLine1: '123 Billing St',
          addressLine2: 'Apt 4B',
          city: 'New York',
          fullName: 'John Doe',
          pincode: 10001,
          phoneNumber: '123-456-7890',
          state: 'NY'
        },
        shippingAddress: {
          addressLine1: '456 Shipping Rd',
          addressLine2: 'Suite 12',
          city: 'New York',
          fullName: 'John Doe',
          pincode: 10002,
          phoneNumber: '123-456-7890',
          state: 'NY'
        },
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        sameAddress: true,
        sellerId: 'seller1234'
      }
    },
    {
      orderId: 'ORD5678',
      customerName: 'Jane Smith',
      variants: [
        {
          attributes: [{ name: 'Color', value: 'Red' }],
          quantity: 1,
          sellingPrice: 150,
          productName: 'Mug',
          images: ['https://via.placeholder.com/150']
        }
      ],
      trackingId: 'TRACK5678',
      trackingUrl: 'https://example.com/track/5678',
      shippedFrom: 'Warehouse B',
      status: 'Delivered',
      totalAmount: 150,
      createdAt: Date.now(),
      customer: {
        billingAddress: {
          addressLine1: '789 Billing Ave',
          addressLine2: '',
          city: 'Los Angeles',
          fullName: 'Jane Smith',
          pincode: 90001,
          phoneNumber: '987-654-3210',
          state: 'CA'
        },
        shippingAddress: {
          addressLine1: '101 Shipping Blvd',
          addressLine2: '',
          city: 'Los Angeles',
          fullName: 'Jane Smith',
          pincode: 90002,
          phoneNumber: '987-654-3210',
          state: 'CA'
        },
        email: 'janesmith@example.com',
        phoneNumber: '987-654-3210',
        sameAddress: false,
        sellerId: 'seller5678'
      }
    }
  ];
  this.totalOrders = this.orders.length;  // For pagination
}


  // Simulated stats data
  public getOrderStats(): void {
    this.orderStats = {
      total: 100,
      created: 50,
      placed: 40,
      dispatched: 30,
      delivered: 20
    };
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getOrders(this.filter);
  }

  public onFilter(event: iStockFilters): void {
    this.filter = event;
    this.getOrders(this.filter);
  }
}
