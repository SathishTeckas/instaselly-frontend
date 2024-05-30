import { iCategory } from "../admin/category.interface";
import { iNameValue } from "../common/name-value.interface";

export interface iProduct {
    productId?: string;
    categoryId: string;
    name: string;
    images: string[];
    primaryImage: string;
    instagramCaption?: string;
    scheduleTime?: iScheduledDetails;
    shareToInsta: boolean;
    variants: iProductInformation[];
  }

  export interface iProductInformation {
    properties: iNameValue[];
    minimumOrderQuantity: number;
    minimumStocks: number;
    purchaseAmount: number;
    sellingPrice: number;
    totalStocks: number;
    variantId?: string;
    productId?: string;
    availableStocks?: number;
    revenuePercentage?: number;
    placedOrders?: number;
    revenueAmount?: number;
  }

  export interface iScheduledDetails {
    date: number;
    hours: number;
    minutes: number;
    month: number;
    nanos: number;
    seconds: number;
    time: number;
    year: number;
  }

