import { iCategory } from "../admin/category.interface";
import { iNameValue } from "../common/name-value.interface";
import { iScheduledDetails } from "../common/schedule.interface";
import { iProductInformation } from "../product/product.interface";

export interface iCreateStock {
  categoryId: string;
  images: string[];
  instagramCaption?: string;
  name: string;
  scheduleTime?: iScheduledDetails;
  shareToInsta: boolean;
  variants: iStockDetails[];
  productId?: string;
}

export interface iStockDetails {
  availableStocks?: number;
  createdOrders?: number;
  placedOrders?: number;
  purchaseAmount: number;
  properties: iNameValue[];
  attributes?: iNameValue[]; // should be removed
  revenueAmount?: number;
  revenuePercentage?: number;
  minimumOrderQuantity: number;
  minimumStocks: number;
  sellingPrice: number;
  totalStocks: number;
  variantId?: string;
  quantity?: number;
}

export interface iStocks {
    category: string;
    categoryId: string;
    createdOrders: number;
    favourite: boolean;
    instagramCaption: string;
    name: string;
    placedOrders: number;
    productId: string;
    revenueAmount: number;
    revenuePercentage: number;
    shareToInsta: boolean;
    status: string;
    stocksAvailable: number;
    totalStocks: number;
    images: string[];
    variants: iStockDetails[];
    index?: number;
    checked?: boolean;
  }

  export interface iStockResponse {
    data: { products: iStocks[]; images: any };
    pageNumber: number;
    pageSize: number;
    totalPage: number;
  }

