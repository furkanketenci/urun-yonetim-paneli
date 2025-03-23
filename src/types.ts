export interface IProduct {
    id: number,
    productName: string,
    productImage: string,
    productPrice: number,
    stockInformation: boolean,
    stockQuantity: number,
    productWeight: number
}

export interface IProductForm {
    productName: string;
    productImage?: string;
    productPrice: number;
    stockInformation: boolean;
    stockQuantity: number;
    productWeight: number;
}