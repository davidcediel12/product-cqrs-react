import axios from "axios";



// const API_URL = "http://ad008d72c25544a379eabb72fc401561-1818218894.us-east-2.elb.amazonaws.com:8080"
const API_URL = "http://localhost:8080"


export const productService = {


    createImageUrls: async (imageUrlsRequest) => {

        console.log("Calling product service to generate urls")
        try {
            const imageUrlsResponse = await axios.post(API_URL + "/products/images/generate", {
                images: imageUrlsRequest
            });

            return imageUrlsResponse.data;
        } catch (error) {
            console.error("Error from the API", error)
        }
    },



    createProduct: async (createProductRequest) => {
        try {
            const response = await axios.post(API_URL + "/products", createProductRequest);

            console.log("Response from Go", response.data)

            return response
        } catch (error) {
            console.log("Error from Go", error)
        }
    }
}