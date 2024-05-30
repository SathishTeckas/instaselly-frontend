export interface iStatsData {
    totalProducts: number;
    totalStocks: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
}

export interface iOrderStats {
    total: number;
    created: number;
    placed: number;
    dispatched: number;
    delivered: number;
}