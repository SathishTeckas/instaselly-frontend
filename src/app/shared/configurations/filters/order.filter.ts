import { iNameValue } from "../../interface/common/name-value.interface";

export const OrderFilter: iNameValue[] = [
    {
        name: 'Order Created',
        value: 'CREATED'
    },
    {
        name: 'Order Confirmed',
        value: 'PLACED'
    },
    {
        name: 'Dispatched',
        value: 'DISPATCHED'
    },
    {
        name: 'Delivered',
        value: 'DELIVERED'
    }
]

export const OrderSorting: iNameValue[] = [
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
]