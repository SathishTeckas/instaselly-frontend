import { iNameValue } from "../interface/common/name-value.interface";
import { iStockDetails } from "../interface/stock/stock.interface";

export function formatProductInformation(products: any[], params: string[]): iStockDetails[] {
    if (!products || products.length <= 0 || params.length <= 0) return products;

    let productInformation: iStockDetails[] = [];

    products.forEach((product: any) => {
        
        let nameValues: iNameValue[] = [];
        
        params.forEach((param: string) => {
            nameValues.push({
                name: param,
                value: product[param]
            });
        });

        productInformation.push({
            properties: nameValues,
            minimumOrderQuantity: product.minimumOrderQuantity,
            minimumStocks: product.minimumStocks,
            purchaseAmount: product.purchaseAmount,
            sellingPrice: product.sellingPrice,
            totalStocks: product.totalStocks,
            ...product
        });

    });

    return productInformation;
}