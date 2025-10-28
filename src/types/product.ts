export interface Product {
    id: string, 
    name: string, 
    price: number, 
    stock: number,
    images: ProductImage[]
}


export interface ProductImage {
    id: string, 
    url: string, 
    isPrimary: boolean
}