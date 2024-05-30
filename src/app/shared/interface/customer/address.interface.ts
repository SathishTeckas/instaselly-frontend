export interface iCustomerAddress {
    billingAddress: iAddress;
    email: string;
    phoneNumber: string;
    sameAddress: boolean;
    sellerId: string;
    shippingAddress: iAddress;
}

export interface iAddress {
    addressId?: string;
    addressLine1: string;
    addressLine2: string
    city: string;
    fullName: string;
    pincode: number;
    phoneNumber: string;
    state: string;
}