import { iMenu } from "../../interface/common/menu.interface";

export const menu: iMenu[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        active: true,
        icon: 'dashboard',
        compactName: 'Home'
    },
    {
        name: 'Manage Stocks',
        path: 'stock',
        active: false,
        icon: 'folder_open',
        compactName: 'Stocks'
    },
    {
        name: 'Manage Orders',
        path: 'order',
        active: false,
        icon: 'shopping_cart',
        compactName: 'Orders'
    },
    {
        name: 'Shipping Rule',
        path: 'rules',
        active: false,
        icon: 'local_shipping',
        compactName: 'Rules'
    }
]