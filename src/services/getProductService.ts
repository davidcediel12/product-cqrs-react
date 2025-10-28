import axios, { AxiosResponse } from "axios"
import { ProductPage } from "../types/product_page";
import { GetProductParams } from "../types/get_product_params";


const API_URL = "http://localhost:8080"



export const getProductService = {

    getProducts: async (productParams : GetProductParams) : Promise<ProductPage> => {

        console.log(`Obaining products with ${JSON.stringify(productParams)}`)


        try {
            const productPage = await axios.get<ProductPage>(`${API_URL}/products`, {
                params: productParams
            })

            return productPage.data;

        } catch (error) {
            console.error(' Error while fetching products', error)
            throw error
        }

    }

}