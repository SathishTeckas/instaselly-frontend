import { iNameValue } from "../../interface/common/name-value.interface";

export const stockStatusFilter: iNameValue[] = [
    {
        name: 'In Stock',
        value: 'IN_STOCK'
    },
    {
        name: 'Low Stock',
        value: 'LOW_STOCK'
    },
    {
        name: 'Out of Stock',
        value: 'OUT_OF_STOCK'
    }
];

export const stockSorting: iNameValue[] = [
    {
        name: 'Newly Added First',
        value: 'DateCreatedDesc'
    },
    {
        name: 'Newly Added Last',
        value: 'DateCreatedAsc'
    },
    {
        name: 'Recent Modified',
        value: 'DateUpdatedDesc'
    },
    {
        name: 'Low Selling',
        value: 'LessSelling'
    },
    {
        name: 'Top Revenue',
        value: 'TopRevenue'
    },
    {
        name: 'Top Selling',
        value: 'TopSelling'
    }
];