import { iNameValue } from "../common/name-value.interface";
import { iCustomerAddress } from "../customer/address.interface";
import { iStockDetails } from "../stock/stock.interface";

export interface iOrderDetails {
    productId: string;
    quantity: number;
    variantId: string;
}

export interface iOrderRequest {
    products: iOrderDetails[];
    shippingCharge: number;
    totalAmount: number;
}

export interface iOrders {
    orderId: string;
    customerName: string;
    variants: iOrderVariants[];
    trackingId: string;
    trackingUrl: string;
    shippedFrom: string;
    status: string;
    totalAmount: number;
    createdAt: number;
    customer: iCustomerAddress;
}

export interface iOrderVariants {
    attributes: iNameValue[];
    quantity: number;
    sellingPrice: number;
    productName: string;
    images: string[];
}

export interface iOrderResponse {
    data: iOrders[];
    pageNumber: number;
    pageSize: number;
    totalPage: number;
}

export interface iUpdateOrderDetails {
    orderStatus?: string;
    shippedFrom?: string;
    trackingId?: string;
    trackingUrl?: string;
}