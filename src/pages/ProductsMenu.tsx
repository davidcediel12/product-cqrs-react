

import React from 'react';
import { Product, ProductImage } from '../types/product';
import { ProductPage } from '../types/product_page';

export default function ProductsMenu() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <SearchBar />
            <ProductsSection products={PRODUCT_PAGE.products} />
        </div>
    );
}


function SearchBar() {
    return (<div className='flex'>
        <input type='text' placeholder='Search product' className='border rounded-lg' />
        <h6 className='mx-2'>Items</h6>
        <select name="itemsPerPage" id="itemsPerPage" className='rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
        </select>
    </div>
    );
}

function ProductsSection({ products }: { readonly products: Product[] }) {

    const productRows = products.map(product => <Product key={product.name} product={product} />)

    return (
        <div className="grid grid-cols-3 gap-4 mx-10">
            {productRows}
        </div>
    )

}


interface ProductProps {
    readonly product: Product
}

function Product({ product }: ProductProps) {

    const image: ProductImage = product.images
        .find(image => image.isPrimary) ?? { id: '', url: '', isPrimary: false };


    return (
        <div className='border border-gray-300 rounded-lg flex flex-col items-start gap-2 mt-5'>
            <img src={image.url} alt={`product ${product.name}`} />

            <div className='mt-3'>
                <h4 className='font-bold text-lg'>{product.name}</h4>
                <h5 className="font-bold">{product.price} </h5>
                <h5>{product.stock}</h5>
            </div>
        </div>
    )
}







const PRODUCT_PAGE: ProductPage = {
    pages: 5, items: 30, products: [
        {
            id: '1d4e8185-cead-4f9a-a6d7-a218456a714c', name: 'Creatine', price: 49.99, stock: 23,
            images: [
                {
                    id: '7480f289-5f1d-49b3-9454-4926fa2feda6',
                    url: 'https://products-cqrs.s3.us-east-1.amazonaws.com/public/hello.png',
                    isPrimary: true
                }]
        },


        {
            id: '0ea6cc2c-b69c-4f0f-ab12-b02de2384360', name: 'Protein', price: 29.99, stock: 10,
            images: [
                {
                    id: '847475ec-a5a9-422b-abc7-eb00ccb08173',
                    url: 'https://products-cqrs.s3.us-east-1.amazonaws.com/public/hello.png',
                    isPrimary: true
                }]
        },


        {
            id: '8a577079-a3d3-481a-a51a-4afa5570b01b', name: 'Straps', price: 19.99, stock: 12,
            images: [
                {
                    id: '740a1159-f04a-48df-bf14-b7df2b364ade',
                    url: 'https://products-cqrs.s3.us-east-1.amazonaws.com/public/hello.png',
                    isPrimary: true
                }]
        },
        {
            id: 'f2a0d771-a36e-4532-93af-682c2ea36131', name: 'Glutamine', price: 28.99, stock: 1,
            images: [
                {
                    id: '740a1159-f04a-48df-bf14-b7df2b364ade',
                    url: 'https://products-cqrs.s3.us-east-1.amazonaws.com/public/hello.png',
                    isPrimary: true
                }]
        }
    ]
}